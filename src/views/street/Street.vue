<template>
  <canvas></canvas>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import StreetSketch from './Street-Sketch';

@Component
export default class Street extends Vue {
  sketch: StreetSketch;

  mounted(): void {
    this.sketch = new StreetSketch();
    this.sketch.init(this.$el as HTMLCanvasElement);
  }

  beforeDestroy(): void {
    this.sketch.destroy();
  }
}
</script>
