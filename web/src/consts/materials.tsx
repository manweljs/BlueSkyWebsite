import * as THREE from "three";

export const COLORS = {
    Primary: "#0054db",
    Base: "#dcefff",
    Water: "#76b9ed",
    Glass: "#469cff",
    GlassNight: "#e9edff",
    Grass: "#52d16e",
    Wood: "#8b5a2b",
    Lamp: "#fff6cf",
    Leaf: "#95F999",
    Tree: "#3d9e3d",
    Road: "#565656",
    Land: "#9b7653",
    Sand: "#f4c542",
    Stone: "#bebebe",
};

export const materials = {
    Base: new THREE.MeshStandardMaterial({
        color: new THREE.Color(COLORS.Base),
        roughness: 1,
    }),
    Primary: new THREE.MeshStandardMaterial({
        color: new THREE.Color(COLORS.Primary),
        roughness: 1,
    }),
    Water: new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(COLORS.Water),
        roughness: 0.1,
        metalness: 0.0,
        transparent: true,
        opacity: 0.8,
        reflectivity: 0.9,
    }),
    Grass: new THREE.MeshStandardMaterial({
        color: new THREE.Color(COLORS.Grass),
        roughness: .5,
        metalness: 0,
    }),
    Glass: new THREE.MeshStandardMaterial({
        color: new THREE.Color(COLORS.Glass),
        roughness: 0.0,
        metalness: 0.1,
    }),
    GlassNight: new THREE.MeshStandardMaterial({
        color: new THREE.Color(COLORS.GlassNight),
        emissive: new THREE.Color(COLORS.GlassNight),
        emissiveIntensity: .5,
        roughness: 0.5,
        metalness: 0,
    }),

    Wood: new THREE.MeshStandardMaterial({
        color: new THREE.Color(COLORS.Wood),
        roughness: 0.6,
        metalness: 0.0,
    }),
    Lamp: new THREE.MeshStandardMaterial({
        color: new THREE.Color(COLORS.Lamp),
        emissive: new THREE.Color(COLORS.Lamp),
        emissiveIntensity: 1,
        roughness: 0.5,
        metalness: 0.1,
    }),

    Leaf: new THREE.MeshStandardMaterial({
        color: new THREE.Color(COLORS.Leaf),
        roughness: 0.8,
        metalness: 0.0,
    }),
    Tree: new THREE.MeshStandardMaterial({
        color: new THREE.Color(COLORS.Tree),
        roughness: 0.8,
        metalness: 0.0,
    }),
    Stone: new THREE.MeshStandardMaterial({
        color: new THREE.Color(COLORS.Stone),
        roughness: 0.9,
        metalness: 0.0,
    }),
    Road: new THREE.MeshStandardMaterial({
        color: new THREE.Color(COLORS.Road),
        roughness: 0.9,
        metalness: 0.1,
    }),
    Land: new THREE.MeshStandardMaterial({
        color: new THREE.Color(COLORS.Land),
        roughness: 1.0,
        metalness: 0.0,
    }),
    Sand: new THREE.MeshStandardMaterial({
        color: new THREE.Color(COLORS.Sand),
        roughness: 0.8,
        metalness: 0.05,
    }),


    TrainBody: new THREE.MeshStandardMaterial({
        color: new THREE.Color(COLORS.Base),
        roughness: 1,
    }),

    TrainWindow: new THREE.MeshStandardMaterial({
        color: new THREE.Color(COLORS.Glass),
        roughness: 0.0,
        metalness: 0.1,
    }),

    TrainWindowNight: new THREE.MeshStandardMaterial({
        color: new THREE.Color(COLORS.GlassNight),
        emissive: new THREE.Color(COLORS.GlassNight),
        emissiveIntensity: .1,
        roughness: 0.5,
        metalness: 0,
    }),
};


