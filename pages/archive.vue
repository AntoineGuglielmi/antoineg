<template>
  <div>
    
    <Atoms-Text-H1>Archiver</Atoms-Text-H1>

    <Molecules-Section>
      <template v-slot:header>
        <Atoms-Text-H2>Archiver les budgets et les dépenses</Atoms-Text-H2>
      </template>
      <template v-slot:body>
        
        <button
          class="button--regular button--bleu"
          @click="save"
        >
          Sauvegarder
        </button>

        <Molecules-Archive
          v-for="archive in archives"
          :key="archive.id"
          :archive="archive"
        />

      </template>
    </Molecules-Section>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {

  created() {
    this.$store.dispatch('archives/getArchives');
  },

  computed: {
    ...mapState({
      budgets(state) {
        return state.budgets.budgets;
      },
      archives(state) {
        return state.archives.archives;
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
      return saving * 1;
      // return this.$numbers.format(saving, {style: 'currency'})
    },

    details() {
      const ins = [];
      const outs = [];

      this.budgets.forEach(budget => {
        if(!budget.saving) {
          if(budget.flux === 'Crédit') {
            ins.push({
              budget,
            });
          } else {
            outs.push({
              budget,
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

      return {
        ins,
        outs
      };
    }
  },

  methods: {

    ...mapActions({
      storeCreateArchive: 'archives/createArchive',
    }),

    async save() {
      const archiveDate = (new Date()).getTime();
      const saving = this.saving;
      const details = this.details;

      const data = this.$misc.makeData({
        archiveDate,
        saving,
        details: JSON.stringify(details, null, 4)
      });

      await this.storeCreateArchive(data);
    }
  }
}
</script>

<style lang="sass" scoped>

</style>