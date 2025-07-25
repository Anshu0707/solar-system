import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

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

export default FlyThroughCamera;
