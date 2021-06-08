<template>
  <canvas></canvas>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import TerrainSketch from './Terrain-Sketch';

@Component
export default class Terrain extends Vue {
  sketch: TerrainSketch;

  mounted(): void {
    this.sketch = new TerrainSketch();
    this.sketch.init(this.$el as HTMLCanvasElement);
  }

  beforeDestroy(): void {
    this.sketch.destroy();
  }
}
</script>
