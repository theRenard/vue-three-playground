import { AmbientLight, DirectionalLight, PointLight } from 'three';
import * as dat from 'dat.gui';

type Lights = {
  ambientLight: AmbientLight,
  moonLight: DirectionalLight,
  doorLight: PointLight,
}

export default (gui: dat.GUI): Lights => {
  /**
   * Lights
   */
  // Ambient light
  const ambientLight = new AmbientLight('#b9d5ff', 0.12);
  gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);

  // Directional light
  const moonLight = new DirectionalLight('#ffffff', 0.5);
  moonLight.position.set(4, 5, -2);
  gui.add(moonLight, 'intensity').min(0).max(1).step(0.001);
  gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001);
  gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001);
  gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001);
  moonLight.castShadow = true;

  const doorLight = new PointLight('#ff7d46', 1, 7);
  doorLight.position.set(0, 2.2, 2.7);
  doorLight.castShadow = true;

  return {
    ambientLight,
    moonLight,
    doorLight,
  };
};
