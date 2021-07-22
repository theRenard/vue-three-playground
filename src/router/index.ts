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
  // {
  //   path: '/materials',
  //   name: 'Materials',
  //   component: () => import(/* webpackChunkName: "Materials" */ '../views/materials/Materials.vue'),
  // },
  {
    path: '/airplane',
    name: 'Airplane',
    component: () => import(/* webpackChunkName: "Airplane" */ '../views/airplane/Airplane.vue'),
  },
  {
    path: '/street',
    name: 'Street',
    component: () => import(/* webpackChunkName: "Airplane" */ '../views/street/Street.vue'),
  },
  {
    path: '/earth',
    name: 'Earth',
    component: () => import(/* webpackChunkName: "Earth" */ '../views/earth/Earth.vue'),
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
