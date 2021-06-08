<template>
  <div id="app">

   <nav class="main-nav">
     <Burger></Burger>
   </nav>

   <Sidebar>
    <ul class="sidebar-panel-nav" @click="$store.commit('toggleNav');">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
      <router-link to="/platform">Platform</router-link>
      </li>
      <li>
      <router-link to="/materials">Materials</router-link>
      </li>
      <li>
      <router-link to="/haunted-house">Haunted House</router-link>
      </li>
      <li>
        <router-link to="/terrain">Terrain</router-link>
      </li>
      <li>
        <router-link to="/airplane">Airplane</router-link>
      </li>
      <li>
        <router-link to="/earth">Earth</router-link>
      </li>
    </ul>
   </Sidebar>

    <router-view/>
  </div>
</template>

<script>
import Burger from './components/Burger.vue';
import Sidebar from './components/Sidebar.vue';

export default {
  name: 'app',
  components: {
    Burger,
    Sidebar,
  },
};
</script>

<style>

 .main-nav {
   display: flex;
   justify-content: space-between;
   padding: 0.5rem 0.8rem;
   position: absolute;
   right: 0;
 }

 ul.sidebar-panel-nav {
   list-style-type: none;
 }

 ul.sidebar-panel-nav > li > a {
   color: #fff;
   text-decoration: none;
   font-size: 1.5rem;
   display: block;
   padding-bottom: 0.5em;
 }
</style>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

</style>
