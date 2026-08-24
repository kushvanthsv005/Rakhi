import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

function RakhiModel({
  split = false,
}) {
  const { scene } = useGLTF(
    "/models/rakhi.glb"
  );

  useEffect(() => {
    scene.traverse((child) => {
      if (!child.isMesh) return;

      child.castShadow = true;
      child.receiveShadow = true;

      if (child.material) {
        child.material.envMapIntensity = 1.8;
      }
    });
  }, [scene]);

  return (
    <primitive
      object={scene}
      scale={1.5}
    />
  );
}

useGLTF.preload("/models/rakhi.glb");

export default RakhiModel;