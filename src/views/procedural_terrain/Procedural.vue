<template>
  <canvas></canvas>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import ProceduralSketch from './Procedural-Sketch';

@Component
export default class Materials extends Vue {
  sketch: ProceduralSketch;

  mounted(): void {
    this.sketch = new ProceduralSketch();
    this.sketch.init(this.$el as HTMLCanvasElement);
  }

  beforeDestroy(): void {
    this.sketch.destroy();
  }
}
</script>
