<template>
  <div>

    <Atoms-Text-H1>
      <select name="name" id="name" v-model="name" @change="updateBudget($event)">
        <option
          v-for="budgetSelf in budgets"
          :key="budgetSelf.id"
          :selected="budget.id === budgetSelf.id"
          :data-budget-id="budgetSelf.id"
        >{{ budgetSelf.name }}</option>
      </select>
    </Atoms-Text-H1>

    <Molecules-Budget-Infos
      :budget="budget"
      @mustUpdate="updateBudget($event)"
      @redirect="redirect"
    />

    <Molecules-Budget-Costs-Form
      :budget="budget"
    />

  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      name: ''
    };
  },
  computed: {
    ...mapState({
      budgets: (state) => {
        return state.budgets.budgets;
      }
    }),
    ...mapGetters({
      getBudget: 'budgets/getBudget'
    }),
    budget() {
      return this.getBudget(this.$route.params.budgetId);
    },
  },
  async mounted() {
    this.name = this.budget.name;
  },
  methods: {
    redirect() {
      this.$router.push({name: 'budgets'});
    },

    async updateBudget(event) {
      const eventIsObject = typeof event === 'object';
      if (!eventIsObject) {
        this.name = event;
      } else {
        const budgetId = event.target[event.target.selectedIndex].dataset.budgetId;
        this.$router.push({
          name: 'budgets-budgetId',
          params: {
            budgetId
          }
        });
      }
    }
  },
}
</script>

<style lang="sass" scoped>
h1
  select
    font-weight: inherit
    padding: 0
</style>