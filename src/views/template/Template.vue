<template>
  <canvas></canvas>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import TemplateSketch from './Template-Sketch';

@Component
export default class Template extends Vue {
  sketch = new TemplateSketch();

  mounted(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.sketch.init(this.$el as HTMLCanvasElement);
    this.sketch.showGui();
  }

  // eslint-disable-next-line class-methods-use-this
  update(elapsedTime: number): void {
    console.log(elapsedTime);
  }

  beforeDestroy(): void {
    this.sketch.destroy();
  }
}
</script>
