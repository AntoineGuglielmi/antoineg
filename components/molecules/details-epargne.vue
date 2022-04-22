<template>
  <div id="saving__details">

    <p>Tes rentrées :</p>

    <Molecules-Details-Epargne-Liste
      :ins="details.ins"
      :inout="'in'"
    />

    <p>Moins les dépenses <strong>actuelles</strong> de tes budgets <strong>qui ne sont pas de l'épargne</strong> :</p>

    <Molecules-Details-Epargne-Liste
      :ins="details.outs"
      :inout="'out'"
    />

  </div>
</template>

<script>
export default {

  data() {
    return {
      savingAmount: 0
    }
  },

  props: {
    budgets: {
      type: Array
    }
  },

  computed: {
    details() {
      const ins = [];
      const outs = [];

      this.budgets.forEach(budget => {
        if(!budget.saving) {
          // const detailedBudget = budget;
          if(budget.flux === 'Crédit') {
            // this.savingAmount += budget.total;
            ins.push({
              budget,
              // savingAmount: this.savingAmount
            });
          } else {
            // this.savingAmount -= budget.total;
            outs.push({
              budget,
              // savingAmount: this.savingAmount
            });
          }
        }
      });

      ins.forEach(eachIn => {
        this.savingAmount += eachIn.budget.total;
        eachIn.savingAmount = this.savingAmount;
      });

      outs.forEach(eachOut => {
        this.savingAmount -= eachOut.budget.total;
        eachOut.savingAmount = this.savingAmount;
      });

      // ins.forEach(budget => {
      //   this.savingAmount += budget.total;
      //   budget.savingAmount = this.savingAmount;
      // });

      // outs.forEach(budget => {
      //   this.savingAmount -= budget.total;
      //   budget.savingAmount = this.savingAmount;
      // });

      return {
        ins,
        outs
      };
    }
  }

}
</script>

<style lang="sass" scoped>

</style>