<template>
  <div id="phaser"></div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import PlatformSketch from './Platform-Sketch';

@Component
export default class Template extends Vue {
  sketch = new PlatformSketch();

  mounted(): void {
    this.sketch.init();
  }

  beforeDestroy(): void {
    this.sketch.destroy();
  }
}
</script>
