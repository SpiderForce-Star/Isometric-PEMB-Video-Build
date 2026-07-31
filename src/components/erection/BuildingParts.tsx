import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BUILDING, ridgeHeight } from "@/lib/stages";
import { mats } from "./materials";
import { useErectionStore } from "@/lib/erection-store";

const W = BUILDING.width;
const L = BUILDING.length;
const H = BUILDING.eave;
const BAYS = BUILDING.bays;
const SP = BUILDING.baySpacing;
const RH = ridgeHeight();

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function FrameAt({
  z,
  progress,
  start,
  end,
}: {
  z: number;
  progress: number;
  start: number;
  end: number;
}) {
  const colT = smoothstep(start, start + (end - start) * 0.45, progress);
  const rafT = smoothstep(start + (end - start) * 0.4, end, progress);

  const half = W / 2;
  const rise = RH - H;
  const rafterLen = Math.hypot(half, rise);
  const angle = Math.atan2(rise, half);

  if (colT < 0.01) return null;

  return (
    <group>
      <mesh position={[-half, (H * colT) / 2, z]} scale={[1, Math.max(colT, 0.02), 1]} material={mats.steelPrimed} castShadow>
        <boxGeometry args={[0.55, H, 0.75]} />
      </mesh>
      <mesh position={[half, (H * colT) / 2, z]} scale={[1, Math.max(colT, 0.02), 1]} material={mats.steelPrimed} castShadow>
        <boxGeometry args={[0.55, H, 0.75]} />
      </mesh>

      {rafT > 0.02 && (
        <>
          <mesh
            position={[-half / 2, H + rise / 2, z]}
            rotation={[0, 0, angle]}
            scale={[Math.max(rafT, 0.02), 1, 1]}
            material={mats.steelPrimed}
            castShadow
          >
            <boxGeometry args={[rafterLen, 0.45, 0.65]} />
          </mesh>
          <mesh
            position={[half / 2, H + rise / 2, z]}
            rotation={[0, 0, -angle]}
            scale={[Math.max(rafT, 0.02), 1, 1]}
            material={mats.steelPrimed}
            castShadow
          >
            <boxGeometry args={[rafterLen, 0.45, 0.65]} />
          </mesh>
        </>
      )}

      {rafT > 0.9 && (
        <>
          <mesh position={[-half, H, z]} material={mats.trim}>
            <sphereGeometry args={[0.2, 10, 10]} />
          </mesh>
          <mesh position={[half, H, z]} material={mats.trim}>
            <sphereGeometry args={[0.2, 10, 10]} />
          </mesh>
          <mesh position={[0, RH, z]} material={mats.trim}>
            <sphereGeometry args={[0.16, 10, 10]} />
          </mesh>
        </>
      )}

      <mesh position={[-half, 0.08, z]} material={mats.steelDark} castShadow>
        <boxGeometry args={[1.1, 0.12, 1.1]} />
      </mesh>
      <mesh position={[half, 0.08, z]} material={mats.steelDark} castShadow>
        <boxGeometry args={[1.1, 0.12, 1.1]} />
      </mesh>
    </group>
  );
}

function Secondary({ progress }: { progress: number }) {
  const t = smoothstep(0.52, 0.66, progress);
  if (t < 0.02) return null;

  const half = W / 2;
  const purlinCount = 5;
  const girtYs = [4, 8, 12, 16];
  const z0 = -L / 2;
  const z1 = L / 2;

  return (
    <group>
      {Array.from({ length: purlinCount }).map((_, i) => {
        const u = (i + 1) / (purlinCount + 1);
        const y = H + (RH - H) * (1 - u);
        const xL = -half * u;
        const xR = half * u;
        return (
          <group key={i}>
            <mesh position={[xL, y, 0]} scale={[1, 1, t]} material={mats.steel} castShadow>
              <boxGeometry args={[0.22, 0.28, L - 1]} />
            </mesh>
            <mesh position={[xR, y, 0]} scale={[1, 1, t]} material={mats.steel} castShadow>
              <boxGeometry args={[0.22, 0.28, L - 1]} />
            </mesh>
          </group>
        );
      })}
      <mesh position={[-half, H, 0]} scale={[1, 1, t]} material={mats.steel} castShadow>
        <boxGeometry args={[0.3, 0.35, L - 0.5]} />
      </mesh>
      <mesh position={[half, H, 0]} scale={[1, 1, t]} material={mats.steel} castShadow>
        <boxGeometry args={[0.3, 0.35, L - 0.5]} />
      </mesh>
      {girtYs.map((y) => (
        <group key={y}>
          <mesh position={[-half, y, 0]} scale={[1, 1, t]} material={mats.steelDark} castShadow>
            <boxGeometry args={[0.2, 0.28, L - 1]} />
          </mesh>
          <mesh position={[half, y, 0]} scale={[1, 1, t]} material={mats.steelDark} castShadow>
            <boxGeometry args={[0.2, 0.28, L - 1]} />
          </mesh>
          <mesh position={[0, y, z0]} scale={[t, 1, 1]} material={mats.steelDark}>
            <boxGeometry args={[W - 1, 0.28, 0.2]} />
          </mesh>
          <mesh position={[0, y, z1]} scale={[t, 1, 1]} material={mats.steelDark}>
            <boxGeometry args={[W - 1, 0.28, 0.2]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Insulation({ progress }: { progress: number }) {
  const t = smoothstep(0.66, 0.76, progress);
  if (t < 0.02) return null;
  const half = W / 2;
  return (
    <group>
      <mesh
        position={[-half / 2, H + (RH - H) / 2 + 0.2, 0]}
        rotation={[0, 0, Math.atan2(RH - H, half)]}
        scale={[t, 1, t]}
        material={mats.insulation}
      >
        <boxGeometry args={[Math.hypot(half, RH - H) * 0.92, 0.16, L * 0.9]} />
      </mesh>
      <mesh
        position={[half / 2, H + (RH - H) / 2 + 0.2, 0]}
        rotation={[0, 0, -Math.atan2(RH - H, half)]}
        scale={[t, 1, t]}
        material={mats.insulation}
      >
        <boxGeometry args={[Math.hypot(half, RH - H) * 0.92, 0.16, L * 0.9]} />
      </mesh>
      <mesh position={[-half - 0.2, H / 2, 0]} scale={[1, t, t]} material={mats.insulation}>
        <boxGeometry args={[0.12, H * 0.88, L * 0.88]} />
      </mesh>
      <mesh position={[half + 0.2, H / 2, 0]} scale={[1, t, t]} material={mats.insulation}>
        <boxGeometry args={[0.12, H * 0.88, L * 0.88]} />
      </mesh>
    </group>
  );
}

function Sheeting({ progress }: { progress: number }) {
  const wallT = smoothstep(0.78, 0.9, progress);
  const roofT = smoothstep(0.82, 0.94, progress);
  if (wallT < 0.02 && roofT < 0.02) return null;
  const half = W / 2;
  const panelW = 3;
  const nWall = Math.floor(L / panelW);

  return (
    <group>
      {Array.from({ length: nWall }).map((_, i) => {
        const z = -L / 2 + panelW / 2 + i * panelW;
        const local = Math.max(0, Math.min(1, wallT * nWall - i));
        if (local < 0.05) return null;
        // Skip OH door bays roughly
        const skipOh = Math.abs(z + 15) < 6 || Math.abs(z - 15) < 6;
        return (
          <group key={i}>
            {!skipOh && (
              <mesh
                position={[half + 0.32, (H * local) / 2, z]}
                scale={[1, Math.max(local, 0.02), 1]}
                material={mats.panelWall}
                castShadow
              >
                <boxGeometry args={[0.08, H, panelW - 0.1]} />
              </mesh>
            )}
            <mesh
              position={[-half - 0.32, (H * local) / 2, z]}
              scale={[1, Math.max(local, 0.02), 1]}
              material={mats.panelWall}
              castShadow
            >
              <boxGeometry args={[0.08, H, panelW - 0.1]} />
            </mesh>
          </group>
        );
      })}
      {/* End walls with door cutouts approximated as two side panels */}
      <mesh position={[-W / 4, (H * wallT) / 2, -L / 2 - 0.32]} scale={[wallT || 0.02, wallT || 0.02, 1]} material={mats.panelWall} castShadow>
        <boxGeometry args={[W / 2 - 1, H, 0.08]} />
      </mesh>
      <mesh position={[W / 4, (H * wallT) / 2, -L / 2 - 0.32]} scale={[wallT || 0.02, wallT || 0.02, 1]} material={mats.panelWall} castShadow>
        <boxGeometry args={[W / 2 - 1, H, 0.08]} />
      </mesh>
      <mesh position={[0, (H * wallT) / 2, L / 2 + 0.32]} scale={[wallT || 0.02, wallT || 0.02, 1]} material={mats.panelWall} castShadow>
        <boxGeometry args={[W - 0.5, H, 0.08]} />
      </mesh>
      {roofT > 0.02 && (
        <>
          <mesh
            position={[-half / 2, H + (RH - H) / 2 + 0.4, 0]}
            rotation={[0, 0, Math.atan2(RH - H, half)]}
            scale={[roofT, 1, roofT]}
            material={mats.panelRoof}
            castShadow
          >
            <boxGeometry args={[Math.hypot(half, RH - H) + 0.4, 0.1, L + 0.8]} />
          </mesh>
          <mesh
            position={[half / 2, H + (RH - H) / 2 + 0.4, 0]}
            rotation={[0, 0, -Math.atan2(RH - H, half)]}
            scale={[roofT, 1, roofT]}
            material={mats.panelRoof}
            castShadow
          >
            <boxGeometry args={[Math.hypot(half, RH - H) + 0.4, 0.1, L + 0.8]} />
          </mesh>
        </>
      )}
    </group>
  );
}

function TrimAndOpenings({ progress }: { progress: number }) {
  const trimT = smoothstep(0.88, 0.96, progress);
  const doorT = smoothstep(0.94, 1, progress);
  if (trimT < 0.02) return null;
  const half = W / 2;

  return (
    <group>
      <mesh position={[0, RH + 0.5, 0]} scale={[1, 1, trimT]} material={mats.trim} castShadow>
        <boxGeometry args={[0.55, 0.18, L + 1]} />
      </mesh>
      <mesh position={[-half - 0.38, H + 0.12, 0]} scale={[1, 1, trimT]} material={mats.trim}>
        <boxGeometry args={[0.22, 0.18, L + 0.4]} />
      </mesh>
      <mesh position={[half + 0.38, H + 0.12, 0]} scale={[1, 1, trimT]} material={mats.trim}>
        <boxGeometry args={[0.22, 0.18, L + 0.4]} />
      </mesh>
      <mesh position={[-half - 0.38, 0.32, 0]} scale={[1, 1, trimT]} material={mats.trim}>
        <boxGeometry args={[0.18, 0.32, L]} />
      </mesh>
      <mesh position={[half + 0.38, 0.32, 0]} scale={[1, 1, trimT]} material={mats.trim}>
        <boxGeometry args={[0.18, 0.32, L]} />
      </mesh>
      {[
        [-half, -L / 2],
        [half, -L / 2],
        [-half, L / 2],
        [half, L / 2],
      ].map(([x, z], i) => (
        <mesh
          key={i}
          position={[x! * 1.02, (H * trimT) / 2, z! * 1.01]}
          scale={[1, Math.max(trimT, 0.02), 1]}
          material={mats.trim}
        >
          <boxGeometry args={[0.26, H, 0.26]} />
        </mesh>
      ))}
      <mesh position={[-half - 0.55, H - 0.15, 0]} scale={[1, 1, trimT]} material={mats.steelDark}>
        <boxGeometry args={[0.32, 0.28, L]} />
      </mesh>
      <mesh position={[half + 0.55, H - 0.15, 0]} scale={[1, 1, trimT]} material={mats.steelDark}>
        <boxGeometry args={[0.32, 0.28, L]} />
      </mesh>
      {[-L / 3, L / 3].map((z) => (
        <group key={z}>
          <mesh position={[-half - 0.6, H / 2, z]} scale={[1, Math.max(trimT, 0.02), 1]} material={mats.steelDark}>
            <boxGeometry args={[0.16, H, 0.16]} />
          </mesh>
          <mesh position={[half + 0.6, H / 2, z]} scale={[1, Math.max(trimT, 0.02), 1]} material={mats.steelDark}>
            <boxGeometry args={[0.16, H, 0.16]} />
          </mesh>
        </group>
      ))}

      {doorT > 0.02 && (
        <>
          <mesh position={[half + 0.42, 7 * doorT, -15]} scale={[1, Math.max(doorT, 0.02), 1]} material={mats.black} castShadow>
            <boxGeometry args={[0.18, 14, 12]} />
          </mesh>
          <mesh position={[half + 0.42, 7 * doorT, 15]} scale={[1, Math.max(doorT, 0.02), 1]} material={mats.black} castShadow>
            <boxGeometry args={[0.18, 14, 12]} />
          </mesh>
          {[3.5, 7, 10.5].map((y) => (
            <group key={y}>
              <mesh position={[half + 0.45, y * doorT, -15]} material={mats.steelDark}>
                <boxGeometry args={[0.05, 0.08, 11.5]} />
              </mesh>
              <mesh position={[half + 0.45, y * doorT, 15]} material={mats.steelDark}>
                <boxGeometry args={[0.05, 0.08, 11.5]} />
              </mesh>
            </group>
          ))}
          <mesh position={[-half - 0.42, 3.5 * doorT, -20]} scale={[1, Math.max(doorT, 0.02), 1]} material={mats.black} castShadow>
            <boxGeometry args={[0.14, 7, 3.2]} />
          </mesh>
          <mesh position={[-half - 0.42, 3.5 * doorT, 20]} scale={[1, Math.max(doorT, 0.02), 1]} material={mats.black} castShadow>
            <boxGeometry args={[0.14, 7, 3.2]} />
          </mesh>
          {[
            [-half - 0.42, 10, -5],
            [-half - 0.42, 10, 5],
            [-half - 0.42, 10, 30],
          ].map(([x, y, z], i) => (
            <mesh key={i} position={[x!, y! * doorT, z!]} scale={[1, doorT, doorT]} material={mats.glass}>
              <boxGeometry args={[0.1, 3.5, 5]} />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}

export function Foundation() {
  const bolts = useMemo(() => {
    const pts: [number, number][] = [];
    for (let i = 0; i <= BAYS; i++) {
      const z = -L / 2 + i * SP;
      pts.push([-W / 2, z], [W / 2, z]);
    }
    for (const z of [-L / 2, L / 2]) {
      for (let i = 1; i < 4; i++) pts.push([-W / 2 + (W * i) / 4, z]);
    }
    return pts;
  }, []);

  return (
    <group>
      <mesh position={[0, -0.15, 0]} material={mats.concrete} receiveShadow>
        <boxGeometry args={[W + 4, 0.35, L + 4]} />
      </mesh>
      <mesh position={[0, 0.02, 0]} material={mats.concreteDark} receiveShadow>
        <boxGeometry args={[W + 2.5, 0.08, L + 2.5]} />
      </mesh>
      {bolts.map(([x, z], i) => (
        <group key={i} position={[x, 0.1, z]}>
          <mesh material={mats.steel} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.55, 8]} />
          </mesh>
          <mesh position={[0, 0.28, 0]} material={mats.steelDark}>
            <cylinderGeometry args={[0.14, 0.14, 0.08, 6]} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]} material={mats.dirt} receiveShadow>
        <planeGeometry args={[220, 220]} />
      </mesh>
    </group>
  );
}

export function PrimaryFrames() {
  const progress = useErectionStore((s) => s.progress);
  const frames = useMemo(() => {
    return Array.from({ length: BAYS + 1 }, (_, i) => {
      const z = -L / 2 + i * SP;
      const mid = BAYS / 2;
      const order = Math.abs(i - mid);
      const start = 0.22 + order * 0.035;
      const end = start + 0.16;
      return { z, start, end };
    });
  }, []);

  return (
    <group>
      {frames.map((f, i) => (
        <FrameAt key={i} z={f.z} progress={progress} start={f.start} end={f.end} />
      ))}
    </group>
  );
}

export function BuildingShell() {
  const progress = useErectionStore((s) => s.progress);
  return (
    <group>
      <Foundation />
      <PrimaryFrames />
      <Secondary progress={progress} />
      <Insulation progress={progress} />
      <Sheeting progress={progress} />
      <TrimAndOpenings progress={progress} />
    </group>
  );
}

export function SiteEquipment() {
  const progress = useErectionStore((s) => s.progress);
  const group = useRef<THREE.Group>(null);
  const boom = useRef<THREE.Group>(null);
  const show = progress > 0.08 && progress < 0.58;
  const tLift = smoothstep(0.2, 0.48, progress);

  useFrame(({ clock }) => {
    if (!group.current || !show) return;
    const phase = smoothstep(0.1, 0.52, progress);
    const z = -40 + phase * 80 + Math.sin(clock.elapsedTime * 0.4) * 2;
    const x = W / 2 + 18;
    group.current.position.set(x, 0, z);
    group.current.rotation.y = -Math.PI / 2 + Math.sin(clock.elapsedTime * 0.2) * 0.05;
    if (boom.current) {
      boom.current.rotation.z = -0.35 - tLift * 0.55 + Math.sin(clock.elapsedTime * 0.8) * 0.03;
    }
  });

  if (!show) return null;

  return (
    <group>
      <group position={[W / 2 + 28, 0, -30]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh position={[0, 2.2, 0]} material={mats.truckCab} castShadow>
          <boxGeometry args={[8, 3.2, 6]} />
        </mesh>
        <mesh position={[10, 1.6, 0]} material={mats.steelDark} castShadow>
          <boxGeometry args={[16, 1.2, 7]} />
        </mesh>
        <mesh position={[8, 2.6, 0]} material={mats.steelPrimed} castShadow>
          <boxGeometry args={[10, 1.2, 5]} />
        </mesh>
        <mesh position={[14, 2.4, 1.5]} material={mats.panelWall} castShadow>
          <boxGeometry args={[6, 0.8, 2]} />
        </mesh>
        {[-2.5, 2.5].map((z, i) => (
          <group key={i}>
            <mesh position={[-1, 0.7, z]} material={mats.black} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.7, 0.7, 0.5, 12]} />
            </mesh>
            <mesh position={[12, 0.7, z]} material={mats.black} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.7, 0.7, 0.5, 12]} />
            </mesh>
          </group>
        ))}
      </group>

      <mesh position={[W / 2 + 10, 0.6, 20]} material={mats.steelPrimed} castShadow>
        <boxGeometry args={[8, 1.2, 3]} />
      </mesh>
      <mesh position={[W / 2 + 10, 0.5, 26]} material={mats.wood} castShadow>
        <boxGeometry args={[6, 0.3, 2]} />
      </mesh>
      <mesh position={[W / 2 + 10, 1.1, 26]} material={mats.panelRoof} castShadow>
        <boxGeometry args={[6, 0.9, 2.2]} />
      </mesh>

      <group ref={group}>
        <mesh position={[0, 1.2, 0]} material={mats.yellow} castShadow>
          <boxGeometry args={[3.2, 1.6, 6]} />
        </mesh>
        <mesh position={[0, 2.6, -1.2]} material={mats.black} castShadow>
          <boxGeometry args={[2.4, 1.4, 2.2]} />
        </mesh>
        <mesh position={[0, 2.7, -0.4]} material={mats.glass}>
          <boxGeometry args={[2.1, 1, 0.1]} />
        </mesh>
        {[
          [-1.4, 0.7, 2],
          [1.4, 0.7, 2],
          [-1.4, 0.7, -2],
          [1.4, 0.7, -2],
        ].map((p, i) => (
          <mesh key={i} position={p as [number, number, number]} rotation={[0, 0, Math.PI / 2]} material={mats.black} castShadow>
            <cylinderGeometry args={[0.75, 0.75, 0.55, 12]} />
          </mesh>
        ))}
        <group ref={boom} position={[0, 2.2, 2.2]}>
          <mesh position={[0, 0, 4]} material={mats.yellow} castShadow>
            <boxGeometry args={[0.55, 0.45, 8]} />
          </mesh>
          <mesh position={[0, -0.4, 8]} material={mats.steelDark} castShadow>
            <boxGeometry args={[1.6, 0.25, 0.4]} />
          </mesh>
          <mesh position={[-0.45, -0.9, 8.8]} material={mats.steel} castShadow>
            <boxGeometry args={[0.2, 0.15, 2.2]} />
          </mesh>
          <mesh position={[0.45, -0.9, 8.8]} material={mats.steel} castShadow>
            <boxGeometry args={[0.2, 0.15, 2.2]} />
          </mesh>
          {progress > 0.22 && progress < 0.5 && (
            <mesh position={[0, -1.4, 8.5]} material={mats.steelPrimed} castShadow>
              <boxGeometry args={[0.5, 0.6, 4]} />
            </mesh>
          )}
        </group>
      </group>
    </group>
  );
}

export function TempBracing() {
  const progress = useErectionStore((s) => s.progress);
  if (progress <= 0.28 || progress >= 0.62) return null;
  const half = W / 2;
  return (
    <group>
      <mesh position={[-half - 8, H / 2, 0]} rotation={[0, 0, 0.7]} material={mats.cable}>
        <cylinderGeometry args={[0.04, 0.04, 18, 6]} />
      </mesh>
      <mesh position={[half + 8, H / 2, 0]} rotation={[0, 0, -0.7]} material={mats.cable}>
        <cylinderGeometry args={[0.04, 0.04, 18, 6]} />
      </mesh>
    </group>
  );
}
