import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function HarryBroom({ currentAnimation = "Idle", ...props }) {
  const group = useRef();
  const { scene, animations } = useGLTF("/3d/Harry.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Stop all existing animations
    Object.values(actions).forEach((action) => action.stop());

    // Play the selected animation or fallback
    if (actions[currentAnimation]) {
      actions[currentAnimation].play();
    } else {
      const fallback = Object.values(actions)[0];
      fallback?.play();
    }
  }, [actions, currentAnimation]);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.position.y = Math.sin(clock.elapsedTime * 1.5) * 0.1;
      group.current.rotation.z = Math.sin(clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

// ✅ Preload for performance
useGLTF.preload("/3d/Harry.glb");

// ✅ Export as default
export default HarryBroom;
