import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

// Path to the Snitch GLB model in the public folder
const snitchScenePath = "/3d/snitch.glb";

function Snitch({ isRotating, ...props }) {
  const groupRef = useRef();

  // Load the GLB model and its animations
  const { scene, animations } = useGLTF(snitchScenePath);
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    const action = actions["Take 001"];
    if (!action) return;

    if (isRotating) {
      action.reset().fadeIn(0.5).play();
    } else {
      action.fadeOut(0.5).stop();
    }

    return () => {
      action.stop();
    };
  }, [actions, isRotating]);

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(snitchScenePath);

export default Snitch;
