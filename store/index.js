// export const strict = false

export const state = () => ({
  cfg: []
});

export const mutations = {
  setConfig(state,payload) {
    state.cfg = payload.cfg;
  }
};

export const getters = {
  cfg: (state) => (name = null) => {
    if(name !== null) {
      return state.cfg.filter(cfg => {
        return cfg.name === name;
      })[0];
    }
    return state.cfg;
  }
};

export const actions = {
  async nuxtServerInit({ commit, dispatch, state }) {
    await dispatch('budgets/getBudgets');
    await dispatch('cfg/getConfig');
    await dispatch('navLinks/getNavLinks');
  }
};