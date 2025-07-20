import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

// Path to sky.glb in public folder
const skyScenePath = "/3d/sky.glb";

function Sky({ isRotating }) {
  const skyRef = useRef();
  const { scene } = useGLTF(skyScenePath);

  useFrame((_, delta) => {
    if (isRotating && skyRef.current) {
      skyRef.current.rotation.y += 0.25 * delta;
    }
  });

  return <primitive ref={skyRef} object={scene} dispose={null} />;
}

useGLTF.preload(skyScenePath);

export default Sky;
