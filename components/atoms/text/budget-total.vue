<template>
  <div class="budget__total"
    :style="styles"
  >
    <Atoms-Icons-Google-Icon>
      donut_small
    </Atoms-Icons-Google-Icon>
    <p>{{ budget.total }}€</p>
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
        color: this.budget.limit ? (this.budget.total >= this.budget.limit ? 'red' : 'lime') : 'inherit'
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.budget__total
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
</style>