<template>
  <canvas></canvas>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import TemplateSketch from './Template-Sketch';

@Component
export default class Template extends Vue {
  sketch: TemplateSketch;

  mounted(): void {
    this.sketch = new TemplateSketch();
    this.sketch.init(this.$el as HTMLCanvasElement);
  }

  beforeDestroy(): void {
    this.sketch.destroy();
  }
}
</script>
