import Entity from '@/engines/Three/Three-Entity';
import firefliesVertexShader from '@/shaders/fireflies/vertex.glsl';
import firefliesFragmentShader from '@/shaders/fireflies/fragment.glsl';

import {
  BufferGeometry,
  BufferAttribute,
  ShaderMaterial,
  AdditiveBlending,
  Points,
} from 'three';

const firefliesCount = 30;
export default class Fireflies extends Entity {
  firefliesGeometry: BufferGeometry;
  firefliesMaterial: ShaderMaterial;
  init(): void {
    this.firefliesGeometry = new BufferGeometry();
    const positionArray = new Float32Array(firefliesCount * 3);
    const scaleArray = new Float32Array(firefliesCount);
    const POLE_MAX_HEIGHT = 2.8;
    const POLE_MIN_HEIGHT = 1.5;

    for (let i = 0; i < firefliesCount; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const x = -1;
      const z = 0;
      const y = Math.random() * (POLE_MAX_HEIGHT - POLE_MIN_HEIGHT) + POLE_MIN_HEIGHT;
      const radius = (POLE_MAX_HEIGHT - y) + 0.2;
      positionArray[i * 3 + 0] = x + Math.cos(angle) * radius;
      positionArray[i * 3 + 1] = y;
      positionArray[i * 3 + 2] = z + Math.sin(angle) * radius;

      scaleArray[i] = Math.random() * 0.5 + 0.1;
    }

    this.firefliesGeometry.setAttribute('position', new BufferAttribute(positionArray, 3));
    this.firefliesGeometry.setAttribute('aScale', new BufferAttribute(scaleArray, 1));

    // Material
    this.firefliesMaterial = new ShaderMaterial({
      uniforms:
        {
          uTime: { value: 0 },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
          uSize: { value: 20 },
        },
      vertexShader: firefliesVertexShader,
      fragmentShader: firefliesFragmentShader,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
    });

    this.getSketch().getGui().add(this.firefliesMaterial.uniforms.uSize, 'value').min(0)
      .max(500)
      .step(1)
      .name('firefliesSize');

    // Points
    const fireflies = new Points(this.firefliesGeometry, this.firefliesMaterial);
    this.getSketch().getScene().add(fireflies);
  }

  update(elapsedTime: number): void {
    this.firefliesMaterial.uniforms.uTime.value = elapsedTime;
  }

  destroy(): void {
    this.firefliesGeometry.dispose();
    this.firefliesMaterial.dispose();
  }
}
