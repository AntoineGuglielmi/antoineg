<template>
  <div>
    
    <Atoms-Text-H1>Simuler une dépense</Atoms-Text-H1>

    <Molecules-Section>
      <template v-slot:body>
        <form @submit.prevent="">

          <div class="form__row">
            <select @change="updateBudget($event)">
              <option hidden selected disabled>Sélectionner un budget</option>
              <!-- :selected="budget.id === budgetSelf.id" -->
              <option
                v-for="budgetSelf in budgetsSelect"
                :key="budgetSelf.id"
                :data-budget-id="budgetSelf.id"
                :selected="budgetSelf.id * 1 === $route.query.budgetId * 1"
              >
                {{ budgetSelf.name }}
              </option>
            </select>
          </div>
          
          <template v-if="budgetIsOkForSimulation">
            <label>
              Montant de la dépense
              <span>
                <input type="number" step="0.01" v-model="cost">
                €
              </span>
            </label>
          </template>

        </form>
      </template>
    </Molecules-Section>

    <Molecules-Section v-if="this.budget">
      <template v-slot:header>
        <Atoms-Text-H2 v-if="budgetIsOkForSimulation">Résultat</Atoms-Text-H2>
        <Atoms-Text-H2 v-else>Simulation impossible</Atoms-Text-H2>
      </template>

      <template v-slot:body>

        <template v-if="budgetIsOkForSimulation">
          <template v-if="simulationOk">

            <template v-if="computedSimulation.deadBudget">

              <p v-if="computedSimulation.exceeding > 0">Une dépense de <strong>{{ computedSimulation.cost }}</strong> aujourd'hui sur le budget <strong>{{ budget.name }}</strong> ferait exploser ton bugdet : sa limite de <strong>{{ computedSimulation.budgetLimit }}</strong> serait dépassée de <strong>{{ computedSimulation.exceedingFormated }}</strong>.</p>

              <p v-else>Une dépense de <strong>{{ computedSimulation.cost }}</strong> aujourd'hui sur le budget <strong>{{ budget.name }}</strong> ferait exploser ton bugdet : tu atteindrais sa limite de <strong>{{ computedSimulation.budgetLimit }}</strong>.</p>

            </template>
            <template v-else>
              <p>Une dépense de <strong>{{ computedSimulation.cost }}</strong> aujourd'hui sur le budget <strong>{{ budget.name }}</strong> représente <strong>{{ computedSimulation.nbJours }} jour{{ computedSimulation.s }}</strong> de dépenses quotidiennes.</p>
              <p>Ta dépense quotidienne maximum sur ce budget passerait de <strong>{{ computedSimulation.maxPerDayAmount }}</strong> à <strong>{{ computedSimulation.newMaxPerDayAmount }}</strong>.</p>
            </template>

            <p>Enfin, ton épargne maximum, actuellement de <strong>{{ computedSimulation.currentSaving }}</strong>, baisserait à <strong>{{ computedSimulation.thenSaving }}</strong>.</p>

          </template>

          <template v-else><p>En attente d'une dépense...</p></template>
        </template>

        <template v-else>

          <p>La limite de <strong>{{ $numbers.format(budget.limit, {style: 'currency'}) }}</strong> que tu as fixée pour le budget <strong>{{ budget.name }}</strong> est déjà dépassée de <strong>{{ $numbers.format(budget.total - budget.limit, {style: 'currency'}) }}</strong>. Pas de simulation possible.</p>

        </template>

        <Nuxt-Link
          class="button--regular button--bleu"
          id="simulation__gotobudget"
          :to="{name: 'budgets-budgetId', params: {budgetId: budget.id}}"
        >Aller au budget</Nuxt-Link>

      </template>
    </Molecules-Section>

  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {

  data() {
    return {
      cost: 0
    }
  },

  computed: {

    ...mapState({
      budgets: (state) => {
        return state.budgets.budgets;
      },
      salaryDay(state) {
        return state.cfg.salary_day;
      }
    }),
    ...mapGetters({
      getBudget: 'budgets/getBudget'
    }),

    budget() {
      return this.$route.query.budgetId ? this.getBudget(this.$route.query.budgetId) : null;
    },

    budgetsSelect() {
      return this.budgets.filter(budget => {
        return !!budget.limit;
      })
    },

    budgetIsOkForSimulation() {
      return this.budgetExists && !this.budgetIsDead;
    },
    
    budgetExists() {
      return this.budget !== null;
    },
    
    budgetIsDead() {
      return this.budget?.isDead === true;
    },

    computedSimulation() {
      const cost = this.cost;
      const budget = this.budget;
      const budgets = this.budgets;
      const style = {style: 'currency'};

      const format = (nb) => {
        return this.$numbers.format(nb,style);
      }

      const nbJours = Math.ceil(this.cost / this.maxPerDayAmount(this.budget));
      const maxPerDayAmount = format(this.maxPerDayAmount(this.budget));
      const newMaxPerDayAmount = format((this.budget.limit - (this.budget.total + (this.cost * 1))) / this.daysUntilSalary);

      const currentSaving = this.budgets.reduce((p,n) => {
        return !n.saving
          ? (n.flux === 'Débit'
              ? p - n.total
              : p + n.total
            )
          : p;
      }, 0);

      const thenSaving = format(currentSaving - (this.cost * 1));

      const deadBudget = ((this.cost * 1) + this.budget.total) >= this.budget.limit;

      const exceeding = this.budget.total + (this.cost * 1) - this.budget.limit;

      return {
        cost: format(this.cost),
        s: nbJours > 1 ? 's' : '',
        nbJours,
        maxPerDayAmount,
        newMaxPerDayAmount,
        thenSaving,
        currentSaving: format(currentSaving),
        deadBudget,
        budgetLimit: format(this.budget.limit),
        exceedingFormated: format(exceeding),
        exceeding
      };
    },

    daysUntilSalary() {
      const today = new Date();
      const currentMonthId = today.getMonth();
      const currentYear = today.getFullYear();
      const salaryDate = new Date(currentYear,currentMonthId,this.salaryDay);
      let diffDate = this.$dates.diff(salaryDate,today);
      if(diffDate.milliseconds <= 0) {
        const nextMonthId = (new Date((new Date()).setMonth((new Date()).getMonth() + 1))).getMonth();
        const nextYear = currentMonthId > nextMonthId ? (new Date((new Date()).setFullYear((new Date()).getFullYear() + 1))).getFullYear() : currentYear;
        const newSalaryDate = new Date(nextYear,nextMonthId,this.salaryDay);
        diffDate = this.$dates.diff(newSalaryDate,today);
      }
      return diffDate.number;
    },

    simulationOk() {
      return this.cost !== 0 && this.cost !== null && this.cost !== '';
    }

  },

  methods: {

    async updateBudget(event) {
      const eventIsObject = typeof event === 'object';
      if (!eventIsObject) {
        this.name = event;
      } else {
        const budgetId = event.target[event.target.selectedIndex].dataset.budgetId;
        this.$router.push({
          name: 'simulation',
          query: {
            budgetId
          }
        });
      }
    },

    maxPerDayAmount(budget) {
      const amount = Math.max((budget.limit - budget.total) / this.daysUntilSalary, 0);
      return amount;
    }

  },

}
</script>

<style lang="sass" scoped>

</style>