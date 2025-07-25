export type RealPlanetData = {
  orbitRadiusAU: number;
  sizeEarthRadii: number;
  eccentricity: number | null;
};

export const realPlanetData: Record<string, RealPlanetData> = {
  Mercury: { orbitRadiusAU: 0.39, sizeEarthRadii: 0.38, eccentricity: 0.206 },
  Venus:   { orbitRadiusAU: 0.72, sizeEarthRadii: 0.95, eccentricity: 0.007 },
  Earth:   { orbitRadiusAU: 1.0,  sizeEarthRadii: 1.0,  eccentricity: 0.017 },
  Mars:    { orbitRadiusAU: 1.52, sizeEarthRadii: 0.53, eccentricity: 0.093 },
  Jupiter: { orbitRadiusAU: 5.2,  sizeEarthRadii: 11.2, eccentricity: 0.049 },
  Saturn:  { orbitRadiusAU: 9.58, sizeEarthRadii: 9.45, eccentricity: 0.056 },
  Uranus:  { orbitRadiusAU: 19.2, sizeEarthRadii: 4.0,  eccentricity: 0.046 },
  Neptune: { orbitRadiusAU: 30.1, sizeEarthRadii: 3.88, eccentricity: 0.010 },
  Sun:     { orbitRadiusAU: 0,    sizeEarthRadii: 109, eccentricity: null },
};