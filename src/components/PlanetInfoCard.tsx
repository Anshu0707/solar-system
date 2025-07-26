import type { PlanetConfig } from "../utils/planetConfig";
import { realPlanetData } from "../utils/realPlanetData";

type Props = {
  planet: PlanetConfig;
  onClose: () => void;
};

const PlanetInfoCard = ({ planet, onClose }: Props) => {
  const realData = realPlanetData[planet.name];

  return (
    <div className="absolute top-6 right-6 w-80 p-5 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-green-300 rounded-md border-2 border-cyan-500 shadow-[0_0_20px_rgba(0,255,0,0.3)] z-[60] backdrop-blur-md font-mono">
      <button
        className="absolute top-2 right-2 text-gray-300 hover:text-red-500"
        onClick={onClose}
      >
        ✕
      </button>
      <img
        src={planet.textureUrl}
        alt={planet.name}
        className="w-full h-48 object-cover rounded mb-4 border"
      />
      <h2 className="text-xl text-indigo-500 font-extrabold">{planet.name}</h2>

      {realData ? (
        <>
          <p className="mt-2 text-gray-300">
            <strong className="text-green-500">Distance from Sun:</strong>{" "}
            {realData.orbitRadiusAU.toFixed(2)} AU
          </p>
          <p className="text-gray-300">
            <strong className="text-green-500">Size:</strong>{" "}
            {realData.sizeEarthRadii.toFixed(2)} Earth radii
          </p>
          <p className="text-gray-300">
            <strong className="text-green-500">Eccentricity:</strong>{" "}
            {realData.eccentricity !== null
              ? realData.eccentricity.toFixed(3)
              : "N/A"}
          </p>
        </>
      ) : (
        <p className="mt-2 text-gray-400 italic">
          No real data available for this planet
        </p>
      )}
    </div>
  );
};

export default PlanetInfoCard;
