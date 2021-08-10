/* eslint-disable object-curly-newline */
import { BufferAttribute, Color, FrontSide, Group, Mesh, MeshStandardMaterial, PlaneGeometry, Vector3 } from 'three';
import math from '@/Utils/math';
import HeightGenerator from './HeightGenerator';

type TerrainChunkParameters = {
  group: Group;
  offset: Vector3;
  scale: number;
  width: number,
  heightGenerators: [HeightGenerator];
}

export default class TerrainChunk {
  group: Group;
  offset: Vector3;
  scale: number;
  width: number;
  heightGenerators: [HeightGenerator];
  plane: Mesh<PlaneGeometry, MeshStandardMaterial>;
  constructor({
    group, offset, scale, width, heightGenerators,
  }: TerrainChunkParameters) {
    this.group = group;
    this.offset = offset;
    this.scale = scale;
    this.width = width;
    this.heightGenerators = heightGenerators;
    this.init();
  }

  init(): void {
    const size = new Vector3(this.width * this.scale, 0, this.width * this.scale);
    this.plane = new Mesh(
      new PlaneGeometry(size.x, size.z, 128, 128),
      new MeshStandardMaterial({
        wireframe: false,
        color: 0x0000ff,
        side: FrontSide,
        // vertexColors: VertexColors,
      }),
    );
    this.plane.position.add(this.offset);
    this.plane.castShadow = false;
    this.plane.receiveShadow = true;
    this.group.add(this.plane);

    this.rebuild();
  }

  rebuild(): void {
    const { offset } = this;
    console.log('rebuild terrain chunks');
    const vertices = this.plane.geometry.getAttribute('position');
    const newVertices = new Float32Array(vertices.count * 3);
    for (let i = 0; i < vertices.count; i += 1) {
      const i3 = i * 3;
      const x = vertices.array[i3 + 0];
      const y = vertices.array[i3 + 1];
      let z = 0;

      const heightPairs = [];
      let normalization = 0;
      // eslint-disable-next-line no-restricted-syntax
      for (const gen of this.heightGenerators) {
        heightPairs.push(gen.Get(x + offset.x, y + offset.y));
        normalization += heightPairs[heightPairs.length - 1][1];
      }

      if (normalization > 0) {
        // eslint-disable-next-line no-restricted-syntax
        for (const h of heightPairs) {
          z += (h[0] * h[1]) / normalization;
        }
      }

      newVertices[i3 + 0] = x;
      newVertices[i3 + 1] = y;
      newVertices[i3 + 2] = z;

    }

    const newPosition = new BufferAttribute(newVertices, 3);
    this.plane.geometry.setAttribute('position', newPosition);

    // DEMO
    if (this.heightGenerators.length > 1 && offset.x === 0 && offset.y === 0) {
    //   const gen = this.heightGenerators[0];
    //   const maxHeight = 16.0;
    //   const GREEN = new Color(0x46b00c);

      //   const faces = this.plane.geometry.faces;
      //   // eslint-disable-next-line no-restricted-syntax
      //   for (const f of faces) {
      //     const vs = [
      //       this.plane.geometry.vertices[f.a],
      //       this.plane.geometry.vertices[f.b],
      //       this.plane.geometry.vertices[f.c],
      //     ];

      //     const vertexColours = [];
      //     // eslint-disable-next-line no-restricted-syntax
      //     for (const v of vs) {
      //       const [h] = gen.Get(v.x + offset.x, v.y + offset.y);
      //       const a = math.sat(h / maxHeight);
      //       const vc = new Color(0xFFFFFF);
      //       vc.lerp(GREEN, a);

      //       vertexColours.push(vc);
      //     }
      //     f.vertexColors = vertexColours;
      //   }
      //   this.plane.geometry.elementsNeedUpdate = true;
      // } else {
      //   // eslint-disable-next-line no-restricted-syntax
      //   for (const f of this.plane.geometry.faces) {
      //     f.vertexColors = [
      //       new Color(0xFFFFFF),
      //       new Color(0xFFFFFF),
      //       new Color(0xFFFFFF),
      //     ];
      //   }

    }
    // this.plane.geometry.verticesNeedUpdate = true;
    this.plane.geometry.computeVertexNormals();
  }
}
