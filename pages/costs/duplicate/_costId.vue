<template>
  <div>
    
    <Atoms-Text-H1>Dupliquer une dépense</Atoms-Text-H1>

    <Molecules-Section v-if="!!cost">
      <template v-slot:body>

        <form @submit.prevent="duplicateCost">

          <div class="form__group">
            <label for="cost__name">
              Nom
              <input type="text" id="cost__name" v-model="costForm.name">
            </label>
          </div>

          <div class="form__group">
            <label for="cost__amount">
              Montant
              <div class="label__input">
                <input
                  type="number"
                  id="cost__amount"
                  step="0.01"
                  v-model="costForm.amount"
                  :class="{
                    form__error: errors.amount
                  }"
                  ref="amount"
                  v-on="checkOnSubmit ? {keyup: checkCostAmount} : {}"
                >
                €
              </div>
            </label>
          </div>

          <div class="form__group">
            <label for="cost__budgets_id">
              Appartient au budget
              <select v-model="costForm.budgets_id" id="cost__budgets_id">
                <option
                  v-for="budget in budgets"
                  :key="budget.id"
                  :value="budget.id"
                  :selected="budget.id * 1 === costForm.budgets_id * 1"
                >{{ budget.name }}</option>
              </select>
            </label>
          </div>

          <div class="form__group">
            <button type="submit" class="button--regular button--bleu">Dupliquer la dépense</button>
          </div>

        </form>

      </template>
    </Molecules-Section>

    <Molecules-Section v-else>
      <template #body>
        <p>La dépense que tu as demandée n'existe pas <Atoms-Icons-Google-Icon>sentiment_very_dissatisfied</Atoms-Icons-Google-Icon></p>
      </template>
    </Molecules-Section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {

  fetch() {
    const fields = [
      'name',
      'amount',
      'budgets_id'
    ];
    if(this.cost) {
      fields.forEach(f => {
        this.$set(this.costForm,f,this.cost[f]);
      });
    }
  },

  computed: {
    ...mapState({
      budgets(state) {
        return state.budgets.budgets;
      }
    }),
    costs() {
      const costs = [];
      this.budgets.forEach(budget => {
        costs.push(...budget.costs);
      });
      return costs;
    },
    cost() {
      const cost = this.costs.filter(cost => {
        return cost.id * 1 === this.$route.params.costId * 1;
      })[0] || null;
      console.log(cost)
      return cost;
    }
  },

  data() {
    return {
      costForm: {},
      errors: {
        amount: false
      },
      checkOnSubmit: false
    }
  },

  methods: {
    ...mapActions({
      storeCreateCost: 'budgets/createCost'
    }),
    async duplicateCost() {

      const name = this.costForm.name;
      const amount = this.costForm.amount;
      const budgets_id = this.costForm.budgets_id;

      this.checkCostAmount();
      this.checkOnSubmit = true;

      if(this.errors.amount) {
        return;
      }

      const data = this.$misc.makeData({
        name,
        amount,
        budgets_id
      });

      await this.storeCreateCost(data);
      this.$router.push({
        name: 'budgets-budgetId',
        params: {
          budgetId: this.costForm.budgets_id
        }
      });
    },
    checkCostAmount() {
      console.log('check')
      this.errors.amount = false;
      console.log(this.errors)
      const amount = this.costForm.amount * 1;
      if (!amount) {
        this.errors.amount = true;
        this.$refs.amount.focus();
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>