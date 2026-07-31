import * as THREE from "three";

export const mats = {
  concrete: new THREE.MeshStandardMaterial({
    color: "#94a3b8",
    roughness: 0.92,
    metalness: 0.05,
  }),
  concreteDark: new THREE.MeshStandardMaterial({
    color: "#64748b",
    roughness: 0.9,
    metalness: 0.04,
  }),
  steel: new THREE.MeshStandardMaterial({
    color: "#d1d5db",
    roughness: 0.4,
    metalness: 0.8,
  }),
  steelDark: new THREE.MeshStandardMaterial({
    color: "#6b7280",
    roughness: 0.48,
    metalness: 0.72,
  }),
  // Shop primer — gray-green, not gold
  steelPrimed: new THREE.MeshStandardMaterial({
    color: "#6b7280",
    roughness: 0.55,
    metalness: 0.55,
  }),
  panelWall: new THREE.MeshStandardMaterial({
    color: "#9ca3af",
    roughness: 0.52,
    metalness: 0.48,
  }),
  panelRoof: new THREE.MeshStandardMaterial({
    color: "#4b5563",
    roughness: 0.48,
    metalness: 0.55,
  }),
  trim: new THREE.MeshStandardMaterial({
    color: "#c97b3a",
    roughness: 0.4,
    metalness: 0.55,
  }),
  insulation: new THREE.MeshStandardMaterial({
    color: "#f59e0b",
    roughness: 0.98,
    metalness: 0,
    transparent: true,
    opacity: 0.55,
    side: THREE.DoubleSide,
    depthWrite: false,
  }),
  ground: new THREE.MeshStandardMaterial({
    color: "#1e293b",
    roughness: 1,
    metalness: 0,
  }),
  dirt: new THREE.MeshStandardMaterial({
    color: "#334155",
    roughness: 1,
    metalness: 0,
  }),
  yellow: new THREE.MeshStandardMaterial({
    color: "#eab308",
    roughness: 0.45,
    metalness: 0.25,
  }),
  black: new THREE.MeshStandardMaterial({
    color: "#0f172a",
    roughness: 0.7,
    metalness: 0.2,
  }),
  glass: new THREE.MeshStandardMaterial({
    color: "#38bdf8",
    roughness: 0.15,
    metalness: 0.1,
    transparent: true,
    opacity: 0.45,
  }),
  cable: new THREE.MeshStandardMaterial({
    color: "#c97b3a",
    roughness: 0.6,
    metalness: 0.4,
  }),
  truckCab: new THREE.MeshStandardMaterial({
    color: "#1e40af",
    roughness: 0.5,
    metalness: 0.3,
  }),
  wood: new THREE.MeshStandardMaterial({
    color: "#92400e",
    roughness: 0.9,
    metalness: 0,
  }),
};
