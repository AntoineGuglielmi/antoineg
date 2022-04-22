<template>
  <ul>
    <li
      class="moreInfo__main"
      :class="{budget__dead: budget.isDead}"
      v-for="budget in budgets"
      :key="budget.id"
    >
      <div
        class="budget__infos"
        v-if="!budget.isDead"
      >
        <p><strong>{{ maxPerDayAmount(budget) }}</strong> pour le budget <strong>{{ budget.name }}</strong></p>
        <Nuxt-Link :to="{name: 'simulation', query: {budgetId: budget.id}}" class="budget__simulation"><Atoms-Icons-Google-Icon>question_mark</Atoms-Icons-Google-Icon></Nuxt-Link>
      </div>
      <p v-else>Le budget <strong>{{ budget.name }}</strong> est explosé ! {{ deadBudget }}</p>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      
    }
  },
  props: {
    budgets: {
      type: Array,
      default: []
    },
    daysUntilSalary: {
      type: Number
    }
  },
  methods: {
    fluxClass(budget) {
      return {
        in: budget.flux === 'Crédit',
        out: budget.flux === 'Débit'
      }
    },
    maxPerDayAmount(budget) {
      const amount = Math.max((budget.limit - budget.total) / this.daysUntilSalary, 0);
      return this.$numbers.format(amount, {style: 'currency'});
    }
  },
  async mounted() {
    
  },
  computed: {
    ...mapState({
      deadBudget(state) {
        return state.cfg.dead_budget_emoticon;
      }
    })
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/styles/imports/extends'

ul
  display: flex
  flex-direction: column
  gap: 0.5rem

  .moreInfo__main
    background-color: $bleu-clair
    padding: 0.75rem
    border-radius: 0.25rem

    &.budget__dead
      @extend .cbgc--rouge
    
    p
      margin: 0

    .budget__infos
      display: flex
      align-items: center
      justify-content: space-between
</style>