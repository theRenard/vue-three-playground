export default {
  noise: {
    octaves: 10,
    persistence: 0.5,
    lacunarity: 2.0,
    exponentiation: 3.9,
    height: 64,
    scale: 256.0,
    noiseType: 'simplex',
    seed: 1,
  },
  heightmap: {
    height: 16,
  },
  terrain: {
    wireframe: false,
  },
  sky: {
    turbidity: 10.0,
    rayleigh: 2,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.8,
    luminance: 1,
  },
  sun: {
    inclination: 0.31,
    azimuth: 0.25,
  },
};
