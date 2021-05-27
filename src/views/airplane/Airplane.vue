<template>
  <canvas></canvas>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import AirplaneSketch from './Airplane-Sketch';

@Component
export default class Airplane extends Vue {
  sketch = new AirplaneSketch();

  mounted(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.sketch.init(this.$el as HTMLCanvasElement);
    this.sketch.showGui();
  }

  beforeDestroy(): void {
    this.sketch.destroy();
  }
}
</script>
