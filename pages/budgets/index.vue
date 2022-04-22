<template>
  <div>

    <Atoms-Text-H1>Budgets</Atoms-Text-H1>

    <Molecules-Section>
      <template v-slot:header>
        <Atoms-Text-H2>Tous tes budgets</Atoms-Text-H2>
      </template>
      <template v-slot:body>
        <Molecules-Liste-Budgets-Gestion
          :budgets="budgets"
        />
      </template>
    </Molecules-Section>

    <Molecules-Section>
      <template v-slot:header>
        <Atoms-Text-H2>Ajouter un budget</Atoms-Text-H2>
      </template>
      <template v-slot:body>
        <Molecules-Form-Ajout-Budget />
      </template>
    </Molecules-Section>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  data() {
    return {
      
    };
  },
  async mounted() {
    
  },
  methods: {
    
  },
  computed: {

    ...mapState({
      budgets: (state) => {
        return state.budgets.budgets;
      },
      cfg: (state) => {
        return state.cfg.cfg;
      }
    }),

  }
}
</script>

<style lang="sass" scoped>

</style>