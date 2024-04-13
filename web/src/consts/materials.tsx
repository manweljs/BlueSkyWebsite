import * as THREE from "three";

export const materials = {
    Base: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#dcefff"),
        roughness: 1,
    }),
    Water: new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#76b9ed"),
        roughness: 0.1,
        metalness: 0.0,
        transparent: true,
        opacity: 0.8,
        reflectivity: 0.9,
    }),
    Glass: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#469cff"),
        roughness: 0.0,
        metalness: 0.1,
    }),
    GlassNight: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#88a4ff"),
        emissive: new THREE.Color("#88a4ff"),
        emissiveIntensity: 2,
        roughness: 0.5,
        metalness: 0,
    }),

    Wood: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#8b5a2b"),
        roughness: 0.6,
        metalness: 0.0,
    }),
    Lamp: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#fff6cf"),
        emissive: new THREE.Color("#fff6cf"),
        emissiveIntensity: 1,
        roughness: 0.5,
        metalness: 0.1,
    }),

    Leaf: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#3d9e3d"),
        roughness: 0.8,
        metalness: 0.0,
    }),
    Tree: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#855E42"),
        roughness: 0.8,
        metalness: 0.0,
    }),
    Road: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#565656"),
        roughness: 0.9,
        metalness: 0.1,
    }),
    Land: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#9b7653"),
        roughness: 1.0,
        metalness: 0.0,
    }),
    Sand: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#f4c542"),
        roughness: 0.8,
        metalness: 0.05,
    }),
};


