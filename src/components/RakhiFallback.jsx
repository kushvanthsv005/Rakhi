import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const GOLD = "#d89b35";
const LIGHT_GOLD = "#ffe3a0";
const RED = "#9d172b";

function GoldMaterial({
  emissive = false,
}) {
  return (
    <meshStandardMaterial
      color={GOLD}
      metalness={0.92}
      roughness={0.2}
      envMapIntensity={2}
      emissive={
        emissive ? LIGHT_GOLD : "#000000"
      }
      emissiveIntensity={
        emissive ? 0.8 : 0
      }
    />
  );
}

function RedMaterial() {
  return (
    <meshStandardMaterial
      color={RED}
      metalness={0.15}
      roughness={0.45}
    />
  );
}

function GemMaterial({
  glowing = false,
}) {
  return (
    <meshPhysicalMaterial
      color="#7d1023"
      metalness={0.25}
      roughness={0.12}
      transmission={0.05}
      clearcoat={1}
      clearcoatRoughness={0.08}
      emissive={
        glowing ? "#ff3f55" : "#000000"
      }
      emissiveIntensity={
        glowing ? 1.4 : 0
      }
      envMapIntensity={2}
    />
  );
}

function GoldRing({
  radius,
  tube = 0.035,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  glowing = false,
}) {
  return (
    <mesh
      rotation={rotation}
      position={position}
    >
      <torusGeometry
        args={[
          radius,
          tube,
          24,
          96,
        ]}
      />

      <GoldMaterial
        emissive={glowing}
      />
    </mesh>
  );
}

function Beads({
  side,
  glowing,
}) {
  const beads = [];

  const count = 6;
  const radius = 1.22;

  for (let i = 0; i < count; i++) {
    const fullIndex =
      side === "left"
        ? i
        : i + count;

    const angle =
      (fullIndex / 12) *
      Math.PI *
      2;

    beads.push(
      <mesh
        key={i}
        position={[
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0.08,
        ]}
        scale={0.12}
      >
        <sphereGeometry
          args={[1, 20, 20]}
        />

        <GoldMaterial
          emissive={glowing}
        />
      </mesh>
    );
  }

  return <>{beads}</>;
}

function Petals({
  side,
  glowing,
}) {
  const petals = [];

  const start =
    side === "left" ? 0 : 4;

  for (let i = 0; i < 4; i++) {
    const index = start + i;

    const angle =
      (index / 8) *
      Math.PI *
      2;

    const x =
      Math.cos(angle) * 0.82;

    const y =
      Math.sin(angle) * 0.82;

    petals.push(
      <mesh
        key={i}
        position={[
          x,
          y,
          0.04,
        ]}
        rotation={[
          0,
          0,
          angle,
        ]}
        scale={[
          0.45,
          0.18,
          0.07,
        ]}
      >
        <sphereGeometry
          args={[1, 20, 12]}
        />

        <GoldMaterial
          emissive={glowing}
        />
      </mesh>
    );
  }

  return <>{petals}</>;
}

function Thread({
  side,
  split,
  glowing,
}) {
  const group = useRef();

  const direction =
    side === "left" ? -1 : 1;

  useFrame((state) => {
    if (!group.current) {
      return;
    }

    const time =
      state.clock.elapsedTime;

    if (!split) {
      group.current.rotation.z =
        Math.sin(time * 1.2) *
        0.025;
    }
  });

  return (
    <group
      ref={group}
      position={[
        direction * 1.7,
        0,
        -0.08,
      ]}
    >
      <mesh
        rotation={[
          0,
          0,
          side === "left"
            ? Math.PI
            : 0,
        ]}
      >
        <cylinderGeometry
          args={[
            0.055,
            0.055,
            2.2,
            16,
          ]}
        />

        <RedMaterial />
      </mesh>

      <mesh
        position={[
          direction * 0.05,
          0.07,
          0.03,
        ]}
        rotation={[
          0,
          0,
          side === "left"
            ? Math.PI
            : 0,
        ]}
      >
        <cylinderGeometry
          args={[
            0.018,
            0.018,
            2.2,
            10,
          ]}
        />

        <GoldMaterial
          emissive={glowing}
        />
      </mesh>
    </group>
  );
}

function RakhiHalf({
  side,
  splitProgress,
  glowing,
}) {
  const group = useRef();

  const isLeft =
    side === "left";

  const maxSeparation = 1.9;

  useFrame(() => {
    if (!group.current) {
      return;
    }

    const direction =
      isLeft ? -1 : 1;

    const separation =
      splitProgress *
      maxSeparation;

    group.current.position.x =
      direction * separation;

    group.current.rotation.z =
      direction *
      splitProgress *
      0.04;
  });

  return (
    <group ref={group}>
      <mesh
        position={[
          isLeft ? -0.53 : 0.53,
          0,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            0.55,
            0.55,
            0.16,
            64,
            1,
            false,
            isLeft ? 0 : Math.PI,
            Math.PI,
          ]}
        />

        <GoldMaterial
          emissive={glowing}
        />
      </mesh>

      <group>
        <Petals
          side={side}
          glowing={glowing}
        />

        <Beads
          side={side}
          glowing={glowing}
        />
      </group>

      <GoldRing
        radius={0.82}
        tube={0.045}
        glowing={glowing}
      />

      <GoldRing
        radius={1}
        tube={0.035}
        glowing={glowing}
      />

      <Thread
        side={side}
        split={splitProgress > 0}
        glowing={glowing}
      />
    </group>
  );
}

function CenterGem({
  glowing,
}) {
  return (
    <mesh
      position={[
        0,
        0,
        0.22,
      ]}
    >
      <sphereGeometry
        args={[
          0.34,
          32,
          32,
        ]}
      />

      <GemMaterial
        glowing={glowing}
      />
    </mesh>
  );
}

function RakhiFallback({
  splitProgress = 0,
  glowing = false,
}) {
  const wholeGroup = useRef();

  useFrame((state) => {
    if (!wholeGroup.current) {
      return;
    }

    if (splitProgress > 0) {
      return;
    }

    const time =
      state.clock.elapsedTime;

    wholeGroup.current.rotation.y =
      Math.sin(time * 0.35) *
      0.15;

    wholeGroup.current.rotation.x =
      Math.sin(time * 0.25) *
      0.04;
  });

  return (
    <Float
      speed={1.1}
      rotationIntensity={0.12}
      floatIntensity={0.35}
    >
      <group ref={wholeGroup}>
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

        {!splitProgress && (
          <>
            <mesh
              position={[
                0,
                0,
                0,
              ]}
            >
              <cylinderGeometry
                args={[
                  1.05,
                  1.05,
                  0.16,
                  64,
                ]}
              />

              <GoldMaterial
                emissive={glowing}
              />
            </mesh>

            <GoldRing
              radius={0.57}
              tube={0.025}
              position={[
                0,
                0,
                0.12,
              ]}
              glowing={glowing}
            />

            <CenterGem
              glowing={glowing}
            />
          </>
        )}
      </group>
    </Float>
  );
}

export default RakhiFallback;