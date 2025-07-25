// src/components/CustomBackground.tsx
import { useThree, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useEffect } from "react";

const CustomBackground = () => {
  const { scene } = useThree();
  const texture = useLoader(TextureLoader, "/textures/stars.jpg");

  useEffect(() => {
    scene.background = texture;
  }, [scene, texture]);

  return null;
};

export default CustomBackground;
