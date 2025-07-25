import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import Lottie from "lottie-react";
import waveAnimation from "../assets/AudioWave.json";
import Sun from "./Sun";
import Planet from "./Planet";
import OrbitRing from "./OrbitRing";
import { planets } from "../utils/planetConfig";
import CustomBackground from "./CustomBackground";
import PlanetInfoCard from "./PlanetInfoCard";
import type { PlanetConfig } from "../utils/planetConfig";

//  Floating Planet Label
const PlanetLabel = ({ name, radius }: { name: string; radius: number }) => (
  <Text position={[radius, 0.6, 0]} fontSize={0.4} color="white">
    {name}
  </Text>
);

//  Fly-in Camera Animation
const FlyThroughCamera = () => {
  const { camera } = useThree();
  const tRef = useRef(0);
  useFrame(({ clock }) => {
    if (tRef.current >= 1) return;
    const t = clock.getElapsedTime();
    tRef.current = Math.min(tRef.current + 0.02, 1);
    const ease = (x: number) => 1 - Math.pow(1 - x, 3);
    const smoothT = ease(tRef.current);
    camera.position.z = 80 - smoothT * 30;
    camera.position.y = Math.sin(t * 0.3) * 1.5;
    camera.lookAt(0, 0, 0);
  });
  return null;
};

const SolarSystemCanvas = () => {
  const [showOrbits, setShowOrbits] = useState(true);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetConfig | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {}); // In case autoplay is blocked
      lottieRef.current?.play();
    }
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current || !lottieRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      lottieRef.current.pause();
    } else {
      audioRef.current.play();
      lottieRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* Audio Element */}
      <audio ref={audioRef} src="/audio/audio-1.mp3" loop />

      {/* UI Controls */}
      <div className="absolute top-6 left-6 z-50 flex items-center gap-4">
        {/*Toggle Orbit Button */}
        <button
          onClick={() => setShowOrbits((prev) => !prev)}
          className="h-12 px-6 py-2 flex items-center justify-center text-white font-semibold text-sm rounded-full backdrop-blur-md bg-gradient-to-br from-purple-800/60 to-indigo-700/60 border border-white/20 shadow-lg hover:scale-105 hover:brightness-110 hover:shadow-indigo-500 transition-all duration-300"
        >
          {showOrbits ? "Hide Orbits" : "Show Orbits"}
        </button>

        {/* Audio Toggle Button */}
        <button
          onClick={toggleAudio}
          className={`w-12 h-12 flex items-center justify-center rounded-full p-1 bg-gradient-to-tr from-blue-800 to-indigo-700 border border-white/20 shadow-md hover:scale-110 transition duration-300 ${
            isPlaying ? "ring-2 ring-indigo-400" : ""
          }`}
          title={isPlaying ? "Pause Music" : "Play Music"}
        >
          <Lottie
            lottieRef={lottieRef}
            animationData={waveAnimation}
            loop
            autoplay={false}
            style={{ maxWidth: 28, maxHeight: 28 }}
          />
        </button>
      </div>

      {/* Planet Info Card */}
      {selectedPlanet && (
        <PlanetInfoCard
          planet={selectedPlanet}
          onClose={() => setSelectedPlanet(null)}
        />
      )}

      {/* Solar System Canvas*/}
      <Canvas
        style={{ width: "100vw", height: "100vh", display: "block" }}
        camera={{ position: [0, 0, 80], fov: 35 }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#ffae00" />

        <Suspense fallback={null}>
          <CustomBackground />
          <Sun />

          {planets.map((planet) => (
            <group key={planet.name}>
              {showOrbits && (
                <OrbitRing
                  radius={planet.orbitRadius}
                  color={planet.ringColor}
                  eccentricity={planet.eccentricity}
                  onClick={() => setSelectedPlanet(planet)}
                />
              )}
              <Planet {...planet} onClick={() => setSelectedPlanet(planet)} />
              <PlanetLabel name={planet.name} radius={planet.orbitRadius} />
            </group>
          ))}

          <FlyThroughCamera />
        </Suspense>

        <OrbitControls enableZoom enablePan enableRotate />
      </Canvas>
    </>
  );
};

export default SolarSystemCanvas;
