/**
 * IMPORTANT: Loading glTF models into a Three.js scene is a lot of work.
 * Before we can configure or animate our model’s meshes, we need to iterate through
 * each part of our model’s meshes and save them separately.
 *
 * But luckily there is an app that turns gltf or glb files into jsx components
 * For this model, visit https://gltf.pmnd.rs/
 * And get the code. And then add the rest of the things.
 * YOU DON'T HAVE TO WRITE EVERYTHING FROM SCRATCH
 */



  // Get access to the Three.js renderer and viewport
  

  // Use a ref for the last mouse x position
  
  // Use a ref for rotation speed
  
  // Define a damping factor to control rotation damping
  

  // Handle pointer (mouse or touch) down event
 

    // Calculate the clientX based on whether it's a touch event or a mouse event
    

    // Store the current clientX position for reference
   

  // Handle pointer (mouse or touch) up event
  

  // Handle pointer (mouse or touch) move event
  
      // If rotation is enabled, calculate the change in clientX position
     

      // calculate the change in the horizontal position of the mouse cursor or touch input,
      // relative to the viewport's width
   

      // Update the island's rotation based on the mouse/touch movement
      

      // Update the reference for the last clientX position
     

      // Update the rotation speed
      

  // Handle keydown events
  
  // Handle keyup events
 

  // Touch events for mobile devices

    // Add event listeners for pointer and keyboard events
    

    // Remove event listeners when component unmounts
   

  // This function is called on each frame update
 
    // If not rotating, apply damping to slow down the rotation (smoothly)
    
      // Apply damping factor
      

      // Stop rotation when speed is very small
      
      // When rotating, determine the current stage based on island's orientation
     

      /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
      

      // Set the current stage based on the island's orientation
     
    // {Island 3D model from: https://sketchfab.com/3d-models/foxs-islands-163b68e09fcc47618450150be7785907}
import { a } from "@react-spring/three";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

function QuidditchPitch({
  isRotating,
  setIsRotating,
  setCurrentStage,
  currentFocusPoint,
  ...props
}) {
  const pitchRef = useRef();
  const { gl, viewport } = useThree();
  const { scene } = useGLTF("/3d/Quidditch.glb"); // ✅ Ensure path matches your renamed file

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  // Mouse Events
  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);
    lastX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / viewport.width;
      pitchRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  // Keyboard Support
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);
      pitchRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if (e.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);
      pitchRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  // Attach Events
  useEffect(() => {
    const canvas = gl.domElement;

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, isRotating]);

  // Rotation + Stage Change
  useFrame(() => {
    if (!pitchRef.current) return;

    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;
      if (Math.abs(rotationSpeed.current) < 0.001) rotationSpeed.current = 0;
      pitchRef.current.rotation.y += rotationSpeed.current;
    } else {
      const rotation = pitchRef.current.rotation.y;
      const normalized = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      switch (true) {
        case normalized >= 5.45 && normalized <= 5.85:
          setCurrentStage(4);
          break;
        case normalized >= 0.85 && normalized <= 1.3:
          setCurrentStage(3);
          break;
        case normalized >= 2.4 && normalized <= 2.6:
          setCurrentStage(2);
          break;
        case normalized >= 4.25 && normalized <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  return (
    <a.group ref={pitchRef} {...props}>
      <primitive object={scene} dispose={null} />
    </a.group>
  );
}

// ✅ Preload model for performance
useGLTF.preload("/3d/Quidditch.glb");

// ✅ Fix for export error
export default QuidditchPitch;
