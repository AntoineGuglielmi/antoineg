<template>
  <div>
    <form>

      <label for="name" class="form__group">
        Nom
        <input type="text" id="name" v-model="name" @keyup="update('name')" :class="{form__error: errors.name}">
      </label>

      <label for="saving" class="form__group label__label label__checkbox" :class="{ 'label__active': saving }">
        Épargne
        <input type="checkbox" id="saving" v-model="saving" @change="update('saving')">
      </label>

      <div class="form__row">
        <label for="in" class="form__group label__label label__radio" :class="{ 'label__active': flux === 'Crédit' }">
          Crédit
          <input type="radio" id="in" value="Crédit" v-model="flux" @change="update('flux')">
        </label>
        <label for="out" class="form__group label__label label__radio" :class="{ 'label__active': flux === 'Débit' }">
          Débit
          <input type="radio" id="out" value="Crédit" v-model="flux" @change="update('flux')">
        </label>
      </div>

      <label for="limit" class="form__group">
        Limite
        <div class="label__input"><input type="number" step="0.01" id="limit" v-model="limit" @keyup="update('limit')">€</div>
      </label>

      <div class="form__separation"></div>

      <div class="form__row">
        <label for="name-asc" class="form__group label__label label__radio" :class="{ 'label__active': sort_costs === 'name:asc' }">
          <div class="tac">
            <Atoms-Icons-A-To-Z />
          </div>
          <input type="radio" id="name-asc" value="name:asc" v-model="sort_costs" @change="update('sort_costs')">
        </label>

        <label for="name-desc" class="form__group label__label label__radio" :class="{ 'label__active': sort_costs === 'name:desc' }">
          <div class="tac">
            <Atoms-Icons-Z-To-A />
          </div>
          <input type="radio" id="name-desc" value="name:desc" v-model="sort_costs" @change="update('sort_costs')">
        </label>
      <!-- </div>

      <div class="form__row"> -->
        <label for="amount-asc" class="form__group label__label label__radio" :class="{ 'label__active': sort_costs === 'amount:asc' }">
          <div class="tac">
            <Atoms-Icons-Small-To-Big />
          </div>
          <input type="radio" id="amount-asc" value="amount:asc" v-model="sort_costs" @change="update('sort_costs')">
        </label>

        <label for="amount-desc" class="form__group label__label label__radio" :class="{ 'label__active': sort_costs === 'amount:desc' }">
          <div class="tac">
            <Atoms-Icons-Big-To-Small />
          </div>
          <input type="radio" id="amount-desc" value="amount:desc" v-model="sort_costs" @change="update('sort_costs')">
        </label>
      </div>

      <div class="form__separation"></div>
    
      <div class="form__row">
        <button class="button--regular button--orange button--center" id="budget__empty" @click.prevent="emptyBudget">Vider le budget</button>
        <button class="button--regular button--rouge button--center" id="budget__delete" @click.prevent="deleteBudget">Supprimer le budget</button>
      </div>
    </form>
    
    <Organisms-Confirm-Delete-Budget-Popup ref="confirmDialogue"></Organisms-Confirm-Delete-Budget-Popup>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
      name: this.budget.name,
      saving: this.budget.saving,
      flux: this.budget.flux,
      limit: this.budget.limit,
      sort_costs: this.budget.sort_costs,
      errors: {
        name: false
      }
    }
  },
  computed: {
    ...mapState({
      budgets(state) {
        return state.budgets.budgets;
      }
    })
  },
  props: {
    budget: {
      type: Object
    }
  },
  methods: {

    ...mapActions({
      updateBudget: 'budgets/updateBudget',
      storeDeleteBudget: 'budgets/deleteBudget',
      storeEmptyBudget: 'budgets/emptyBudget'
    }),
    
    async update(what) {
      const value = this[what];
      if(what === 'name') {
        const budgetNameAlreadyExists = !!this.budgets.filter(budget => {
          return budget.name.toLowerCase() === this.name.toLowerCase() && budget.id * 1 !== this.budget.id * 1;
        }).length;
        if(budgetNameAlreadyExists || value === '') {
          this.errors.name = true;
          return;
        } else {
          this.errors.name = false;
        }
      }
      const payload = {id: this.budget.id};
      payload[what] = value;
      await this.updateBudget(payload);
      this.$emit('mustUpdate', this.name);
    },
    
    async deleteBudget() {
      const ok = await this.$refs.confirmDialogue.show({
        title: `Suppression du budget ${this.budget.name}`,
        message: 'On supprime le budget ? Cette opération est irréversible.',
        okButton: 'Supprimer',
      })
      if(ok) {
        await this.storeDeleteBudget(this.budget.id);
        this.$emit('redirect');
      }
    },
    
    async emptyBudget() {
      const ok = await this.$refs.confirmDialogue.show({
        title: `Suppression es dépenses du budget ${this.budget.name}`,
        message: 'On supprime toutes les dépenses du budget ? Cette opération est irréversible.',
        okButton: 'Supprimer',
      })
      if(ok) {
        await this.storeEmptyBudget(this.budget.id);
        // this.$emit('redirect');
      }
    }
    
  }
}
</script>

<style lang="sass" scoped>
// form
  // display: flex
  // gap: 0.5rem
  // flex-direction: column
  // width: 100%
  // max-width: 400px

  // .form__row
  //   display: flex
  //   align-items: center
  //   gap: 0.5rem

  //   & > *
  //     width: 100%
  //     flex-shrink: 1
  
  // label
  //   display: flex
  //   flex-direction: column
  //   font-size: inherit
  //   font-family: inherit
  //   color: inherit

  //   &.label__checkbox,
  //   &.label__radio
  //     transition: 0.15s ease-in-out
  //     transition-property: background-color, border-color

  //     input[type=checkbox],
  //     input[type=radio]
  //       display: none
      
  //     &.label__active
  //       border-color: transparent
  //       background-color: $bleu
  //       color: $blanc
    
  //   &.label__checkbox
  //     text-decoration: line-through

  //     &.label__active
  //       text-decoration: none
    
  //   .label__input
  //     display: flex
  //     gap: 0.5rem
  //     align-items: center

  // .label__label,
  // button,
  // input,
  // select,
  // textarea
  //   border: 1px solid $gris-clair
  //   background-color: transparent
  //   padding: 0.5rem
  //   font-size: inherit
  //   font-family: inherit
  //   color: inherit

  // button
  //   transition: 0.15s ease-in-out
  //   transition-property: background-color, border-color
  //   &:hover
  //     cursor: pointer
  //     // border-color: transparent
  //     // background-color: $bleu
  //     // color: $blanc
  //   &#budget__empty
  //     background-color: $orange-clair
  //     // color: $orange
  //   &#budget__delete
  //     background-color: $rouge-clair
  //     // color: $rouge
  
  // .form__error
  //   border-color: $rouge-clair

.tac
  display: flex
  align-items: center
  justify-content: center
</style>