import SimplexNoise from '@/Utils/SimplexNoise';
import PerlinNoise from '@/Utils/PerlinNoise';
import guiParams from './params';

const params = guiParams.noise;

export default class NoiseGenerator {
  noise = {
    simplex: new SimplexNoise(params.seed),
    perlin: new PerlinNoise(),
  };
  Get(x: number, y: number): number {
    const xs = x / params.scale;
    const ys = y / params.scale;
    const noiseFunc = this.noise[params.noiseType as 'simplex' | 'perlin'];
    let amplitude = 1.0;
    let frequency = 1.0;
    let normalization = 0;
    let total = 0;
    for (let o = 0; o < params.octaves; o += 1) {
      const noiseValue = noiseFunc.noise2D(
        xs * frequency, ys * frequency,
      ) * 0.5 + 0.5;
      total += noiseValue * amplitude;
      normalization += amplitude;
      amplitude *= params.persistence;
      frequency *= params.lacunarity;
    }
    total /= normalization;
    return (total ** params.exponentiation) * params.height;
  }
}
