import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import * as THREE from "three";

function createBodyShape() {
  const s = new THREE.Shape();
  // Acoustic guitar outline (front view). Units roughly match meters/scene scale.
  const bottom = -1.35;
  const lower = -0.95;
  const waist = -0.45;
  const upper = 0.05;
  const top = 0.42;

  s.moveTo(0, bottom);
  // lower bout right
  s.bezierCurveTo(0.42, bottom, 0.72, bottom + 0.18, 0.7, lower);
  s.bezierCurveTo(0.68, lower + 0.22, 0.58, waist - 0.12, 0.36, waist);
  // upper bout right
  s.bezierCurveTo(0.42, waist + 0.18, 0.52, upper - 0.08, 0.48, upper);
  s.bezierCurveTo(0.4, upper + 0.14, 0.18, top, 0, top);
  // mirror left
  s.bezierCurveTo(-0.18, top, -0.4, upper + 0.14, -0.48, upper);
  s.bezierCurveTo(-0.52, upper - 0.08, -0.42, waist + 0.18, -0.36, waist);
  s.bezierCurveTo(-0.58, waist - 0.12, -0.68, lower + 0.22, -0.7, lower);
  s.bezierCurveTo(-0.72, bottom + 0.18, -0.42, bottom, 0, bottom);
  return s;
}

/** Recognizable acoustic guitar built from real silhouette geometry. */
export function GuitarModel() {
  const frets = useMemo(() => Array.from({ length: 15 }, (_, i) => i), []);
  const strings = useMemo(() => Array.from({ length: 6 }, (_, i) => i), []);

  const bodyGeom = useMemo(() => {
    const geom = new THREE.ExtrudeGeometry(createBodyShape(), {
      depth: 0.2,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.03,
      bevelSegments: 3,
      curveSegments: 28,
    });
    geom.translate(0, 0, -0.1);
    geom.computeVertexNormals();
    return geom;
  }, []);

  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#6b3a1f",
        metalness: 0.12,
        roughness: 0.42,
      }),
    []
  );
  const darkWood = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#2a1810",
        metalness: 0.2,
        roughness: 0.5,
      }),
    []
  );
  const maple = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#d4b483",
        metalness: 0.08,
        roughness: 0.55,
      }),
    []
  );
  const chrome = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e8eef5",
        metalness: 1,
        roughness: 0.16,
      }),
    []
  );
  const stringMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c9d0d8",
        metalness: 0.95,
        roughness: 0.25,
      }),
    []
  );
  const rosette = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#3da9ff",
        emissive: "#1a6fff",
        emissiveIntensity: 0.85,
        metalness: 0.4,
        roughness: 0.35,
      }),
    []
  );

  return (
    <group dispose={null} rotation={[0, 0, -0.12]} scale={1.05}>
      {/* Body */}
      <mesh geometry={bodyGeom} material={bodyMat} castShadow receiveShadow />

      {/* Sound hole + neon rosette */}
      <mesh position={[0, -0.35, 0.11]} material={darkWood}>
        <cylinderGeometry args={[0.16, 0.16, 0.04, 40]} />
      </mesh>
      <mesh position={[0, -0.35, 0.125]} rotation={[Math.PI / 2, 0, 0]} material={rosette}>
        <torusGeometry args={[0.19, 0.012, 12, 48]} />
      </mesh>
      <mesh position={[0, -0.35, 0.125]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.22, 0.006, 8, 48]} />
        <meshStandardMaterial
          color="#1a0e08"
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>

      {/* Bridge + saddle */}
      <mesh position={[0, -0.95, 0.12]} material={darkWood} castShadow>
        <boxGeometry args={[0.38, 0.07, 0.05]} />
      </mesh>
      <mesh position={[0, -0.93, 0.15]} material={chrome}>
        <boxGeometry args={[0.3, 0.018, 0.02]} />
      </mesh>
      {/* Bridge pins */}
      {[-0.12, -0.07, -0.025, 0.025, 0.07, 0.12].map((x) => (
        <mesh key={x} position={[x, -1.0, 0.145]} material={chrome}>
          <sphereGeometry args={[0.012, 10, 10]} />
        </mesh>
      ))}

      {/* Neck */}
      <mesh position={[0, 1.05, 0.02]} material={maple} castShadow>
        <boxGeometry args={[0.13, 1.35, 0.07]} />
      </mesh>
      {/* Fretboard */}
      <mesh position={[0, 1.02, 0.065]} material={darkWood} castShadow>
        <boxGeometry args={[0.125, 1.28, 0.025]} />
      </mesh>

      {/* Frets + inlays */}
      {frets.map((i) => {
        const y = 0.42 + i * 0.078;
        return (
          <group key={i}>
            <mesh position={[0, y, 0.08]} material={chrome}>
              <boxGeometry args={[0.12, 0.008, 0.012]} />
            </mesh>
            {[2, 4, 6, 8, 11].includes(i) && (
              <mesh position={[0, y + 0.035, 0.082]} material={chrome}>
                <sphereGeometry args={[0.01, 8, 8]} />
              </mesh>
            )}
          </group>
        );
      })}

      {/* Nut */}
      <mesh position={[0, 1.68, 0.08]} material={chrome}>
        <boxGeometry args={[0.13, 0.02, 0.02]} />
      </mesh>

      {/* Headstock */}
      <mesh position={[0, 1.95, 0.02]} material={bodyMat} castShadow>
        <boxGeometry args={[0.24, 0.42, 0.08]} />
      </mesh>
      <mesh position={[0, 2.05, 0.06]} material={darkWood}>
        <boxGeometry args={[0.2, 0.28, 0.02]} />
      </mesh>

      {/* Tuning pegs, 3 per side */}
      {[-0.09, 0.09].map((x, side) =>
        [1.9, 2.05, 2.2].map((y, i) => (
          <group key={`${side}-${i}`} position={[x, y, 0.06]}>
            <mesh material={chrome} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.018, 0.018, 0.08, 12]} />
            </mesh>
            <mesh
              position={[side === 0 ? -0.05 : 0.05, 0, 0.02]}
              material={chrome}
            >
              <boxGeometry args={[0.045, 0.02, 0.035]} />
            </mesh>
          </group>
        ))
      )}

      {/* Strings from bridge to headstock */}
      {strings.map((i) => {
        const x = -0.075 + i * 0.03;
        return (
          <mesh key={`str-${i}`} position={[x, 0.55, 0.095]} material={stringMat}>
            <boxGeometry args={[0.0035, 2.85, 0.0035]} />
          </mesh>
        );
      })}

      {/* Soft neon rim for futuristic feel (subtle) */}
      <mesh position={[0, -0.45, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.78, 0.008, 8, 64]} />
        <meshStandardMaterial
          color="#4db8ff"
          emissive="#1a8cff"
          emissiveIntensity={1.2}
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

type DrivenProps = {
  getScroll: () => number;
  reduceMotion?: boolean;
};

export function ScrollDrivenGuitar({
  getScroll,
  reduceMotion = false,
}: DrivenProps) {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const s = Math.min(Math.max(getScroll(), 0), 1);

    if (reduceMotion) {
      group.current.rotation.set(0.08, 0.55, 0.05);
      group.current.position.set(0, -0.15, 0);
      group.current.scale.setScalar(0.95);
      return;
    }

    // Scroll: turn from side profile toward front 3/4 view
    group.current.rotation.y = 0.95 - s * 1.7 + Math.sin(t * 0.4) * 0.03;
    group.current.rotation.x = 0.22 - s * 0.28 + Math.sin(t * 0.5) * 0.012;
    group.current.rotation.z = -0.08 + s * 0.1;
    group.current.position.y = -0.25 + s * 0.2 + Math.sin(t * 0.7) * 0.015;
    group.current.position.x = 0;
    group.current.scale.setScalar(0.88 + s * 0.22);
  });

  return (
    <group ref={group}>
      <GuitarModel />
    </group>
  );
}
