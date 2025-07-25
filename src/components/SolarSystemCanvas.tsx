import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import waveAnimation from "../assets/AudioWave.json";
import Sun from "./Sun";
import Planet from "./Planet";
import OrbitRing from "./OrbitRing";
import CustomBackground from "./CustomBackground";
import HoverInfoCard from "./HoverInfoCard";
import SpeedControls from "./SpeedControls";
import PlanetLabel from "./PlanetLabel";
import FlyThroughCamera from "./FlyThroughCamera";
import { flyToPlanet } from "../utils/cameraUtils";
import { planets, sunConfig } from "../utils/planetConfig";
import type { PlanetConfig } from "../utils/planetConfig";
import { Vector3 } from "three";
import { OrbitControls } from "@react-three/drei";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const SolarSystemCanvas = () => {
  const [showOrbits, setShowOrbits] = useState(true);
  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetConfig | null>(null);
  const [activePlanet, setActivePlanet] = useState<PlanetConfig | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hyperdriveActive, setHyperdriveActive] = useState(false);
  const [hyperdriveTriggered, setHyperdriveTriggered] = useState(false);
  const [hoveredOrbitRing, setHoveredOrbitRing] = useState<PlanetConfig | null>(
    null
  );
  const [planetPOV, setPlanetPOV] = useState(false); // NEW
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
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

  const triggerHyperdriveModal = () => {
    if (hyperdriveTriggered) return;
    setHyperdriveTriggered(true);
    setHyperdriveActive(true);
    setTimeout(() => setHyperdriveActive(false), 6000);
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/audio-1.mp3" loop />
      <SpeedControls
        showHyperdrive={triggerHyperdriveModal}
        hyperdriveTriggered={hyperdriveTriggered}
      />

      {/* Modal: Hyperdrive */}
      {hyperdriveActive && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-br from-pink-500 to-indigo-700 text-white px-6 py-3 rounded-xl shadow-xl border border-white/20 backdrop-blur-md animate-fade-in-out text-center">
          Hyperdrive Engaged! Inner planets are blazing beyond reality!
        </div>
      )}

      {/* 🛠 UI Controls */}
      <div className="absolute top-6 left-6 z-50 flex items-center gap-4">
        <button
          onClick={() => setShowOrbits((prev) => !prev)}
          className="h-12 px-6 py-2 text-white font-semibold text-sm rounded-full backdrop-blur-md bg-gradient-to-br from-purple-800/60 to-indigo-700/60 border border-white/20 shadow-lg hover:scale-105 hover:brightness-110 hover:shadow-indigo-500 transition-all duration-300"
        >
          {showOrbits ? "Hide Orbits" : "Show Orbits"}
        </button>

        {/* Music toggle */}
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
        <button
          onClick={() => setPlanetPOV((prev) => !prev)}
          className="h-12 px-4 text-white rounded-full backdrop-blur bg-gradient-to-br from-indigo-800 to-blue-700 border border-white/20 shadow-md hover:scale-105 transition duration-300"
        >
          {planetPOV ? "Exit POV" : "Enter Planet POV"}
        </button>
      </div>

      {/*Expanded info panel */}
      {activePlanet && (
        <div className="absolute top-6 right-6 w-80 p-6 bg-black/80 text-white rounded-xl shadow-xl border border-indigo-700 z-50 backdrop-blur-sm animate-slide-in-right">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{activePlanet.name}</h2>
            <button
              onClick={() => setActivePlanet(null)}
              className="text-gray-400 hover:text-red-500 transition"
            >
              ✕
            </button>
          </div>
          <p className="text-sm mb-1">
            <strong>Orbit Radius:</strong> {activePlanet.orbitRadius.toFixed(2)}{" "}
            AU
          </p>
          <p className="text-sm mb-1">
            <strong>Size:</strong> {activePlanet.size} Earth radii
          </p>
          <p className="text-sm mb-1">
            <strong>Eccentricity:</strong>{" "}
            {activePlanet.eccentricity?.toFixed(2)}
          </p>
          <div className="mt-4">
            <img
              src={activePlanet.textureUrl ?? "/textures/default_planet.jpg"}
              alt={`Planet ${activePlanet.name}`}
              className="rounded border object-cover w-full h-32"
            />
          </div>
        </div>
      )}

      {/*3D Canvas */}
      <Canvas
        style={{ width: "100vw", height: "100vh", display: "block" }}
        camera={{ position: [0, 0, 80], fov: 35 }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#ffae00" />
        <Suspense fallback={null}>
          <CustomBackground />
          <mesh
            onClick={() => {
              setActivePlanet(sunConfig);
              flyToPlanet(controlsRef.current, new Vector3(0, 0, 0));
            }}
          >
            <Sun />
            {hoveredPlanet?.name === "Sun" && (
              <HoverInfoCard planet={sunConfig} />
            )}
          </mesh>
          {planets.map((planet) => (
            <group key={planet.name}>
              {showOrbits && (
                <OrbitRing
                  radius={planet.orbitRadius}
                  color={planet.ringColor}
                  eccentricity={planet.eccentricity}
                  onClick={() => {
                    setActivePlanet(planet);
                    flyToPlanet(
                      controlsRef.current,
                      new Vector3(planet.orbitRadius, 0, 0)
                    );
                  }}
                  onPointerOver={() => setHoveredOrbitRing(planet)}
                  onPointerOut={() => setHoveredOrbitRing(null)}
                />
              )}
              {hoveredOrbitRing?.name === planet.name && (
                <HoverInfoCard planet={hoveredOrbitRing} />
              )}
              <mesh
                onPointerOver={() => setHoveredPlanet(planet)}
                onPointerOut={() => setHoveredPlanet(null)}
                onClick={() => {
                  setActivePlanet(planet);
                  flyToPlanet(
                    controlsRef.current,
                    new Vector3(planet.orbitRadius, 0, 0)
                  );
                }}
              >
                <Planet {...planet} />
                {hoveredPlanet?.name === planet.name && (
                  <HoverInfoCard planet={planet} />
                )}
              </mesh>
              {showOrbits && (
                <PlanetLabel name={planet.name} radius={planet.orbitRadius} />
              )}
            </group>
          ))}
          <FlyThroughCamera />
        </Suspense>
        <OrbitControls ref={controlsRef} enableZoom enablePan enableRotate />
      </Canvas>
    </>
  );
};

export default SolarSystemCanvas;
