import { Text } from "@react-three/drei";

const PlanetLabel = ({ name, radius }: { name: string; radius: number }) => (
  <Text position={[radius, 0.6, 0]} fontSize={0.4} color="white">
    {name}
  </Text>
);

export default PlanetLabel;
