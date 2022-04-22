// import {
//   Budget
// } from '@/models';

export const state = () => ({
  navLinks: []
});

export const mutations = {
  SET_NAVLINKS(state,payload) {
    // payload.navLinks.forEach(budget => {
    //   state.navLinks.push(new Budget(budget));
    // });
    state.navLinks = payload.navLinks;
  }
};

export const getters = {
  
};

export const actions = {
  
  async getNavLinks({ commit }) {
    const navLinks = await this.$repositories.navLinks.get();
    commit('SET_NAVLINKS', { navLinks });
  }

};