import { KeyboardControls, OrbitControls, useGLTF, useKeyboardControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { CuboidCollider, Physics, RapierRigidBody, RigidBody, useRapier } from '@react-three/rapier'
import { useControls } from 'leva'
import { RefObject, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import { Collider } from '@dimforge/rapier3d-compat'
import { useVehicleController, WheelInfo } from '@/components/hooks/useVehicleController'

// https://github.com/michael-go/raphcar
// https://sketchfab.com/3d-models/low-poly-race-track-b40628339fde4b2fbe41711edc7c7a93

export const spawn = {
    position: [5, 3, 0] as THREE.Vector3Tuple,
    rotation: [0, Math.PI / 2, 0] as THREE.Vector3Tuple,
}

export const controls = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'back', keys: ['ArrowDown', 'KeyS'] },
    { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'right', keys: ['ArrowRight', 'KeyD'] },
    { name: 'brake', keys: ['Space'] },
    { name: 'reset', keys: ['KeyR'] },
]

type KeyControls = {
    forward: boolean
    back: boolean
    left: boolean
    right: boolean
    brake: boolean
    reset: boolean
}

const wheelInfo: Omit<WheelInfo, 'position'> = {
    axleCs: new THREE.Vector3(0, 0, -1),
    suspensionRestLength: 0.125,
    suspensionStiffness: 24,
    maxSuspensionTravel: 1,
    radius: 0.15,
}

const wheels: WheelInfo[] = [
    // front
    { position: new THREE.Vector3(-0.65, -0.15, -0.45), ...wheelInfo },
    { position: new THREE.Vector3(-0.65, -0.15, 0.45), ...wheelInfo },
    // rear
    { position: new THREE.Vector3(0.65, -0.15, -0.45), ...wheelInfo },
    { position: new THREE.Vector3(0.65, -0.15, 0.45), ...wheelInfo },
]

const cameraOffset = new THREE.Vector3(7, 3, 0)
const cameraTargetOffset = new THREE.Vector3(0, 1.5, 0)

const _bodyPosition = new THREE.Vector3()
const _airControlAngVel = new THREE.Vector3()
const _cameraPosition = new THREE.Vector3()
const _cameraTarget = new THREE.Vector3()

type VehicleProps = {
    position: THREE.Vector3Tuple
    rotation: THREE.Vector3Tuple
}

const steerAngle = .3

const CarPlayer = ({ position, rotation }: VehicleProps) => {
    const { world, rapier } = useRapier()
    const threeControls = useThree((s) => s.controls)
    const [sub, get] = useKeyboardControls<keyof KeyControls>()

    useEffect(() => {
        sub((state) => state.forward, (pressed) => {
            console.log('forward', pressed)
        })
        sub((state) => state.back, (pressed) => {
            console.log('back', pressed)
        })
    }, [])

    const chasisMeshRef = useRef<THREE.Mesh>(null!)
    const chasisBodyRef = useRef<RapierRigidBody>(null!)
    const wheelsRef: RefObject<(THREE.Object3D | null)[]> = useRef([])

    const { vehicleController } = useVehicleController(chasisBodyRef, wheelsRef as RefObject<THREE.Object3D[]>, wheels)

    const { accelerateForce, brakeForce } = useControls('rapier-dynamic-raycast-vehicle-controller', {
        accelerateForce: { value: 1, min: 0, max: 10 },
        brakeForce: { value: 0.05, min: 0, max: 0.5, step: 0.01 },
        steerAngle: { value: Math.PI / 24, min: 0, max: Math.PI / 12 },
    })

    const [smoothedCameraPosition] = useState(new THREE.Vector3(0, 100, -300))
    const [smoothedCameraTarget] = useState(new THREE.Vector3())

    const ground = useRef<Collider>()

    useFrame((state, delta) => {
        // console.log('state', chasisMeshRef.current, vehicleController.current, threeControls)
        if (!chasisMeshRef.current || !vehicleController.current || !threeControls) return
        const t = 1.0 - Math.pow(0.01, delta)

        /* controls */

        const controller = vehicleController.current
        const chassisRigidBody = controller.chassis()

        const controls = get()

        // console.log('controls', controls.forward)

        // rough ground check
        let outOfBounds = false

        const raycastResult = world.castRay(
            new rapier.Ray(chassisRigidBody.translation(), { x: 0, y: -1, z: 0 }),
            1,
            false,
            undefined,
            undefined,
            undefined,
            chassisRigidBody,
        )

        ground.current = undefined

        if (raycastResult) {
            const collider = raycastResult.collider
            const userData = collider.parent()?.userData as any
            outOfBounds = userData?.outOfBounds

            ground.current = collider

            // console.log('collider', collider)
        }

        const engineForce = Number(controls.forward) * accelerateForce - Number(controls.back)

        controller.setWheelEngineForce(0, engineForce)
        controller.setWheelEngineForce(1, engineForce)

        const wheelBrake = Number(controls.brake) * brakeForce
        controller.setWheelBrake(0, wheelBrake)
        controller.setWheelBrake(1, wheelBrake)
        controller.setWheelBrake(2, wheelBrake)
        controller.setWheelBrake(3, wheelBrake)

        const currentSteering = controller.wheelSteering(0) || 0
        const steerDirection = Number(controls.left) - Number(controls.right)

        const steering = THREE.MathUtils.lerp(currentSteering, steerAngle * steerDirection, 0.5)

        controller.setWheelSteering(0, steering)
        controller.setWheelSteering(1, steering)

        // air control
        if (!ground.current) {
            const forwardAngVel = Number(controls.forward) - Number(controls.back)
            const sideAngVel = Number(controls.left) - Number(controls.right)

            const angvel = _airControlAngVel.set(0, sideAngVel * t, forwardAngVel * t)
            angvel.applyQuaternion(chassisRigidBody.rotation())
            angvel.add(chassisRigidBody.angvel())

            chassisRigidBody.setAngvel(new rapier.Vector3(angvel.x, angvel.y, angvel.z), true)
        }

        if (controls.reset || outOfBounds) {
            const chassis = controller.chassis()
            chassis.setTranslation(new rapier.Vector3(...spawn.position), true)
            const spawnRot = new THREE.Euler(...spawn.rotation)
            const spawnQuat = new THREE.Quaternion().setFromEuler(spawnRot)
            chassis.setRotation(spawnQuat, true)
            chassis.setLinvel(new rapier.Vector3(0, 0, 0), true)
            chassis.setAngvel(new rapier.Vector3(0, 0, 0), true)
        }

        /* camera */

        // camera position
        const cameraPosition = _cameraPosition

        if (!!ground.current) {
            // camera behind chassis
            cameraPosition.copy(cameraOffset)
            const bodyWorldMatrix = chasisMeshRef.current.matrixWorld
            cameraPosition.applyMatrix4(bodyWorldMatrix)
        } else {
            // camera behind velocity
            const velocity = chassisRigidBody.linvel()
            cameraPosition.copy(velocity)
            cameraPosition.normalize()
            cameraPosition.multiplyScalar(-10)
            cameraPosition.add(chassisRigidBody.translation())
        }

        cameraPosition.y = Math.max(cameraPosition.y, (vehicleController.current?.chassis().translation().y ?? 0) + 1)

        smoothedCameraPosition.lerp(cameraPosition, t)
        state.camera.position.copy(smoothedCameraPosition)

        // camera target
        const bodyPosition = chasisMeshRef.current.getWorldPosition(_bodyPosition)
        const cameraTarget = _cameraTarget

        cameraTarget.copy(bodyPosition)
        cameraTarget.add(cameraTargetOffset)
        smoothedCameraTarget.lerp(cameraTarget, t)

        state.camera.lookAt(smoothedCameraTarget)
    })

    return (
        <group scale={.75}>
            <RigidBody
                position={position}
                rotation={rotation}
                canSleep={false}
                ref={chasisBodyRef}
                colliders={false}
                type="dynamic"
            >
                <CuboidCollider args={[0.8, 0.2, 0.4]} />

                {/* chassis */}
                <mesh ref={chasisMeshRef}>
                    <boxGeometry args={[1.6, 0.4, 0.8]} />
                    <meshStandardMaterial color="#0066ff" />
                </mesh>

                {/* wheels */}
                {wheels.map((wheel, index) => (
                    <group key={index} ref={(ref) => ((wheelsRef.current as any)[index] = ref) as any} position={wheel.position}>
                        <group rotation-x={-Math.PI / 2}>
                            <mesh>
                                <cylinderGeometry args={[0.15, 0.15, 0.25, 16]} />
                                <meshStandardMaterial color="#222" />
                            </mesh>
                            <mesh scale={1.01}>
                                <cylinderGeometry args={[0.15, 0.15, 0.25, 6]} />
                                <meshStandardMaterial color="#fff" wireframe />
                            </mesh>
                        </group>
                    </group>
                ))}
            </RigidBody>
        </group>
    )
}

export default CarPlayer