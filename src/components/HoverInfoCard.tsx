import { Html } from "@react-three/drei";
import type { PlanetConfig } from "../utils/planetConfig";
import { realPlanetData } from "../utils/realPlanetData"; // make sure this import path is correct

interface HoverCardProps {
  planet: PlanetConfig;
}

const HoverInfoCard = ({ planet }: HoverCardProps) => {
  const realData = realPlanetData[planet.name];

  return (
    <Html position={[0, 1.4, 0]} center className="pointer-events-none">
      <div className="backdrop-blur-lg bg-gradient-to-r from-indigo-600/50 to-purple-700/50 border border-white/20 text-white p-3 rounded-lg shadow-xl transition-all duration-300 w-56">
        <h2 className="text-base font-semibold mb-2 text-center">
          {planet.name}
        </h2>
        {realData ? (
          <ul className="text-sm space-y-1">
            <li>
              <strong>Orbit:</strong> {realData.orbitRadiusAU.toFixed(2)} AU
            </li>
            <li>
              <strong>Size:</strong> {realData.sizeEarthRadii.toFixed(2)} Earth
              radii
            </li>
            <li>
              <strong>Eccentricity:</strong>{" "}
              {realData.eccentricity !== null
                ? realData.eccentricity.toFixed(3)
                : "N/A"}
            </li>
          </ul>
        ) : (
          <p className="text-sm text-center">Real data not available</p>
        )}
      </div>
    </Html>
  );
};

export default HoverInfoCard;
