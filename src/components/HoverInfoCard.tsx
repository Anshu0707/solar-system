import type { PlanetConfig } from "../utils/planetConfig";
import { Html } from "@react-three/drei";

interface HoverCardProps {
  planet: PlanetConfig;
}

const HoverInfoCard = ({ planet }: HoverCardProps) => (
  <Html position={[0, 1.4, 0]} center className="pointer-events-none">
    <div className="backdrop-blur-lg bg-gradient-to-r from-indigo-600/50 to-purple-700/50 border border-white/20 text-white p-3 rounded-lg shadow-xl transition-all duration-300 w-56">
      <h2 className="text-base font-semibold mb-2 text-center">
        {planet.name}
      </h2>
      <ul className="text-sm space-y-1">
        <li>
          <strong>Orbit:</strong> {planet.orbitRadius.toFixed(2)} AU
        </li>
        <li>
          <strong>Size:</strong> {planet.size} Earth radii
        </li>
        <li>
          <strong>Eccentricity:</strong> {planet.eccentricity?.toFixed(2)}
        </li>
      </ul>
    </div>
  </Html>
);

export default HoverInfoCard;
