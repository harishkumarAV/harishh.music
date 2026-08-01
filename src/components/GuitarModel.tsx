import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import type { Group } from "three";
import * as THREE from "three";

function createBodyShape() {
  const s = new THREE.Shape();
  const bottom = -1.35;
  const lower = -0.95;
  const waist = -0.45;
  const upper = 0.05;
  const top = 0.42;

  s.moveTo(0, bottom);
  s.bezierCurveTo(0.42, bottom, 0.72, bottom + 0.18, 0.7, lower);
  s.bezierCurveTo(0.68, lower + 0.22, 0.58, waist - 0.12, 0.36, waist);
  s.bezierCurveTo(0.42, waist + 0.18, 0.52, upper - 0.08, 0.48, upper);
  s.bezierCurveTo(0.4, upper + 0.14, 0.18, top, 0, top);
  s.bezierCurveTo(-0.18, top, -0.4, upper + 0.14, -0.48, upper);
  s.bezierCurveTo(-0.52, upper - 0.08, -0.42, waist + 0.18, -0.36, waist);
  s.bezierCurveTo(-0.58, waist - 0.12, -0.68, lower + 0.22, -0.7, lower);
  s.bezierCurveTo(-0.72, bottom + 0.18, -0.42, bottom, 0, bottom);
  return s;
}

/** Acoustic guitar — charcoal / silver to match the B&W site. */
export function GuitarModel() {
  const frets = useMemo(() => Array.from({ length: 15 }, (_, i) => i), []);

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
        color: "#2a2a2a",
        metalness: 0.25,
        roughness: 0.48,
      }),
    []
  );
  const darkWood = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#111111",
        metalness: 0.2,
        roughness: 0.55,
      }),
    []
  );
  const maple = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#bdbdbd",
        metalness: 0.15,
        roughness: 0.5,
      }),
    []
  );
  const chrome = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#cfcfcf",
        metalness: 1,
        roughness: 0.22,
      }),
    []
  );
  const rosette = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#d8d8d8",
        emissive: "#ffffff",
        emissiveIntensity: 0.2,
        metalness: 0.45,
        roughness: 0.35,
      }),
    []
  );

  const bridgePinXs = useMemo(
    () => [-0.095, -0.057, -0.019, 0.019, 0.057, 0.095],
    []
  );
  const nutXs = useMemo(
    () => [-0.048, -0.029, -0.01, 0.01, 0.029, 0.048],
    []
  );
  const pegTargets = useMemo(
    () => [
      new THREE.Vector3(-0.085, 1.9, 0.075),
      new THREE.Vector3(-0.085, 2.05, 0.075),
      new THREE.Vector3(-0.085, 2.2, 0.075),
      new THREE.Vector3(0.085, 2.2, 0.075),
      new THREE.Vector3(0.085, 2.05, 0.075),
      new THREE.Vector3(0.085, 1.9, 0.075),
    ],
    []
  );

  const stringPaths = useMemo(
    () =>
      bridgePinXs.map((bx, i) => [
        new THREE.Vector3(bx, -0.93, 0.105),
        new THREE.Vector3(nutXs[i], 1.672, 0.092),
      ]),
    [bridgePinXs, nutXs]
  );

  const headPaths = useMemo(
    () =>
      nutXs.map((nx, i) => [
        new THREE.Vector3(nx, 1.695, 0.092),
        pegTargets[i],
      ]),
    [nutXs, pegTargets]
  );

  return (
    <group dispose={null} scale={1.05}>
      <mesh geometry={bodyGeom} material={bodyMat} castShadow receiveShadow />

      <mesh position={[0, -0.35, 0.11]} material={darkWood}>
        <cylinderGeometry args={[0.16, 0.16, 0.04, 40]} />
      </mesh>
      <mesh
        position={[0, -0.35, 0.125]}
        rotation={[Math.PI / 2, 0, 0]}
        material={rosette}
      >
        <torusGeometry args={[0.19, 0.012, 12, 48]} />
      </mesh>
      <mesh position={[0, -0.35, 0.125]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.22, 0.006, 8, 48]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.6} />
      </mesh>

      <mesh position={[0, -0.95, 0.12]} material={darkWood} castShadow>
        <boxGeometry args={[0.38, 0.07, 0.05]} />
      </mesh>
      <mesh position={[0, -0.93, 0.155]} material={chrome}>
        <boxGeometry args={[0.3, 0.018, 0.02]} />
      </mesh>
      {bridgePinXs.map((x) => (
        <mesh key={x} position={[x, -1.0, 0.15]} material={chrome}>
          <sphereGeometry args={[0.012, 10, 10]} />
        </mesh>
      ))}

      <mesh position={[0, 1.05, 0.02]} material={maple} castShadow>
        <boxGeometry args={[0.13, 1.35, 0.07]} />
      </mesh>
      <mesh position={[0, 1.02, 0.065]} material={darkWood} castShadow>
        <boxGeometry args={[0.125, 1.28, 0.025]} />
      </mesh>

      {frets.map((i) => {
        const y = 0.42 + i * 0.078;
        return (
          <group key={i}>
            <mesh position={[0, y, 0.08]} material={chrome}>
              <boxGeometry args={[0.12, 0.006, 0.01]} />
            </mesh>
            {[2, 4, 6, 8, 11].includes(i) && (
              <mesh position={[0, y + 0.035, 0.082]} material={chrome}>
                <sphereGeometry args={[0.008, 8, 8]} />
              </mesh>
            )}
          </group>
        );
      })}

      {/* Nut — visible break where fretted strings end */}
      <mesh position={[0, 1.685, 0.091]}>
        <boxGeometry args={[0.13, 0.03, 0.024]} />
        <meshStandardMaterial
          color="#c8c8c8"
          metalness={0.12}
          roughness={0.5}
        />
      </mesh>

      <mesh position={[0, 1.98, 0.02]} material={bodyMat} castShadow>
        <boxGeometry args={[0.24, 0.48, 0.08]} />
      </mesh>
      <mesh position={[0, 2.05, 0.06]} material={darkWood}>
        <boxGeometry args={[0.2, 0.32, 0.02]} />
      </mesh>

      {[-0.09, 0.09].map((x, side) =>
        [1.9, 2.05, 2.2].map((y, i) => (
          <group key={`${side}-${i}`} position={[x, y, 0.06]}>
            <mesh material={chrome} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.016, 0.016, 0.07, 12]} />
            </mesh>
            <mesh
              position={[side === 0 ? -0.045 : 0.045, 0, 0.02]}
              material={chrome}
            >
              <boxGeometry args={[0.04, 0.018, 0.03]} />
            </mesh>
          </group>
        ))
      )}

      {/* Soft main strings: bridge → nut */}
      {stringPaths.map((pts, i) => (
        <Line
          key={`str-${i}`}
          points={pts}
          color="#8e8e8e"
          lineWidth={1.05 + i * 0.1}
          transparent
          opacity={0.7}
          depthTest={false}
          depthWrite={false}
          renderOrder={20}
        />
      ))}

      {/* Soft headstock fan: nut → pegs */}
      {headPaths.map((pts, i) => (
        <Line
          key={`head-${i}`}
          points={pts}
          color="#7a7a7a"
          lineWidth={0.9}
          transparent
          opacity={0.5}
          depthTest={false}
          depthWrite={false}
          renderOrder={21}
        />
      ))}

      <mesh position={[0, -0.45, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.78, 0.007, 8, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.16}
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
