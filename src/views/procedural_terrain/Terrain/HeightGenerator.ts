import math from '@/Utils/math';
import { Vector2 } from 'three';
import Heightmap from './HeightMap';
import NoiseGenerator from './NoiseGenerator';

export default class HeightGenerator {
  private radius: [number, number];
  private position: Vector2;
  private generator: any;

  constructor(generator: NoiseGenerator | Heightmap, position: Vector2, minRadius: number, maxRadius: number) {
    this.position = position.clone();
    this.radius = [minRadius, maxRadius];
    this.generator = generator;
  }

  Get(x: number, y: number): [number, number] {
    const distance = this.position.distanceTo(new Vector2(x, y));
    let normalization = 1.0 - math.sat(
      (distance - this.radius[0]) / (this.radius[1] - this.radius[0]),
    );
    normalization = normalization * normalization * (3 - 2 * normalization);

    return [this.generator.Get(x, y), normalization];
  }
}
