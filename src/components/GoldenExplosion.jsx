import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GoldenExplosion({
  active,
}) {
  const group = useRef();

  const rings = useRef([]);

  useEffect(() => {
    rings.current = Array.from({
      length: 5,
    }).map(() => ({
      scale: 0,
      opacity: 1,
      rotation: Math.random() * Math.PI,
    }));
  }, []);

  useFrame((_, delta) => {
    if (!group.current) {
      return;
    }

    group.current.visible = active;

    if (!active) {
      return;
    }

    group.current.children.forEach(
      (child, index) => {
        const data =
          rings.current[index];

        if (!data) return;

        data.scale += delta * 4;
        data.opacity -= delta * 0.9;

        child.scale.setScalar(
          data.scale
        );

        child.rotation.z +=
          delta * 2;

        child.material.opacity =
          Math.max(
            data.opacity,
            0
          );
      }
    );
  });

  return (
    <group ref={group}>
      {Array.from({
        length: 5,
      }).map((_, index) => (
        <mesh
          key={index}
          rotation={[
            0,
            0,
            Math.random() *
              Math.PI,
          ]}
        >
          <ringGeometry
            args={[
              0.45,
              0.52,
              64,
            ]}
          />

          <meshBasicMaterial
            color="#ffe3a0"
            transparent
            opacity={0}
            side={
              THREE.DoubleSide
            }
            blending={
              THREE.AdditiveBlending
            }
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export default GoldenExplosion;