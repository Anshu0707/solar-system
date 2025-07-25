import React from "react";
import type { PlanetConfig } from "../utils/planetConfig";

type Props = {
  planet: PlanetConfig;
  onClose: () => void;
};

const PlanetInfoCard = ({ planet, onClose }: Props) => {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white p-6 rounded-lg shadow-lg z-50 border border-gray-700 w-96">
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
      <h2 className="text-xl font-semibold">{planet.name}</h2>
      <p className="mt-2">
        <strong>Distance from Sun:</strong> {planet.orbitRadius.toFixed(2)} AU
      </p>
      <p>
        <strong>Size:</strong> {planet.size} Earth radii
      </p>
      <p>
        <strong>Eccentricity:</strong> {planet.eccentricity ?? 0}
      </p>
    </div>
  );
};

export default PlanetInfoCard;
