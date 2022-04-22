import {
  Budget
} from '@/models';

import Numbers from '@/plugins/numbers.js';

export const state = () => ({
  budgets: []
});

export const mutations = {
  SET_BUDGETS(state,payload) {
    state.budgets = [];
    payload.budgets.forEach(budget => {
      state.budgets.push(new Budget(budget));
    });
  },
  SET_MORE_INFOS(state,payload) {

  }
};

export const getters = {
  getBudget: (state) => (budgetId) => {
    return state.budgets.filter(budget => {
      return budget.id * 1 === budgetId * 1;
    })[0];
  }
};

export const actions = {
  
  async getBudgets({ commit }) {
    const budgets = await this.$repositories.budgets.get();
    commit('SET_BUDGETS', { budgets });
  },

  moreInfos(context, payload) {
    // const datesPlugin = payload.datesPlugin;
    // const moreInfos = [];
    // state.budgets.forEach(budget => {
    //   if(budget.limit && !budget.saving && budget.flux === 'Débit') {
    //     const moreInfoItem = budget;
    //     // moreInfoItem.dead = moreInfoItem.total >= moreInfoItem.limit;
    // //     // moreInfoItem.maxPerDayAmount = Numbers.format(!moreInfoItem.dead ? (moreInfoItem.limit - moreInfoItem.total) / this.daysUntilSalary : 0, {style: 'currency'});
    //     moreInfoItem.maxPerDayAmount = !moreInfoItem.dead ? (moreInfoItem.limit - moreInfoItem.total) / context.state.cfg.daysUntilSalary : 0;
    // //     moreInfos.push(moreInfoItem);
    //   }
    // });
    // commit('SET_BUDGETS', { budgets: moreInfos });
  },

  async deleteBudget({ dispatch }, budgetId) {
    // Suppression du budget
    await this.$repositories.budgets.delete(budgetId);
    dispatch('getBudgets');
  },

  async updateBudget({ dispatch }, payload) {
    // Update du budget
    const {id, ...updatePayload} = payload;
    await this.$repositories.budgets.update(updatePayload, id);
    dispatch('getBudgets');
  },

  async updateCost({ dispatch }, payload) {
    // Update de la dépense
    const {id, ...updatePayload} = payload;
    await this.$repositories.costs.update(updatePayload, id);
    dispatch('getBudgets');
  },

  async emptyBudget({ dispatch }, budgetId) {
    // Update du budget
    await this.$repositories.costs.delete_by({budgetId});
    dispatch('getBudgets');
  },

  async createBudget({ dispatch }, payload) {
    // Création d'un budget
    await this.$repositories.budgets.create(payload);
    dispatch('getBudgets');
  },

  async createCost({ dispatch }, payload) {
    // Création d'une dépense
    await this.$repositories.costs.create(payload);
    dispatch('getBudgets');
  },

  async deleteCost({ dispatch }, costId) {
    // Suppression du budget
    await this.$repositories.costs.delete(costId);
    dispatch('getBudgets');
  },

};