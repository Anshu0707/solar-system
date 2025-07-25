import { useOrbitSpeedStore } from "../store/globalState";

interface SpeedControlsProps {
  showHyperdrive: () => void;
  hyperdriveTriggered: boolean;
}

const SpeedControls = ({
  showHyperdrive,
  hyperdriveTriggered,
}: SpeedControlsProps) => {
  const { baseSpeed, setBaseSpeed } = useOrbitSpeedStore();

  const handleIncrease = () => {
    const next = baseSpeed + 0.4;
    if (next > 10 && !hyperdriveTriggered) showHyperdrive();
    setBaseSpeed(next);
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black/70 text-white flex items-center gap-3 px-4 py-2 rounded-full shadow-lg backdrop-blur-md border border-white/20">
      <button onClick={() => setBaseSpeed(Math.max(0.4, baseSpeed - 0.4))}>
        −
      </button>
      <span>{baseSpeed.toFixed(1)}x</span>
      <button onClick={handleIncrease}>+</button>
    </div>
  );
};

export default SpeedControls;
