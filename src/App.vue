<template>
  <div id="app">

   <nav class="main-nav">
     <Burger></Burger>
   </nav>

   <Sidebar>
    <ul class="sidebar-panel-nav" @click="$store.commit('toggleNav');">
      <li>
        <span>Three</span>
        <ul class="sub-menu">
          <li><router-link to="/airplane">Airplane</router-link></li>
          <li><router-link to="/street">Street</router-link></li>
          <li><router-link to="/earth">Earth</router-link></li>
          <li><router-link to="/planet">Planet</router-link></li>
          <!-- <li><router-link to="/materials">Materials</router-link></li> -->
        </ul>
      </li>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
      <router-link to="/platform">Platform</router-link>
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

<style lang="scss">

 .main-nav {
   display: flex;
   justify-content: space-between;
   padding: 0.5rem 0.8rem;
   position: absolute;
   right: 0;
 }

 ul {
   list-style-type: none;
 }

 ul.sidebar-panel-nav > li > span,
 ul.sidebar-panel-nav > li > a {
   color: #fff;
   text-decoration: none;
   font-size: 1.2rem;
   display: block;
   padding-bottom: 0.5em;
 }
 ul.sub-menu {
   padding-left: 20px;
 }
 ul.sub-menu > li > span,
 ul.sub-menu > li > a {
    color: #fff;
    text-decoration: none;
    font-size: 0.8rem;
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
