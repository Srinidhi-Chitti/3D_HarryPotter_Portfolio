import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";

import { HomeInfo, Loader } from "../components";
import { soundoff, soundon } from "../assets/icons";
import { Snitch, QuidditchPitch, Sky, HarryFlying } from "../models";

const SceneContents = ({ isRotating, setIsRotating, setCurrentStage }) => {
  const snitchRef = useRef();
  const harryRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (snitchRef.current) {
      snitchRef.current.position.x = Math.sin(time * 3) * 5;
      snitchRef.current.position.y = Math.cos(time * 2) + 3;
      snitchRef.current.position.z = Math.cos(time * 3) * 5 - 10;
      snitchRef.current.rotation.y += delta * 2;
    }

    if (harryRef.current) {
      harryRef.current.position.x = Math.sin(time * 0.5) * 4;
      harryRef.current.position.y = Math.sin(time * 1.5) * 0.5 + 1;
      harryRef.current.position.z = Math.cos(time * 0.5) * 4 - 7;
      harryRef.current.rotation.z = Math.sin(time * 1.5) * 0.1;
    }
  });

  const adjustSnitchForScreenSize = () => {
    return window.innerWidth < 768
      ? { scale: [0.5, 0.5, 0.5], position: [2, 1, -3] }
      : { scale: [0.8, 0.8, 0.8], position: [3, 1.5, -4] };
  };

  const adjustPitchForScreenSize = () => {
    return window.innerWidth < 768
      ? { scale: [5, 5, 5], position: [0, -3, -20] }
      : { scale: [30, 30, 30], position: [0, -3, -25] };
  };

  const adjustHarryForScreenSize = () => {
    return window.innerWidth < 768
      ? { scale: [2, 2, 2], position: [0, 0, -5] }
      : { scale: [3, 3, 3], position: [0, 0.5, -7] };
  };

  const snitch = adjustSnitchForScreenSize();
  const pitch = adjustPitchForScreenSize();
  const harry = adjustHarryForScreenSize();

  return (
    <>
      <directionalLight position={[1, 1, 1]} intensity={2} />
      <ambientLight intensity={1} />
      <pointLight position={[10, 5, 10]} intensity={2} />
      <spotLight position={[0, 50, 10]} angle={0.15} penumbra={1} intensity={2} />
      <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />

      <OrbitControls enableZoom={true} enablePan={false} />

      <Sky isRotating={isRotating} />
      <QuidditchPitch
        isRotating={isRotating}
        setIsRotating={setIsRotating}
        setCurrentStage={setCurrentStage}
        position={pitch.position}
        rotation={[0.1, 4.7077, 0]}
        scale={pitch.scale}
      />
      <group ref={snitchRef}>
        <Snitch
          isRotating={isRotating}
          position={snitch.position}
          rotation={[0, 20.1, 0]}
          scale={snitch.scale}
        />
      </group>
      <group ref={harryRef}>
        <HarryFlying
          isRotating={isRotating}
          setIsRotating={setIsRotating}
          position={harry.position}
          scale={harry.scale}
          rotation={[0, 0, 0]}
        />
      </group>
    </>
  );
};

const Home = () => {
  const audioRef = useRef(null);

  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    if (isPlayingMusic && !audioRef.current) {
      const audio = new Audio("/HPsound.mp3"); // ✅ Use public path
      audio.volume = 0.4;
      audio.loop = true;

      audio
        .play()
        .then(() => {
          audioRef.current = audio;
        })
        .catch((err) => console.warn("Playback failed:", err));
    } else if (!isPlayingMusic && audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }, [isPlayingMusic]);

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ position: [0, 2, 15], fov: 50, near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <SceneContents
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-2 left-2">
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt="sound"
          onClick={() => setIsPlayingMusic((prev) => !prev)}
          className="w-10 h-10 cursor-pointer object-contain"
        />
      </div>
    </section>
  );
};

export default Home;
