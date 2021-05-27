<template>
  <canvas></canvas>
</template>

<script lang="ts">
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Vue, Component } from 'vue-property-decorator';
import HauntedHouseEnv from './Haunted-House';

@Component
export default class HauntedHouse extends Vue {
  hauntedHouse = new HauntedHouseEnv();

  mounted(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.hauntedHouse.init(this.$el as HTMLCanvasElement);
  }

  beforeDestroy(): void {
    this.hauntedHouse.destroy();
  }
}
</script>
