/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-explicit-any */
import perlin from '@/Utils/perlin';

export default class PerlinNoise {
  noise2D(x: number, y: number): any {
    return perlin(x, y) * 2.0 - 1.0;
  }
}
