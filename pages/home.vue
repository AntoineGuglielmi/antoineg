<template>
  <div>
    
    <Atoms-Text-H1>Vue d'ensemble</Atoms-Text-H1>

    <Molecules-Section>
      <template v-slot:header>
        <Atoms-Text-H2>L'état de tes budgets</Atoms-Text-H2>
      </template>
      <template v-slot:body>
        <Molecules-Liste-Etat-Budgets
          :budgets="budgets"
        />
      </template>
    </Molecules-Section>

    <Molecules-Section>
      <template v-slot:header>
        <Atoms-Text-H2>Reste non alloué</Atoms-Text-H2>
      </template>
      <template v-slot:body>
        <p v-if="reste > 0"><strong>{{ resteFormated }}</strong> restent non alloués pour le moment. Avec un peu de chance, tout ça finira dans l'épargne !</p>
        <p v-else>Tu n'as pas de reste non alloué. La somme totale de tes budgets crée un déficit de <strong>{{ reste * (-1) }}€.</strong></p>
      </template>
    </Molecules-Section>

    <Molecules-Section>
      <template v-slot:header>
        <Atoms-Text-H2>{{ daysUntilSalary }} jours avant ton prochain salaire</Atoms-Text-H2>
      </template>
      <template v-slot:body>
        <p>Si tu ne veux pas exploser tes budgets, ça représente une dépense quotidienne maximum de :</p>
        <Molecules-liste-depense-quotidienne-max
          :budgets="budgetsMoreInfos"
          v-bind="{daysUntilSalary}"
        />
      </template>
    </Molecules-Section>
    
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {

  computed: {

    ...mapState({
      budgets(state) {
        return state.budgets.budgets;
      },
      cfg: (state) => {
        return state.cfg.cfg;
      },
      salaryDay(state) {
        return state.cfg.salary_day;
      }
    }),

    reste() {
      let reste = 0;
      this.budgets.forEach(budget => {
        if(budget.flux === 'Crédit') {
          reste += budget.total;
        } else {
          reste -= Math.max(budget.limit, budget.total);
        }
      });
      return reste;
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

    budgetsMoreInfos() {
      return this.budgets.filter(budget => {
        return budget.limit && !budget.saving && budget.flux === 'Débit';
      });
    },

    resteFormated() {
      return this.$numbers.format(this.reste, {style: 'currency'})
    }

  },

  methods: {
    
  }

}
</script>