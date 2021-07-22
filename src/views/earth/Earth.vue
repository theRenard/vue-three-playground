<template>
  <canvas></canvas>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import EarthSketch from './Earth-Sketch';

@Component
export default class Materials extends Vue {
  sketch: EarthSketch;

  mounted(): void {
    this.sketch = new EarthSketch();
    this.sketch.init(this.$el as HTMLCanvasElement);
  }

  beforeDestroy(): void {
    this.sketch.destroy();
  }
}
</script>
