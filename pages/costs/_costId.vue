<template>
  <div>
    
    <Atoms-Text-H1 v-if="cost">{{ costForm.name }}</Atoms-Text-H1>
    <Atoms-Text-H1 v-else>Il doit y avoir une erreur</Atoms-Text-H1>

    <Molecules-Section>
      <template #header>
        <template v-if="cost">
          <Atoms-Text-H2>Modifier la dépense</Atoms-Text-H2>
        </template>
      </template>

      <template #body>
        <template v-if="!cost">
          <p>La dépense que tu as demandée n'existe pas <Atoms-Icons-Google-Icon>sentiment_very_dissatisfied</Atoms-Icons-Google-Icon></p>
        </template>

        <template v-else>

          <form @submit.prevent="">

            <div class="form__group">
              <label for="name">
                Nom
                <input type="text" id="name" v-model="costForm.name" @keyup="update('name')">
              </label>
            </div>

            <div class="form__group">
              <label for="amount">
                Montant
                <div class="label__input">
                    <!-- @keyup="update('amount')" -->
                  <input
                    type="text"
                    id="amount"
                    v-model="costForm.amount"
                    @keyup="checkCostAmount"
                    :class="{
                      form__error: errors.amount
                    }"
                  >
                  €
                </div>
              </label>
            </div>

            <div class="form__group">
              <label for="budget_id">
                Appartient au budget
                <select v-model="costForm.budgets_id" id="budget_id" @change="update('budgets_id')">
                  <option
                    v-for="budget in budgets"
                    :key="budget.id"
                    :value="budget.id"
                    :selected="budget.id * 1 === costForm.budgets_id * 1"
                  >{{ budget.name }}</option>
                </select>
              </label>
            </div>

          </form>

          <Nuxt-Link
            :to="{
              name: 'budgets-budgetId',
              params: {
                budgetId: cost.budgets_id
              }
            }"
            class="button--regular button--bleu"
          >
            Aller au budget
          </Nuxt-Link>

        </template>
      </template>
    </Molecules-Section>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return {
      costForm: {},
      errors: {
        amount: false
      }
    }
  },
  fetch() {
    this.$set(this.costForm,'budgets_id',this.cost.budgets_id);
    this.$set(this.costForm,'name',this.cost.name);
    this.$set(this.costForm,'amount',this.cost.amount);
    this.$set(this.costForm,'previousAmount',this.cost.amount);
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
      return this.costs.filter(cost => {
        return cost.id * 1 === this.$route.params.costId * 1;
      })[0] || null;
    }
  },
  methods: {
    ...mapActions({
      updateCost: 'budgets/updateCost'
    }),
    async update(what) {
      const payload = {id: this.cost.id};
      payload[what] = this.costForm[what];
      console.log(payload)
      await this.updateCost(payload);
    },
    checkCostAmount() {
      this.errors.amount = false;
      const amount = this.costForm.amount * 1;
      if(!amount) {
        this.errors.amount = true;
        this.costForm.amount = this.costForm.previousAmount;
        return;
      }
      this.update('amount');
      this.costForm.previousAmount = this.costForm.amount;
    }
  }
}
</script>

<style lang="sass" scoped>
form
  margin-bottom: 1rem
</style>