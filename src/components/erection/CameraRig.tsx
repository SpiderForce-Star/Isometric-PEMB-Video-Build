import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useErectionStore } from "@/lib/erection-store";
import { BUILDING, ridgeHeight, type CameraPreset } from "@/lib/stages";

const targets: Record<CameraPreset, { pos: THREE.Vector3; look: THREE.Vector3 }> = {
  iso: {
    pos: new THREE.Vector3(70, 55, 80),
    look: new THREE.Vector3(0, ridgeHeight() / 2, 0),
  },
  side: {
    pos: new THREE.Vector3(BUILDING.width / 2 + 55, 28, 10),
    look: new THREE.Vector3(0, BUILDING.eave * 0.6, 0),
  },
  end: {
    pos: new THREE.Vector3(5, 30, BUILDING.length / 2 + 70),
    look: new THREE.Vector3(0, BUILDING.eave * 0.7, 0),
  },
  high: {
    pos: new THREE.Vector3(40, 90, 50),
    look: new THREE.Vector3(0, 2, 0),
  },
  closeBolt: {
    pos: new THREE.Vector3(BUILDING.width / 2 + 8, BUILDING.eave + 4, 6),
    look: new THREE.Vector3(BUILDING.width / 2, BUILDING.eave, 0),
  },
  telehandler: {
    pos: new THREE.Vector3(BUILDING.width / 2 + 35, 18, 15),
    look: new THREE.Vector3(BUILDING.width / 2 + 15, 6, 0),
  },
};

export function CameraRig() {
  const preset = useErectionStore((s) => s.cameraPreset);
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3());
  const pos = useRef(new THREE.Vector3(70, 55, 80));

  useFrame((_, dt) => {
    const goal = targets[preset] ?? targets.iso;
    const k = 1 - Math.exp(-2.2 * Math.min(dt, 0.05));
    pos.current.lerp(goal.pos, k);
    look.current.lerp(goal.look, k);
    camera.position.copy(pos.current);
    camera.lookAt(look.current);
  });

  return null;
}
