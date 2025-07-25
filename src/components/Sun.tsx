import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const Sun = () => {
  const sunTexture = useLoader(TextureLoader, "/textures/sun.jpg");

  return (
    <>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={sunTexture}
          emissive={"#ff6600"}
          emissiveMap={sunTexture}
          emissiveIntensity={2} // This controls the glow intensity
        />
      </mesh>

      {/* Bright point light source */}
      <pointLight
        color={"#ffaa00"}
        intensity={6}
        distance={100}
        decay={2}
        position={[0, 0, 0]}
      />
    </>
  );
};

export default Sun;
