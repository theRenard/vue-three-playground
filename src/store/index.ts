import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isNavOpen: false,
  },
  mutations: {
    toggleNav(state) {
      // eslint-disable-next-line no-param-reassign
      state.isNavOpen = !state.isNavOpen;
      console.log(state.isNavOpen);
    },
  },
  actions: {
  },
  modules: {
  },
});
