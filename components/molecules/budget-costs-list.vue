<template>
  <div>
    <ul id="budget__costs">
      <li
        id="budget__total"
      >
        <p
          id="budget__left"
          v-if="budget.limit"
          :class="totalAmountClasses"><span>{{ texteReste }}</span><strong>{{ resteFormated }}</strong></p>
        <div
          id="total__amount"
          :class="totalAmountClasses"
        ><span>Total</span>{{ totalFormated }}</div>
      </li>
      <li
        class="budget__cost"
        v-for="cost in costs"
        :key="cost.id"
      >
        <Atoms-Cost
          :cost="cost"
          @delete-cost="deleteCost($event, cost)"
        />
      </li>
      <li>
        <Molecules-Add-Cost-form
          :budget="budget"
          :prefix="prefix"
        />
      </li>
    </ul>
    
    <Organisms-Confirm-Delete-Budget-Popup ref="confirmDialogue"></Organisms-Confirm-Delete-Budget-Popup>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  props: {
    budget: {
      type: Object
    }
  },
  computed: {
    ...mapState({
      configPrefix(state) {
        return state.cfg.date_prefixed_cost_amount;
      }
    }),
    costs() {
      return this.budget.costs;
    },
    reste() {
      return this.budget.limit - this.budget.total;
    },
    resteFormated() {
      return this.$numbers.format(this.reste > 0 ? this.reste : this.reste * (-1), {style: 'currency'});
    },
    // total() {
    //   return this.$arrays.sumInObjectsArray(this.costs, 'amount');
    // },
    totalFormated() {
      return this.$numbers.format(this.budget.total, {style: 'currency'});
    },
    totalAmountClasses() {
      return {
        total__blue: !this.budget.limit,
        total__green: this.budget.limit && (this.budget.progress < 0.50),
        total__orange: this.budget.limit && (this.budget.progress >= 0.50 && this.budget.progress < 1),
        total__red: this.budget.limit && (this.budget.progress >= 1)
      }
    },
    texteReste() {
      return this.reste > 0 ? 'Tu as encore droit à ' : 'Tu as dépassé ton budget limite de ';
    },
    prefix() {
      if(this.configPrefix) {
        const today = new Date();
        const todayDay = this.$numbers.format(today.getDate(), {
            minimumIntegerDigits: 2,
            maximumIntegerDigits: 2,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        const todayMonth = this.$numbers.format(today.getMonth() + 1, {
            minimumIntegerDigits: 2,
            maximumIntegerDigits: 2,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        return `${todayDay}/${todayMonth} `;
      }
      return '';
    }
  },
  methods: {
    ...mapActions({
      storeDeleteCost: 'budgets/deleteCost'
    }),
    async deleteCost(event,cost) {
      const ok = await this.$refs.confirmDialogue.show({
        title: `Suppression de la dépense ${cost.name}`,
        message: 'On supprime cette dépense ? Cette opération est irréversible.',
        okButton: 'Supprimer',
      })
      if(ok) {
        await this.storeDeleteCost(cost.id);
      }
    },
    // prefix() {
    //   if(this.configPrefix) {
    //     const today = new Date();
    //     const todayDay = this.$numbers.format(today.getDate(), {
    //         minimumIntegerDigits: 2,
    //         maximumIntegerDigits: 2,
    //         minimumFractionDigits: 0,
    //         maximumFractionDigits: 0
    //     });
    //     const todayMonth = this.$numbers.format(today.getMonth() + 1, {
    //         minimumIntegerDigits: 2,
    //         maximumIntegerDigits: 2,
    //         minimumFractionDigits: 0,
    //         maximumFractionDigits: 0
    //     });
    //     return `${todayDay}/${todayMonth} `;
    //   }
    //   return '';
    // }
  }
}
</script>

<style lang="sass" scoped>
#budget__costs
  display: flex
  flex-direction: column
  gap: 0.5rem

  #budget__total
    display: flex
    // flex-direction: column
    gap: 0.5rem
    align-items: center
    // background-color: darken($bleu-clair,7%)

    #budget__left
      margin: 0
      width: 50%
      display: flex
      flex-direction: column

      span
        font-size: 0.75rem

      &.total__green
        // background-color: $vert-pastel
        color: $vert-fonce
        
      &.total__orange
        // background-color: $orange-clair
        color: $orange-fonce
        
      &.total__red
        // background-color: $rouge-clair
        color: $rouge-fonce

    #total__amount
      margin: 0
      margin-left: auto
      font-weight: 800
      border-radius: 0.25rem
      padding: 0.75rem
      display: flex
      flex-direction: column
      text-align: right

      span
        font-size: 0.75em

    #total__amount
      &.total__green
        background-color: $vert-pastel
        color: $vert-fonce
        
      &.total__orange
        background-color: $orange-clair
        color: $orange-fonce
        
      &.total__red
        background-color: $rouge-clair
        color: $rouge-fonce
        
      &.total__blue
        background-color: $bleu-clair
        color: $bleu-fonce
        
</style>