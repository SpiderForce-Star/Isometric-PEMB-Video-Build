import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import { BuildingShell, SiteEquipment, TempBracing } from "./BuildingParts";
import { CameraRig } from "./CameraRig";
import { useErectionStore } from "@/lib/erection-store";

function Ticker() {
  const tick = useErectionStore((s) => s.tick);
  useFrame((_, dt) => tick(Math.min(dt, 0.05)));
  return null;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[60, 90, 40]}
        intensity={1.35}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={250}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
        shadow-bias={-0.0002}
        color="#fff5e6"
      />
      <directionalLight position={[-40, 30, -20]} intensity={0.4} color="#93c5fd" />
      <hemisphereLight args={["#94a3b8", "#1e293b", 0.4]} />
    </>
  );
}

export function ErectionScene() {
  const autoCamera = useErectionStore((s) => s.autoCamera);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: [70, 55, 80], fov: 40, near: 0.5, far: 500 }}
      style={{ width: "100%", height: "100%", background: "#020617" }}
    >
      <color attach="background" args={["#020617"]} />
      <fog attach="fog" args={["#020617", 120, 280]} />
      <Suspense fallback={null}>
        <Lights />
        <BuildingShell />
        <SiteEquipment />
        <TempBracing />
        <ContactShadows position={[0, 0.01, 0]} opacity={0.3} scale={180} blur={2.2} far={40} />
        <Environment preset="city" environmentIntensity={0.3} />
        <Ticker />
        {autoCamera ? (
          <CameraRig />
        ) : (
          <OrbitControls
            makeDefault
            enableDamping
            dampingFactor={0.08}
            minDistance={20}
            maxDistance={180}
            maxPolarAngle={Math.PI / 2.05}
            target={[0, 10, 0]}
          />
        )}
      </Suspense>
    </Canvas>
  );
}
