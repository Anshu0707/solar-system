import { Vector3 } from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'; 

export const flyToPlanet = (controls: OrbitControlsImpl | null, position: Vector3) => {
  if (!controls) return;

  // Set orbit target
  controls.target.copy(position);

  // Setting camera position with consistent horizontal offset
  const offset = new Vector3(0, 0, 1); // Tweaking this leads to change in viewing angle
  const newPosition = position.clone().add(offset);
  controls.object.position.copy(newPosition);

  // Forcing the camera to look at the target
  controls.object.lookAt(position);

  // Required for orbit controls to update after external changes
  controls.update();
};

export const flyToPlanetPOV = (
  controls: OrbitControlsImpl | null,
  position: Vector3,
  size: number
) => {
  if (!controls) return;

  const surfaceOffset = new Vector3(0, size + 0.5, 0); // Position above surface
  const camPosition = position.clone().add(surfaceOffset);

  controls.target.copy(position.clone());
  controls.object.position.copy(camPosition);
  controls.object.lookAt(position);
  controls.update();
};