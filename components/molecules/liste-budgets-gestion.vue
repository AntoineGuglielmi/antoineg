<template>
  <div>
    <ul>
      <li
        class="budget__main"
        v-for="budget in budgets"
        :key="budget.id"
      >
        <NuxtLink class="budget__name" :to="{ name: 'budgets-budgetId', params: { budgetId: budget.id}}">
          {{ budget.name }}
        </NuxtLink>
        <div class="budget__actions">
          <Atoms-Button-Budget-Gestion
            :action="'up'"
            v-bind="buttonsCommonProps(budget)"
            @up="moveBudget($event,'up')"
          />
          <Atoms-Button-Budget-Gestion
            :action="'down'"
            v-bind="buttonsCommonProps(budget)"
            @down="moveBudget($event,'down')"
          />
          <Atoms-Button-Budget-Gestion
            :action="'delete'"
            v-bind="buttonsCommonProps(budget)"
            @delete="deleteBudget($event)"
          />
        </div>
      </li>
    </ul>

    <Organisms-Confirm-Delete-Budget-Popup ref="confirmDialogue"></Organisms-Confirm-Delete-Budget-Popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    budgets: {
      type: Array,
      default: []
    }
  },
  methods: {

    ...mapActions({
      storeDeleteBudget: 'budgets/deleteBudget',
      storeUpdateBudget: 'budgets/updateBudget'
    }),

    async deleteBudget(budget) {
      const ok = await this.$refs.confirmDialogue.show({
        title: `Suppression du budget ${budget.name}`,
        message: 'Confirmer la suppression du budget ? Cette opération est irréversible.',
        okButton: 'Supprimer',
      })
      if(ok) {
        this.storeDeleteBudget(budget.id);
      }
    },

    async moveBudget(budget,direction) {
      await this.storeUpdateBudget({id: budget.id,direction});
    },

    buttonsCommonProps(budget) {
      return {
        budget
      }
    }
  },
  computed: {

  }
}
</script>

<style lang="sass" scoped>
ul
  display: flex
  flex-direction: column
  gap: 0.5rem

  .budget__main
    display: flex
    align-items: stretch
    // justify-content: space-between
    background-color: $bleu-clair
    border-radius: 0.25rem
    overflow: hidden

    .budget__name
      margin: 0
      padding: 0.75rem
      width: 100%
    
    .budget__actions
      display: flex
      gap: 0.5rem
      align-items: stretch

</style>