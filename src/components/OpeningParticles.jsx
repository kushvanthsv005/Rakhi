import { useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function OpeningParticles({
  active,
  intensity = 1,
}) {
  const count = 500;

  const positions = useMemo(() => {
    const data = new Float32Array(
      count * 3
    );

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      data[i3] =
        (Math.random() - 0.5) * 2;

      data[i3 + 1] =
        (Math.random() - 0.5) * 2;

      data[i3 + 2] =
        (Math.random() - 0.5) * 2;
    }

    return data;
  }, []);

  const velocities = useMemo(() => {
    const data = new Float32Array(
      count * 3
    );

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const vector =
        new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize();

      const speed =
        Math.random() * 0.035 +
        0.01;

      data[i3] =
        vector.x * speed;

      data[i3 + 1] =
        vector.y * speed;

      data[i3 + 2] =
        vector.z * speed;
    }

    return data;
  }, []);

  const geometry = useMemo(() => {
    const geometry =
      new THREE.BufferGeometry();

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        positions,
        3
      )
    );

    return geometry;
  }, [positions]);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  useFrame(() => {
    if (!active) {
      return;
    }

    const position =
      geometry.attributes.position;

    for (
      let i = 0;
      i < count;
      i++
    ) {
      const i3 = i * 3;

      position.array[i3] +=
        velocities[i3] *
        intensity;

      position.array[i3 + 1] +=
        velocities[i3 + 1] *
        intensity;

      position.array[i3 + 2] +=
        velocities[i3 + 2] *
        intensity;

      if (
        Math.abs(
          position.array[i3]
        ) > 5
      ) {
        position.array[i3] = 0;
      }

      if (
        Math.abs(
          position.array[i3 + 1]
        ) > 5
      ) {
        position.array[i3 + 1] = 0;
      }

      if (
        Math.abs(
          position.array[i3 + 2]
        ) > 5
      ) {
        position.array[i3 + 2] = 0;
      }
    }

    position.needsUpdate = true;
  });

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={0.035}
        color="#f8cf7c"
        transparent
        opacity={
          active ? 0.9 : 0
        }
        depthWrite={false}
        blending={
          THREE.AdditiveBlending
        }
      />
    </points>
  );
}

export default OpeningParticles;