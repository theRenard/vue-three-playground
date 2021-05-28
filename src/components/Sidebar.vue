<template>
    <div class="sidebar">
        <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div>
        <transition name="slide">
            <div v-if="isPanelOpen"
                 class="sidebar-panel">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>

export default {
  methods: {
    closeSidebarPanel() {
      this.$store.commit('toggleNav');
    },
  },
  computed: {
    isPanelOpen() {
      return this.$store.state.isNavOpen;
    },
  },
};
</script>

<style>
    .slide-enter-active,
    .slide-leave-active
    {
        transition: transform 0.2s ease;
    }

    .slide-enter,
    .slide-leave-to {
        transform: translateX(-100%);
        transition: all 150ms ease-in 0s
    }

    .sidebar-backdrop {
        background-color: rgba(0,0,0,.5);
        top: 0;
        left: 0;
        cursor: pointer;
        bottom: 0;
        right: 0;
        cursor: pointer;
        position: absolute;
    }

    .sidebar-panel {
        overflow-y: hidden;
        background-color: #130f40;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        z-index: 999;
        padding: 3rem 20px 2rem 20px;
        width: 300px;
    }
</style>
