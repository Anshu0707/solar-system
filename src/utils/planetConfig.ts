export const BASE_RADIUS = 12;
export const BASE_SPEED = 0.8;

export type PlanetConfig = {
  name: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  textureUrl?: string;
  emissive?: string;
  ringColor?: string;
  eccentricity?: number; 
  initialAngle?: number; 
  onClick?: () => void; 
};

export const planets: PlanetConfig[] = [
  {
    name: "Mercury",
    size: 0.25,
    orbitRadius: BASE_RADIUS * 0.39,
    orbitSpeed: BASE_SPEED * (1 / 0.24),
    textureUrl: "/textures/mercury.jpg",
    emissive: "#222222",
    ringColor: "#888888",
    eccentricity: 0.4, 
  },
  {
    name: "Venus",
    size: 0.35,
    orbitRadius: BASE_RADIUS * 0.70,
    orbitSpeed: BASE_SPEED * (1 / 0.615),
    textureUrl: "/textures/venus.jpg",
    emissive: "#cccc99",
    ringColor: "#cc9966",
    eccentricity: 0.1, 
  },
  {
    name: "Earth",
    size: 0.4,
    orbitRadius: BASE_RADIUS * 1,
    orbitSpeed: BASE_SPEED * 1,
    textureUrl: "/textures/earth.jpg",
    emissive: "#cccc99",
    ringColor: "#4a90e2",
    eccentricity: 0.15, 
  },
  {
    name: "Mars",
    size: 0.35,
    orbitRadius: BASE_RADIUS * 1.52,
    orbitSpeed: BASE_SPEED * (1 / 1.88),
    textureUrl: "/textures/mars.jpg",
    emissive: "#884422",
    ringColor: "#b24c36",
    eccentricity: 0.25,
  },
  {
    name: "Jupiter",
    size: 1,
    orbitRadius: BASE_RADIUS * 2.9,
    orbitSpeed: BASE_SPEED * (1 / 11.86),
    textureUrl: "/textures/jupiter.jpg",
    emissive: "#bb9966",
    ringColor: "#d9b38c",
    eccentricity: 0.18,
  },
  {
    name: "Saturn",
    size: 0.9,
    orbitRadius: BASE_RADIUS * 4.5,
    orbitSpeed: BASE_SPEED * (1 / 29.46),
    textureUrl: "/textures/saturn.jpg",
    emissive: "#ccaa77",
    ringColor: "#e0cda9",
    eccentricity: 0.22,
  },
  {
    name: "Uranus",
    size: 0.88,
    orbitRadius: BASE_RADIUS * 7.0,
    orbitSpeed: BASE_SPEED * (1 / 84.01),
    textureUrl: "/textures/uranus.jpg",
    emissive: "#66ccff",
    ringColor: "#7fdbff",
    eccentricity: 0.2,
  },
  {
    name: "Neptune",
    size: 0.88,
    orbitRadius: BASE_RADIUS * 9.0,
    orbitSpeed: BASE_SPEED * (1 / 164.8),
    textureUrl: "/textures/neptune.jpg",
    emissive: "#3366cc",
    ringColor: "#2e3bff",
    eccentricity: 0.12,
  },
];
