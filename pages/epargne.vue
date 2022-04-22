<template>
  <div>
    
    <Atoms-Text-H1>{{ saving }}</Atoms-Text-H1>

    <p>C'est le montant que tu peux éventuellement mettre de côté pour le moment.</p>

    <Molecules-Section>
      <template v-slot:header>
        <Atoms-Text-H2>Détails</Atoms-Text-H2>
      </template>
      <template v-slot:body>
        <Molecules-Details-Epargne
          :budgets="budgets"
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
      }
    }),
    
    saving() {
      const saving = this.budgets.reduce((p,n) => {
        return !n.saving
          ? (n.flux === 'Débit'
              ? p - n.total
              : p + n.total
            )
          : p;
      }, 0);
      return this.$numbers.format(saving, {style: 'currency'})
    }

  }

}
</script>