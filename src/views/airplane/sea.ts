import {
  PlaneGeometry, Mesh, ShaderMaterial,
  Vector2,
  Color,
} from 'three';
import waterVertexShader from '@/shaders/water/vertex.glsl';
import waterFragmentShader from '@/shaders/water/fragment.glsl';

const debugObject = {
  depthColor: '#186691',
  surfaceColor: '#9bd8ff',
};

export default (gui: dat.GUI): THREE.Mesh => {
  const waterGeometry = new PlaneGeometry(2, 2, 512, 512);

  // Material
  const waterMaterial = new ShaderMaterial({
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

      uDepthColor: { value: new Color(debugObject.depthColor) },
      uSurfaceColor: { value: new Color(debugObject.surfaceColor) },
      uColorOffset: { value: 0.08 },
      uColorMultiplier: { value: 5 },
    },
  });

  gui.add(waterMaterial.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001)
    .name('uBigWavesElevation');
  gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001)
    .name('uBigWavesFrequencyX');
  gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001)
    .name('uBigWavesFrequencyY');
  gui.add(waterMaterial.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.001)
    .name('uBigWavesSpeed');

  gui.add(waterMaterial.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001)
    .name('uSmallWavesElevation');
  gui.add(waterMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001)
    .name('uSmallWavesFrequency');
  gui.add(waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001)
    .name('uSmallWavesSpeed');
  gui.add(waterMaterial.uniforms.uSmallIterations, 'value').min(0).max(5).step(1)
    .name('uSmallIterations');

  gui.add(waterMaterial.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001)
    .name('uColorOffset');
  gui.add(waterMaterial.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001)
    .name('uColorMultiplier');

  gui.addColor(debugObject, 'depthColor').onChange(() => { waterMaterial.uniforms.uDepthColor.value.set(debugObject.depthColor); });
  gui.addColor(debugObject, 'surfaceColor').onChange(() => { waterMaterial.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor); });

  const sea = new Mesh(waterGeometry, waterMaterial);
  sea.rotation.x = -Math.PI * 0.5;

  return sea;
};
