import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '@/store';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  store.commit('toggleNav');
  next();
});

export default router;
