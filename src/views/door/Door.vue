<template>
  <canvas></canvas>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import Sketch from './Door-Sketch';

@Component
export default class Materials extends Vue {
  sketch: Sketch;

  mounted(): void {
    this.sketch = new Sketch();
    this.sketch.init(this.$el as HTMLCanvasElement);
  }

  beforeDestroy(): void {
    this.sketch.destroy();
  }
}
</script>
