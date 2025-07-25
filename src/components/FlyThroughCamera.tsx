import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";

type FlyThroughCameraProps = {
  planetPOV: boolean;
  flyAnimationActiveRef: React.MutableRefObject<boolean>;
};

const FlyThroughCamera = ({
  planetPOV,
  flyAnimationActiveRef,
}: FlyThroughCameraProps) => {
  const { camera } = useThree();
  const tRef = useRef(0);

  useEffect(() => {
    // Reset flags on POV exit
    if (!planetPOV) {
      tRef.current = 0;
      flyAnimationActiveRef.current = true;
    } else {
      flyAnimationActiveRef.current = false;
    }
  }, [planetPOV]);

  useFrame(({ clock }) => {
    if (!flyAnimationActiveRef.current || tRef.current >= 1) return;

    const t = clock.getElapsedTime();
    tRef.current = Math.min(tRef.current + 0.02, 1);

    const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
    const smoothT = easeOutCubic(tRef.current);

    camera.position.z = 80 - smoothT * 30;
    camera.position.y = Math.sin(t * 0.3) * 1.5;
    camera.lookAt(0, 0, 0);
  });

  return null;
};
export default FlyThroughCamera;
