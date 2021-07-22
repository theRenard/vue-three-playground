<template>
  <canvas></canvas>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import PlanetSketch from './Planet-Sketch';

@Component
export default class Planet extends Vue {
  sketch: PlanetSketch;

  mounted(): void {
    this.sketch = new PlanetSketch();
    this.sketch.init(this.$el as HTMLCanvasElement);
  }

  beforeDestroy(): void {
    this.sketch.destroy();
  }
}
</script>
