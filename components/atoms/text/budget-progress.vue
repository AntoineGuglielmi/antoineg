<template>
  <div class="budget__progress"
      :style="styles"
    >
    <Atoms-Icons-Google-Icon>
      show_chart
    </Atoms-Icons-Google-Icon>
    <p>{{ text }}</p>
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
    styles() {
      return {
        color: this.budget.progress ? 'inherit' : '#dddddd'
      }
    },
    text() {
      return this.budget.progress ? `${this.budget.progress}%` : '';
    }
  }
}
</script>

<style lang="sass" scoped>
.budget__progress
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
</style>