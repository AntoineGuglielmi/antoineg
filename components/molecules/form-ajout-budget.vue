<template>
  <form @submit.prevent="submit">

    <label for="name" class="form__group">
      Nom
      <input type="text" id="name" v-model="name" autofocus :class="{form__error: errors.name}" v-on="checkOnSubmit ? { keyup: checkBudgetName } : {}">
    </label>

    <label for="saving" class="form__group label__label label__checkbox" :class="{ 'label__active': saving }">
      Épargne
      <input type="checkbox" id="saving" v-model="saving">
    </label>

    <div class="form__row">
      <label for="in" class="form__group label__label label__radio" :class="{ 'label__active': flux === 'Crédit', form__error: errors.flux }">
        Crédit
        <input type="radio" id="in" value="Crédit" v-model="flux" @change="errors.flux = false">
      </label>
      <label for="out" class="form__group label__label label__radio" :class="{ 'label__active': flux === 'Débit', form__error: errors.flux }">
        Débit
        <input type="radio" id="out" value="Débit" v-model="flux" @change="errors.flux = false">
      </label>
    </div>

    <label for="limit" class="form__group">
      Limite
      <div class="label__input"><input type="number" step="0.01" id="limit" v-model="limit">€</div>
    </label>

    <button class="button--regular button--colorless button--center" type="submit">Ajouter</button>

  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
      name: '',
      saving: false,
      flux: null,
      limit: null,
      errors: {
        name: false,
        flux: false
      },
      checkOnSubmit: false
    }
  },
  computed: {
    ...mapState({
      budgets(state) {
        return state.budgets.budgets;
      }
    }),

  },
  methods: {

    ...mapActions({
      addBudget: 'budgets/createBudget'
    }),

    checkBudgetName() {
      const budgetNameAlreadyExists = !!this.budgets.filter(budget => {
        return budget.name.toLowerCase() === this.name.toLowerCase();
      }).length;

      this.errors.name = (this.name === '') || budgetNameAlreadyExists;
    },

    async submit() {

      // const name = this.name;
      // const saving = this.saving;
      // const flux = this.flux;
      // let limit = this.limit;
      this.checkBudgetName();
      this.checkOnSubmit = true;
      this.errors.flux = this.flux === null;

      if(this.errors.name || this.errors.flux) {
        return;
      }
      if(limit === null) {
        limit = 0;
      }

      const data = this.$misc.makeData({
        name: this.name,
        saving: this.saving,
        flux: this.flux,
        limit: this.limit
      });
      
      await this.addBudget(data);

      this.name = '';
      this.saving = false;
      this.flux = null;
      this.limit = null;
    }
  }

}
</script>

<style lang="sass" scoped>
// form
//   display: flex
//   gap: 0.5rem
//   flex-direction: column
//   width: 100%
//   max-width: 400px

//   .form__row
//     display: flex
//     align-items: center
//     gap: 0.5rem

//     & > *
//       width: 100%
//       flex-shrink: 1
  
//   label
//     display: flex
//     flex-direction: column
//     font-size: inherit
//     font-family: inherit
//     color: inherit

//     &.label__checkbox,
//     &.label__radio
//       transition: 0.15s ease-in-out
//       transition-property: background-color, border-color

//       input[type=checkbox],
//       input[type=radio]
//         display: none
      
//       &.label__active
//         border-color: transparent
//         background-color: $bleu
//         color: $blanc
    
//     &.label__checkbox
//       text-decoration: line-through

//       &.label__active
//         text-decoration: none
    
//     .label__input
//       display: flex
//       gap: 0.5rem
//       align-items: center

//   .label__label,
//   button,
//   input,
//   select,
//   textarea
//     border: 1px solid $gris-clair
//     background-color: transparent
//     padding: 0.5rem
//     font-size: inherit
//     font-family: inherit
//     color: inherit

//     &.form__error
//       border-color: $rouge-clair

//   button
//     transition: 0.15s ease-in-out
//     transition-property: background-color, border-color
//     &:hover
//       cursor: pointer
//       border-color: transparent
//       background-color: $bleu
//       color: $blanc
</style>