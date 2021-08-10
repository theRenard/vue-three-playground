/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import Entity from '@/engines/Three/Three-Entity';
import { Vector3 } from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky';
import guiParams from '../Terrain/params';

export default class TerrainSky extends Entity {
  name: 'Sky';
  sky = new Sky();
  init(): void {
    this.sky.scale.setScalar(10000);
    this.getSketch().getScene().add(this.sky);

    const onShaderChange = () => {
      for (const k in guiParams.sky) {
        const a = k as keyof typeof guiParams.sky;
        if (this.sky.material.uniforms[k]?.value) {
          this.sky.material.uniforms[k].value = guiParams.sky[a];
        }
      }
    };

    const onSunChange = () => {
      const theta = Math.PI * (guiParams.sun.inclination - 0.5);
      const phi = 2 * Math.PI * (guiParams.sun.azimuth - 0.5);

      const sunPosition = new Vector3();
      sunPosition.x = Math.cos(phi);
      sunPosition.y = Math.sin(phi) * Math.sin(theta);
      sunPosition.z = Math.sin(phi) * Math.cos(theta);

      this.sky.material.uniforms.sunPosition.value.copy(sunPosition);
    };

    const skyRollup = this.getSketch().getGui().addFolder('Sky');
    skyRollup.add(guiParams.sky, 'turbidity', 0.1, 30.0).onChange(
      onShaderChange,
    );
    skyRollup.add(guiParams.sky, 'rayleigh', 0.1, 4.0).onChange(
      onShaderChange,
    );
    skyRollup.add(guiParams.sky, 'mieCoefficient', 0.0001, 0.1).onChange(
      onShaderChange,
    );
    skyRollup.add(guiParams.sky, 'mieDirectionalG', 0.0, 1.0).onChange(
      onShaderChange,
    );
    skyRollup.add(guiParams.sky, 'luminance', 0.0, 2.0).onChange(
      onShaderChange,
    );

    const sunRollup = this.getSketch().getGui().addFolder('Sun');
    sunRollup.add(guiParams.sun, 'inclination', 0.0, 1.0).onChange(
      onSunChange,
    );
    sunRollup.add(guiParams.sun, 'azimuth', 0.0, 1.0).onChange(
      onSunChange,
    );

    onShaderChange();
    onSunChange();
  }
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
  update(): void {
  }
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
  destroy(): void {
  }
}
