import {
  Canvas,
  useFrame,
} from "@react-three/fiber";

import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";

import {
  EffectComposer,
  Bloom,
} from "@react-three/postprocessing";

import * as THREE from "three";

import {
  useRef,
} from "react";

function RakhiHalf({
  side,
  splitProgress,
  glowing,
}) {
  const group = useRef();

  const direction =
    side === "left" ? -1 : 1;

  useFrame((state) => {
    if (!group.current) return;

    const time =
      state.clock.elapsedTime;

    if (splitProgress === 0) {
      group.current.position.x =
        direction *
        Math.sin(time * 0.3) *
        0.02;

      group.current.rotation.z =
        Math.sin(time * 0.4) *
        0.01;
    } else {
      const distance =
        splitProgress * 1.8;

      group.current.position.x =
        direction * distance;

      group.current.rotation.z =
        direction *
        splitProgress *
        0.08;
    }
  });

  return (
    <group ref={group}>
      {/* Half centerpiece */}
      <mesh
        position={[
          direction * 0.45,
          0,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            0.75,
            0.75,
            0.18,
            64,
            1,
            false,
            side === "left"
              ? 0
              : Math.PI,
            Math.PI,
          ]}
        />

        <meshStandardMaterial
          color="#d69b38"
          metalness={0.95}
          roughness={0.18}
          emissive={
            glowing
              ? "#ffcf6e"
              : "#000000"
          }
          emissiveIntensity={
            glowing ? 0.8 : 0
          }
        />
      </mesh>

      {/* Outer decorative ring */}
      <mesh
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            0.82,
            0.045,
            20,
            64,
            Math.PI,
          ]}
        />

        <meshStandardMaterial
          color="#f0bd5c"
          metalness={1}
          roughness={0.16}
          emissive={
            glowing
              ? "#ffe3a0"
              : "#000000"
          }
          emissiveIntensity={
            glowing ? 1 : 0
          }
        />
      </mesh>

      {/* Inner ring */}
      <mesh
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            0.58,
            0.035,
            20,
            64,
            Math.PI,
          ]}
        />

        <meshStandardMaterial
          color="#ffe09a"
          metalness={1}
          roughness={0.15}
        />
      </mesh>

      {/* Decorative beads */}
      {Array.from({
        length: 5,
      }).map((_, index) => {
        const angle =
          side === "left"
            ? Math.PI +
              (index / 4) * Math.PI
            : (index / 4) * Math.PI;

        return (
          <mesh
            key={index}
            position={[
              Math.cos(angle) * 0.9,
              Math.sin(angle) * 0.9,
              0.12,
            ]}
          >
            <sphereGeometry
              args={[
                0.08,
                16,
                16,
              ]}
            />

            <meshStandardMaterial
              color="#e8b44c"
              metalness={0.95}
              roughness={0.15}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function RakhiCenter({
  glowing,
  splitProgress,
}) {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;

    if (splitProgress > 0) {
      group.current.visible = false;
      return;
    }

    group.current.visible = true;

    const time =
      state.clock.elapsedTime;

    group.current.rotation.y =
      Math.sin(time * 0.35) *
      0.12;

    group.current.rotation.x =
      Math.sin(time * 0.25) *
      0.04;
  });

  return (
    <group ref={group}>
      {/* Main circular center */}
      <mesh>
        <cylinderGeometry
          args={[
            0.62,
            0.62,
            0.2,
            64,
          ]}
        />

        <meshStandardMaterial
          color="#c98b2d"
          metalness={0.95}
          roughness={0.18}
          emissive={
            glowing
              ? "#ffd66e"
              : "#000000"
          }
          emissiveIntensity={
            glowing ? 1 : 0
          }
        />
      </mesh>

      {/* Center gem */}
      <mesh
        position={[
          0,
          0,
          0.16,
        ]}
      >
        <sphereGeometry
          args={[
            0.27,
            32,
            32,
          ]}
        />

        <meshPhysicalMaterial
          color="#8c1528"
          metalness={0.3}
          roughness={0.12}
          clearcoat={1}
          emissive={
            glowing
              ? "#ff334f"
              : "#000000"
          }
          emissiveIntensity={
            glowing ? 1.5 : 0
          }
        />
      </mesh>

      {/* Gem ring */}
      <mesh
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            0.35,
            0.035,
            20,
            64,
          ]}
        />

        <meshStandardMaterial
          color="#f0c15d"
          metalness={1}
          roughness={0.15}
        />
      </mesh>
    </group>
  );
}

function RakhiScene({
  splitProgress,
  glowing,
  opening,
}) {
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[
          0,
          0,
          5.5,
        ]}
        fov={42}
      />

      <ambientLight
        intensity={
          glowing ? 1.2 : 0.65
        }
      />

      <directionalLight
        position={[
          3,
          4,
          5,
        ]}
        intensity={
          glowing ? 4 : 2.5
        }
      />

      <pointLight
        position={[
          -3,
          1,
          3,
        ]}
        intensity={
          glowing ? 35 : 15
        }
        distance={8}
        color="#ffd27a"
      />

      <pointLight
        position={[
          3,
          -1,
          2,
        ]}
        intensity={
          glowing ? 20 : 8
        }
        distance={7}
        color="#ff4262"
      />

      <RakhiCenter
        glowing={glowing}
        splitProgress={
          splitProgress
        }
      />

      <RakhiHalf
        side="left"
        splitProgress={
          splitProgress
        }
        glowing={glowing}
      />

      <RakhiHalf
        side="right"
        splitProgress={
          splitProgress
        }
        glowing={glowing}
      />

      {/* Threads */}
      <mesh
        position={[
          -1.7,
          0,
          -0.1,
        ]}
        rotation={[
          0,
          0,
          Math.PI / 2,
        ]}
      >
        <cylinderGeometry
          args={[
            0.055,
            0.055,
            2.3,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#9b162b"
          roughness={0.45}
        />
      </mesh>

      <mesh
        position={[
          1.7,
          0,
          -0.1,
        ]}
        rotation={[
          0,
          0,
          Math.PI / 2,
        ]}
      >
        <cylinderGeometry
          args={[
            0.055,
            0.055,
            2.3,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#9b162b"
          roughness={0.45}
        />
      </mesh>

      <Environment
        preset="studio"
        environmentIntensity={
          glowing ? 2 : 1.2
        }
      />

      <EffectComposer>
        <Bloom
          intensity={
            glowing ? 2.2 : 1.1
          }
          luminanceThreshold={
            glowing ? 0.2 : 0.45
          }
          luminanceSmoothing={0.8}
          mipmapBlur
        />
      </EffectComposer>

      {!opening && (
        <OrbitControls
          enablePan={false}
          enableZoom
          minDistance={3}
          maxDistance={8}
          enableDamping
          dampingFactor={0.06}
          rotateSpeed={0.7}
        />
      )}
    </>
  );
}

function Rakhi3D({
  splitProgress = 0,
  glowing = false,
  opening = false,
}) {
  return (
    <div className="rakhi-3d-container">
      <Canvas
        dpr={[1, 1.5]}
        camera={{
          position: [
            0,
            0,
            5.5,
          ],
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference:
            "high-performance",
          toneMapping:
            THREE.ACESFilmicToneMapping,
          toneMappingExposure:
            glowing ? 1.3 : 1.1,
        }}
      >
        <RakhiScene
          splitProgress={
            splitProgress
          }
          glowing={glowing}
          opening={opening}
        />
      </Canvas>
    </div>
  );
}

export default Rakhi3D;