<template>
  <canvas></canvas>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import HauntedHouseEnv from './Haunted-House';

@Component
export default class HauntedHouse extends Vue {
  mounted(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const threeEnv = new HauntedHouseEnv(this.$el as HTMLCanvasElement);
    console.log(threeEnv);
  }
}
</script>
