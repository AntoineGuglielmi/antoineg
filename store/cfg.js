// import {
//   Budget
// } from '@/models';

export const state = () => ({
  cfg: []
});

export const mutations = {
  SET_CFG(state,payload) {
    // payload.cfg.forEach(budget => {
    //   state.cfg.push(new Budget(budget));
    // });
    state.cfg = payload.cfg;
    for(const [k,v] of Object.entries(payload.cfg)) {
      state[v.name] = v.value;
    }
  }
};

export const getters = {

  // daysUntilSalary: (state) => ({
  //   datesPlugin
  // }) => {
  //   const today = new Date();
  //   const currentMonthId = today.getMonth();
  //   const currentYear = today.getFullYear();
  //   const salaryDate = new Date(currentYear,currentMonthId,this.salaryDay);
  //   const salaryDay = state.cfg.filter(c => (c.name === 'salary_day'));
  //   console.log('salaryDay : ', salaryDay)
  //   // let diffDate = datesPlugin.diff(salaryDate,today);
  //   // if(diffDate.milliseconds <= 0) {
  //   //   const nextMonthId = (new Date((new Date()).setMonth((new Date()).getMonth() + 1))).getMonth();
  //   //   const nextYear = currentMonthId > nextMonthId ? (new Date((new Date()).setFullYear((new Date()).getFullYear() + 1))).getFullYear() : currentYear;
  //   //   const newSalaryDate = new Date(nextYear,nextMonthId,this.salaryDay);
  //   //   diffDate = this.$dates.diff(newSalaryDate,today);
  //   // }
  //   // return diffDate.number;
  // }

};

export const actions = {
  
  async getConfig({ commit }) {
    const cfg = await this.$repositories.cfg.get();
    commit('SET_CFG', { cfg });
  },

  async updateConfig({ dispatch }, payload) {
    const {id, ...updatePayload} = payload;
    await this.$repositories.cfg.update(updatePayload, id);
    dispatch('getConfig');
  }

};