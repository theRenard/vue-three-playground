import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/platform',
    name: 'Platform',
    component: () => import(/* webpackChunkName: "Platform" */ '../views/platform/Platform.vue'),
  },
  {
    path: '/materials',
    name: 'Materials',
    component: () => import(/* webpackChunkName: "Materials" */ '../views/materials/Materials.vue'),
  },
  {
    path: '/haunted-house',
    name: 'HauntedHouse',
    component: () => import(/* webpackChunkName: "HauntedHouse" */ '../views/haunted-house/Haunted-House.vue'),
  },
  {
    path: '/airplane',
    name: 'Airplane',
    component: () => import(/* webpackChunkName: "Airplane" */ '../views/airplane/Airplane.vue'),
  },
  {
    path: '/terrain',
    name: 'Terrain',
    component: () => import(/* webpackChunkName: "Terrain" */ '../views/terrain/Terrain.vue'),
  },
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
