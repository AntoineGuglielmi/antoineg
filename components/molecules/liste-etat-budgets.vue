<template>
  <ul>
    <li
      class="budget__main"
      v-for="budget in budgets"
      :key="budget.id"
    >
      <NuxtLink class="budget__link" :to="{name: 'budgets-budgetId', params: {budgetId: budget.id}}">
        <p class="budget__name">{{ budget.name }}</p>

        <div class="budget__infos">
          <Atoms-Text-Budget-Flux
            v-bind="{budget}"
          />
          <Atoms-Text-Budget-Limit
            v-bind="{budget}"
          />
          <Atoms-Text-Budget-Total-Progress
            v-bind="{budget}"
          />
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    budgets: {
      type: Array,
      default: []
    }
  },
  methods: {
    limit(budget) {
      return budget.limit ? `Limite : ${budget.limit}€` : 'Actuellement pas de limite';
    },
    fluxClass(budget) {
      return {
        in: budget.flux === 'Crédit',
        out: budget.flux === 'Débit'
      }
    }
  }
}
</script>

<style lang="sass" scoped>
ul
  display: flex
  flex-direction: column
  gap: 0.5rem

  .budget__main
    background-color: $bleu-clair
    border-radius: 0.25rem

    .budget__link
      display: flex
      align-items: center
      // justify-content: space-between
      padding: 0.5rem

      .budget__name
        // flex-shrink: 0
        // width: 75%

      .budget__name,
      .budget__infos
        // width: 100%
        
      .budget__infos
        margin-left: auto
        display: flex
        gap: 0.5rem
        // justify-content: center
        align-items: center
        font-size: 0.75rem
        // flex-shrink: 4
        // flex-shrink: 0
</style>