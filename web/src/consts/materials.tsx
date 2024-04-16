import * as THREE from "three";

export const COLORS = {
    Primary: "#346de9",
    Base: "#eaf5ff",
    Water: "#4d96da",
    Glass: "#3493ff",
    GlassNight: "#e9edff",
    Grass: "#65c96d",
    Wood: "#8b5a2b",
    Lamp: "#fff6cf",
    Leaf: "#95F999",
    Tree: "#3d9e3d",
    Road: "#565656",
    Land: "#d6b788",
    Sand: "#ccc4ae",
    Stone: "#bebebe",
    Coles: "#E01A22",
    Logo: "#02488f",
};

export const materials = {
    Logo: new THREE.MeshStandardMaterial({
        color: new THREE.Color(COLORS.Logo),
        roughness: 0.3,
        metalness: 0.2,

    }),
    LogoNight: new THREE.MeshStandardMaterial({
        color: new THREE.Color(COLORS.Logo),
        emissive: new THREE.Color("#77adff"),
        emissiveIntensity: 1,

    }),
    Base: new THREE.MeshStandardMaterial({
        color: new THREE.Color(COLORS.Base),
        roughness: 1,
    }),
    Primary: new THREE.MeshStandardMaterial({
        color: new THREE.Color(COLORS.Primary),
        roughness: 1,
    }),
    Coles: new THREE.MeshStandardMaterial({
        color: new THREE.Color(COLORS.Coles),
        roughness: 1,
    }),
    Water: new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(COLORS.Water),
        roughness: 0.1,
        metalness: 0.0,
        transparent: true,
        opacity: 0.9,
        reflectivity: 0.9,
    }),
    Grass: new THREE.MeshStandardMaterial({
        color: new THREE.Color(COLORS.Grass),
        roughness: .9,
        metalness: 0.02,
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
        roughness: .8,
        metalness: 0.05,
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


