/* eslint-disable newline-per-chained-call */
import Entity from '@/engines/Three/Three-Entity';
import waterVertexShader from '@/shaders/water/vertex.glsl';
import waterFragmentShader from '@/shaders/water/fragment.glsl';
import {
  PlaneGeometry, ShaderMaterial, Vector2, Color, Mesh,
} from 'three';

export default class Airplane extends Entity {
  sea: Mesh;
  waterGeometry: PlaneGeometry;
  waterMaterial: ShaderMaterial;
  debugObject = {
    depthColor: '#186691',
    surfaceColor: '#9bd8ff',
  };

  init(): void {

    this.waterGeometry = new PlaneGeometry(4, 4, 128, 128);

    // Material
    this.waterMaterial = new ShaderMaterial({
      vertexShader: waterVertexShader,
      fragmentShader: waterFragmentShader,
      uniforms: {
        uTime: { value: 0 },

        uBigWavesElevation: { value: 0.2 },
        uBigWavesFrequency: { value: new Vector2(4, 1.5) },
        uBigWavesSpeed: { value: 0.75 },

        uSmallWavesElevation: { value: 0.15 },
        uSmallWavesFrequency: { value: 3 },
        uSmallWavesSpeed: { value: 0.2 },
        uSmallIterations: { value: 4 },

        uDepthColor: { value: new Color(this.debugObject.depthColor) },
        uSurfaceColor: { value: new Color(this.debugObject.surfaceColor) },
        uColorOffset: { value: 0.08 },
        uColorMultiplier: { value: 5 },

        uNormalMap: { value: null },
      },
    });

    this.sea = new Mesh(this.waterGeometry, this.waterMaterial);
    this.sea.position.y = -0.5;
    this.sea.rotation.x = -Math.PI * 0.5;
    this.getSketch().getScene().add(this.sea);
    this.waterMaterial.uniforms.uNormalMap.value = this.getSketch().getLoaders().textureLoader.load('./textures/moving_sea/wavemap.png');

    this.getSketch().getGui().add(this.waterMaterial.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001).name('uBigWavesElevation');
    this.getSketch().getGui().add(this.waterMaterial.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequencyX');
    this.getSketch().getGui().add(this.waterMaterial.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequencyY');
    this.getSketch().getGui().add(this.waterMaterial.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.001).name('uBigWavesSpeed');
    this.getSketch().getGui().add(this.waterMaterial.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation');
    this.getSketch().getGui().add(this.waterMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency');
    this.getSketch().getGui().add(this.waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed');
    this.getSketch().getGui().add(this.waterMaterial.uniforms.uSmallIterations, 'value').min(0).max(5).step(1).name('uSmallIterations');
    this.getSketch().getGui().add(this.waterMaterial.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name('uColorOffset');
    this.getSketch().getGui().add(this.waterMaterial.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier');
    this.getSketch().getGui().addColor(this.debugObject, 'depthColor').onChange(() => { this.waterMaterial.uniforms.uDepthColor.value.set(this.debugObject.depthColor); });
    this.getSketch().getGui().addColor(this.debugObject, 'surfaceColor').onChange(() => { this.waterMaterial.uniforms.uSurfaceColor.value.set(this.debugObject.surfaceColor); });
    console.log('add sea');

  }
  update(elapsedTime: number): void {
    const { uniforms } = this.sea.material as ShaderMaterial;
    uniforms.uTime.value = elapsedTime;
  }

  destroy(): void {
    this.getSketch().getScene().remove(this.sea);
    this.waterGeometry.dispose();
    this.waterMaterial.dispose();
    console.log('removed sea');

  }
}
