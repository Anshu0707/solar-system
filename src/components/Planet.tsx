import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, Mesh, Group } from "three";
import type { PlanetConfig } from "../utils/planetConfig";

const Planet = ({
  size,
  orbitRadius,
  orbitSpeed,
  textureUrl,
  emissive,
  initialAngle = 0,
  eccentricity = 0, // Default: circular orbit
}: PlanetConfig) => {
  const groupRef = useRef<Group>(null!);
  const meshRef = useRef<Mesh>(null!);

  const texture = useLoader(
    TextureLoader,
    textureUrl || "/textures/default_planet.jpg"
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const angle = initialAngle + t * orbitSpeed;

    const a = orbitRadius; // semi-major axis
    const e = eccentricity;
    const b = a * Math.sqrt(1 - e ** 2); // semi-minor axis

    const x = Math.cos(angle) * a - a * e; //  Shiftibg center to put sun at focus
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
