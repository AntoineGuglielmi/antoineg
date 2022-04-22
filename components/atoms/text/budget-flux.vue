<template>
  <div class="budget__flux">
    <!-- <Atoms-Icons-Google-Icon
      :class="classes"
    >
      sync_alt
    </Atoms-Icons-Google-Icon> -->
    <Atoms-Icons-Flow
      :class="classes"
    />
    <!-- <p>{{ budget.flux }}</p> -->
  </div>
</template>

<script>
export default {
  props: {
    budget: {
      type: Object,
      default: {}
    }
  },
  computed: {
    iconName() {
      return this.budget.flux === 'Débit' ? 'output' : 'exit_to_app';
    },
    classes() {
      return {
        debit: this.budget.flux === 'Débit',
        credit: this.budget.flux === 'Crédit'
      };
    }
  }
}
</script>

<style lang="sass" scoped>
.budget__flux
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  width: 60px

  p
    margin: 0
</style>