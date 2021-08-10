import getImageData from '@/Utils/getImageData';
import math from '@/Utils/math';
import { Vector2 } from 'three';
import guiParams from './params';

const params = guiParams.noise;
export default class Heightmap {
  data: ImageData;
  constructor(img: ImageBitmap) {
    this.data = getImageData(img);
  }

  Get(x: number, y: number): number {
    const getPixelAsFloat = (a: number, b: number) => {
      const position = (a + this.data.width * b) * 4;
      const { data } = this.data;
      return data[position] / 255.0;
    };

    // Bilinear filter
    const offset = new Vector2(-250, -250);
    const dimensions = new Vector2(500, 500);

    const xf = 1.0 - math.sat((x - offset.x) / dimensions.x);
    const yf = math.sat((y - offset.y) / dimensions.y);
    const w = this.data.width - 1;
    const h = this.data.height - 1;

    const x1 = Math.floor(xf * w);
    const y1 = Math.floor(yf * h);
    const x2 = math.clamp(x1 + 1, 0, w);
    const y2 = math.clamp(y1 + 1, 0, h);

    const xp = xf * w - x1;
    const yp = yf * h - y1;

    const p11 = getPixelAsFloat(x1, y1);
    const p21 = getPixelAsFloat(x2, y1);
    const p12 = getPixelAsFloat(x1, y2);
    const p22 = getPixelAsFloat(x2, y2);

    const px1 = math.lerp(xp, p11, p21);
    const px2 = math.lerp(xp, p12, p22);

    return math.lerp(yp, px1, px2) * params.height;
  }
}
