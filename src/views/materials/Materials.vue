<template>
  <canvas></canvas>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import MaterialsSketch from './Materials-Sketch';

@Component
export default class Materials extends Vue {
  sketch = new MaterialsSketch();

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
