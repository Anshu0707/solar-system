import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const Sun = () => {
  const sunTexture = useLoader(TextureLoader, "/textures/sun.jpg");

  return (
    <>
      {/* ☀️ Bright textured sun with emissive glow */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={sunTexture}
          emissive={"#ff6600"} // Deep orange glow
          emissiveMap={sunTexture}
          emissiveIntensity={2} // Strong visible glow, not whitewashed
        />
      </mesh>

      {/* 💡 Strong point light to simulate sun illumination */}
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
