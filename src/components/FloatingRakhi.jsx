import {
  Canvas,
  useFrame,
} from "@react-three/fiber";

import {
  Environment,
} from "@react-three/drei";

import {
  useRef,
} from "react";

import * as THREE from "three";

function FloatingRakhiMesh() {
  const ref =
    useRef(null);

  useFrame(
    (state) => {
      if (!ref.current) {
        return;
      }

      const time =
        state.clock.elapsedTime;

      ref.current.rotation.z =
        Math.sin(time * 0.5) *
        0.08;

      ref.current.rotation.y +=
        0.002;

      ref.current.position.y =
        Math.sin(time * 0.7) *
        0.12;
    }
  );

  return (
    <group
      ref={ref}
      scale={0.85}
    >
      <mesh>
        <torusGeometry
          args={[
            0.8,
            0.08,
            16,
            64,
          ]}
        />

        <meshStandardMaterial
          color="#8f263e"
          roughness={0.5}
        />
      </mesh>

      <mesh
        position={[
          0,
          0,
          0.1,
        ]}
      >
        <cylinderGeometry
          args={[
            0.38,
            0.38,
            0.16,
            32,
          ]}
        />

        <meshStandardMaterial
          color="#efc777"
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>

      <mesh
        position={[
          0,
          0,
          0.2,
        ]}
      >
        <sphereGeometry
          args={[
            0.12,
            24,
            24,
          ]}
        />

        <meshStandardMaterial
          color="#fff0b8"
          emissive="#efc777"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

function FloatingRakhi() {
  return (
    <div className="floating-rakhi">
      <Canvas
        camera={{
          position: [
            0,
            0,
            4,
          ],
          fov: 40,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
        }}
      >
        <ambientLight
          intensity={0.7}
        />

        <pointLight
          position={[
            2,
            2,
            3,
          ]}
          intensity={2}
          color="#efc777"
        />

        <Environment
          preset="studio"
        />

        <FloatingRakhiMesh />
      </Canvas>
    </div>
  );
}

export default FloatingRakhi;