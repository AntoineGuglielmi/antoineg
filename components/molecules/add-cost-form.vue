<template>
  <div>
    <p>Ajouter une dépense :</p>
    <form @submit.prevent="createCost">

      <div class="form__row">
        <input
          type="text"
          id="name"
          v-model="name"
          ref="name"
          placeholder="Nom / Titre"
        >
        <input
          type="number"
          id="amount"
          v-model="amount"
          step="0.01"
          placeholder="Montant"
          :class="{form__error: errors.amount}"
          v-on="checkOnSubmit ? {keyup: checkCostAmount} : {}"
          ref="amount"
        >
        
        <button class="button--regular button--bleu" type="submit">Ajouter</button>
      </div>

    </form>
    <Nuxt-Link class="button--regular button--bleu" :to="{name: 'simulation', query: {budgetId: budget.id}}">Simuler une dépense sur ce budget</Nuxt-Link>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
      name: this.prefix,
      amount: null,
      errors: {
        amount: false
      },
      checkOnSubmit: false
    }
  },
  computed: {

  },
  props: {
    budget: {
      type: Object
    },
    prefix: {
      type: String
    }
  },
  methods: {

    ...mapActions({
      storeCreateCost: 'budgets/createCost',
    }),

    checkCostAmount() {
      this.errors.amount = false;
      const amount = this.amount * 1;
      if (!amount) {
        this.errors.amount = true;
        this.$refs.amount.focus();
        return;
      }
    },

    async createCost() {
      const name = this.name;
      const amount = this.amount * 1;
      this.checkCostAmount();
      this.checkOnSubmit = true;
      const budgets_id = this.budget.id;

      if(this.errors.amount) {
        return;
      }

      const data = this.$misc.makeData({
        name,
        amount,
        budgets_id
      });

      await this.storeCreateCost(data);

      this.name = '';
      this.amount = null;
      this.errors.amount = false;
      this.$refs.amount.blur();
      this.$refs.name.focus();
    }

  }
}
</script>

<style lang="sass" scoped>
form
  margin: 1rem 0
//   display: flex
//   gap: 0.5rem
  
//   input
//     max-width: 50%

//     &#name
//       // flex-shrink: 1
//       flex-shrink: 10
//     &#amount
//       // flex-shrink: 5
//       flex-shrink: 10

button
  flex-shrink: 0
  width: fit-content !important

  // input,
  // button
  //   font-family: inherit
  //   font-size: inherit
  //   color: inherit
  //   border: none
  //   padding: 0.75rem
  //   background-color: $bleu-clair
  //   border-radius: 0.25rem
  //   border: 1px solid transparent

  //   &.form__error
  //     border-color: $rouge-clair
</style>