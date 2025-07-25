import { useMemo } from "react";
import { Line } from "@react-three/drei";
import { Color } from "three";

type OrbitRingProps = {
  radius: number;
  color?: string;
  eccentricity?: number;
  onClick?: () => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
};

const OrbitRing = ({
  radius,
  color = "#888888",
  eccentricity = 0.2,
  onClick,
  onPointerOver,
  onPointerOut,
}: OrbitRingProps) => {
  const points = useMemo(() => {
    const pts = [];
    const a = radius;
    const e = eccentricity;
    const b = a * Math.sqrt(1 - e ** 2);
    const segments = 128;

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * 2 * Math.PI;
      const x = Math.cos(angle) * a - a * e;
      const z = Math.sin(angle) * b;
      pts.push([x, 0, z] as const);
    }

    return pts;
  }, [radius, eccentricity]);

  return (
    <Line
      points={points}
      color={new Color(color)}
      lineWidth={2.5}
      transparent
      opacity={0.25}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    />
  );
};

export default OrbitRing;
