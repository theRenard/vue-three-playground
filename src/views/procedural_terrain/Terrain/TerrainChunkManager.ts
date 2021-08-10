import Entity from '@/engines/Three/Three-Entity';
import { Group, Vector2, Vector3 } from 'three';
import NoiseGenerator from './NoiseGenerator';
import HeightGenerator from './HeightGenerator';
import guiParams from './params';
import Heightmap from './HeightMap';
import TerrainChunk from './TerrainChunk';

export default class TerrainChunkManager extends Entity {
  name: 'TerrainChunkManager';
  private chunkSize = 500;
  group: Group;
  noise: NoiseGenerator;
  terrainChunks: {[key: string]: {
    chunk: TerrainChunk,
    edges: string[],
  }};
  init(): void {
    this.initNoise();
    this.initTerrain();
  }

  initNoise(): void {

    const onNoiseChanged = () => {
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const k in this.terrainChunks) {
        this.terrainChunks[k].chunk.rebuild();
      }
    };

    const noiseRollup = this.getSketch().getGui().addFolder('Terrain.Noise');
    noiseRollup.add(guiParams.noise, 'noiseType', ['simplex', 'perlin']).onChange(onNoiseChanged);
    noiseRollup.add(guiParams.noise, 'scale', 64.0, 1024.0).onChange(onNoiseChanged);
    noiseRollup.add(guiParams.noise, 'octaves', 1, 20, 1).onChange(onNoiseChanged);
    noiseRollup.add(guiParams.noise, 'persistence', 0.01, 1.0).onChange(onNoiseChanged);
    noiseRollup.add(guiParams.noise, 'lacunarity', 0.01, 4.0).onChange(onNoiseChanged);
    noiseRollup.add(guiParams.noise, 'exponentiation', 0.1, 10.0).onChange(onNoiseChanged);
    noiseRollup.add(guiParams.noise, 'height', 0, 256).onChange(onNoiseChanged);

    this.noise = new NoiseGenerator();

    const heightmapRollup = this.getSketch().getGui().addFolder('Terrain.Heightmap');
    heightmapRollup.add(guiParams.heightmap, 'height', 0, 128).onChange(onNoiseChanged);
  }

  initTerrain(): void {

    this.group = new Group();
    this.group.rotation.x = -Math.PI / 2;
    this.getSketch().getScene().add(this.group);

    const terrainRollup = this.getSketch().getGui().addFolder('Terrain');
    terrainRollup.add(guiParams.terrain, 'wireframe').onChange(() => {
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const k in this.terrainChunks) {
        this.terrainChunks[k].chunk.plane.material.wireframe = guiParams.terrain.wireframe;
      }
    });

    this.terrainChunks = {};

    // DEMO
    // this.addChunk(0, 0);

    for (let x = -1; x <= 1; x += 1) {
      for (let z = -1; z <= 1; z += 1) {
        this.addChunk(x, z);
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  key(x: number, z: number): string {
    return `${x}.${z}`;
  }

  private addChunk(x: number, z: number): void {
    const offset = new Vector2(x * this.chunkSize, z * this.chunkSize);
    const chunk = new TerrainChunk({
      group: this.group,
      offset: new Vector3(offset.x, offset.y, 0),
      scale: 1,
      width: this.chunkSize,
      heightGenerators: [new HeightGenerator(this.noise, offset, 100000, 100000 + 1)],
    });

    const k = this.key(x, z);
    const edges = [];
    for (let xi = -1; xi <= 1; xi += 1) {
      for (let zi = -1; zi <= 1; zi += 1) {
        if (xi === 0 || zi === 0) {
          // eslint-disable-next-line no-continue
          continue;
        }
        edges.push(this.key(x + xi, z + zi));
      }
    }

    this.terrainChunks[k] = {
      chunk,
      edges,
    };
  }

  setHeightMap(img: ImageBitmap): void {
    const heightmap = new HeightGenerator(new Heightmap(img), new Vector2(0, 0), 250, 300);

    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const k in this.terrainChunks) {
      this.terrainChunks[k].chunk.heightGenerators.unshift(heightmap);
      this.terrainChunks[k].chunk.rebuild();
    }
  }
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
  update() {
  }
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
  destroy() {
  }
}
