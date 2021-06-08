<template>
  <canvas></canvas>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import AirplaneSketch from './Airplane-Sketch';

@Component
export default class Airplane extends Vue {
  sketch: AirplaneSketch;

  mounted(): void {
    this.sketch = new AirplaneSketch();
    this.sketch.init(this.$el as HTMLCanvasElement);
  }

  beforeDestroy(): void {
    this.sketch.destroy();
  }
}
</script>
