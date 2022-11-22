// import {
//   Archive
// } from '@/models';

// import Numbers from '@/plugins/numbers.js';

export const state = () => ({
  archives: []
});

export const mutations = {
  SET_ARCHIVES(state,payload) {
    state.archives = payload.archives;
    // payload.archives.forEach(budget => {
    //   state.archives.push(new Archive(budget));
    // });
  }
};

export const getters = {
  getArchive: (state) => (budgetId) => {
    return state.archives.filter(budget => {
      return budget.id * 1 === budgetId * 1;
    })[0];
  }
};

export const actions = {
  
  async getArchives({ commit }) {
    const archives = await this.$repositories.archives.get();
    commit('SET_ARCHIVES', { archives });
  },

  async createArchive({ dispatch }, payload) {
    // Création d'une archive
    const res = await this.$repositories.archives.create(payload);
    dispatch('getArchives');
  }

};