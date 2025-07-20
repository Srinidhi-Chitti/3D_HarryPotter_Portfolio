import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";

export function HarryFlying({
  isRotating,
  setIsRotating,
  position = [0, -1, 0],
  scale = [0.5, 0.5, 0.5],
  rotation = [0, 0, 0],
}) {
  const modelRef = useRef();
  const { scene, animations } = useGLTF("/3d/Harryhome.glb"); // ✅ Correct model path
  const { actions } = useAnimations(animations, modelRef);
  const { gl, viewport } = useThree();

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsRotating(true);
    lastX.current = e.clientX || e.touches?.[0].clientX;
  };

  const handlePointerUp = () => {
    setIsRotating(false);
  };

  const handlePointerMove = (e) => {
    if (!isRotating || !modelRef.current) return;
    const clientX = e.clientX || e.touches?.[0].clientX;
    const delta = (clientX - lastX.current) / viewport.width;
    modelRef.current.rotation.y += delta * 0.01 * Math.PI;
    lastX.current = clientX;
    rotationSpeed.current = delta * 0.01 * Math.PI;
  };

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
    };
  }, [gl, isRotating]);

  useFrame(() => {
    if (!isRotating && modelRef.current) {
      rotationSpeed.current *= dampingFactor;
      if (Math.abs(rotationSpeed.current) < 0.001) rotationSpeed.current = 0;
      modelRef.current.rotation.y += rotationSpeed.current;
    }
  });

  useEffect(() => {
    if (actions["Take 001"]) {
      actions["Take 001"].play();
    }
  }, [actions]);

  return (
    <group
      ref={modelRef}
      position={position}
      scale={scale}
      rotation={rotation}
      dispose={null}
    >
      <primitive object={scene} />
    </group>
  );
}

// ✅ Fix preload path to match loaded model
useGLTF.preload("/3d/Harryhome.glb");
export default HarryFlying;
