import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, Mesh, Group } from "three";
import type { PlanetConfig } from "../utils/planetConfig";
import { useOrbitSpeedStore } from "../store/globalState";

const Planet = ({
  size,
  orbitRadius,
  orbitSpeed,
  textureUrl,
  emissive,
  initialAngle = 0,
  eccentricity = 0,
}: PlanetConfig) => {
  const groupRef = useRef<Group>(null!);
  const meshRef = useRef<Mesh>(null!);
  const texture = useLoader(
    TextureLoader,
    textureUrl || "/textures/default_planet.jpg"
  );

  const baseSpeed = useOrbitSpeedStore((state) => state.baseSpeed); // Getting the global speed

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const dynamicOrbitSpeed = orbitSpeed * (baseSpeed / 0.8); //Dynamically adjusting  (0.8 is default BASE_SPEED)

    const angle = initialAngle + t * dynamicOrbitSpeed;

    const a = orbitRadius;
    const e = eccentricity;
    const b = a * Math.sqrt(1 - e ** 2);

    const x = Math.cos(angle) * a - a * e;
    const z = Math.sin(angle) * b;

    groupRef.current.position.set(x, 0, z);
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          emissive={emissive || "#ffffff"}
          emissiveMap={texture}
          emissiveIntensity={0.8}
          roughness={0.5}
        />
      </mesh>
    </group>
  );
};

export default Planet;
