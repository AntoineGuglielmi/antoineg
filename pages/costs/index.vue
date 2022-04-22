<template>
  <div>
    
    <Atoms-Text-H1>Dépenses</Atoms-Text-H1>

    <Molecules-Section>
      <template v-slot:header>
        <Atoms-Text-H2>Toutes tes dépenses courantes</Atoms-Text-H2>
      </template>
      <template v-slot:body>

        <form @submit.prevent="">
          <div class="form__group">
            <input type="search" v-model="search" id="search" placeholder="Filtrer (par nom, montant ou budget)">
          </div>
        </form>

        <ul id="costs__main">
          <li
            v-for="cost in costs"
            :key="cost.id"
            class="cost"
          >
            <Atoms-Cost
              :cost="cost"
              :deleteButton="false"
            />
          </li>
        </ul>
      </template>
    </Molecules-Section>

  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      search: ''
    }
  },
  computed: {
    ...mapState({
      budgets(state) {
        return state.budgets.budgets;
      }
    }),
    costs() {
      let costs = [];
      this.budgets.forEach(budget => {
        costs.push(...budget.costs);
      });
      const sortedCosts = this.$arrays.sortByKey(costs,'name');
      return sortedCosts.filter(cost => {
        return cost.name.toLowerCase().includes(this.search.toLowerCase())
          || cost.amount.toString().includes(this.search)
          || this.budgetName(cost.budgets_id).toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  methods: {
    budgetName(budgetId) {
      return this.budgets.filter(budget => {
        return budget.id * 1 === budgetId * 1;
      })[0]?.name;
    },
  }
}
</script>

<style lang="sass" scoped>
form
  margin-bottom: 1rem

  input
    width: 100%

#costs__main
  display: flex
  flex-direction: column
  gap: 0.5rem
</style>