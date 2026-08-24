import {
  useMemo,
  useRef,
} from "react";

import {
  useFrame,
} from "@react-three/fiber";

import {
  Points,
  PointMaterial,
} from "@react-three/drei";

import * as THREE from "three";

import {
  performanceSettings,
} from "../utils/performanceSettings";

function ParticleBackground() {
  const pointsRef =
    useRef(null);

  const count =
    performanceSettings.particles;

  const positions = useMemo(() => {
    const array =
      new Float32Array(
        count * 3
      );

    for (
      let i = 0;
      i < count;
      i++
    ) {
      const i3 = i * 3;

      array[i3] =
        (Math.random() - 0.5) * 12;

      array[i3 + 1] =
        (Math.random() - 0.5) * 8;

      array[i3 + 2] =
        (Math.random() - 0.5) * 8;
    }

    return array;
  }, [count]);

  useFrame(
    (state, delta) => {
      if (!pointsRef.current) {
        return;
      }

      pointsRef.current.rotation.y +=
        delta * 0.025;

      pointsRef.current.rotation.x +=
        delta * 0.008;
    }
  );

  return (
    <Points
      ref={pointsRef}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#efc777"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  );
}

export default ParticleBackground;