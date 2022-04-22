<template>
  <div class="budget__limit"
    :style="styles"
  >
    <!-- <Atoms-Icons-Google-Icon>
      front_hand
    </Atoms-Icons-Google-Icon> -->
    <Atoms-Icons-Limit />
    <p>{{ limit }}</p>
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
        color: !!(this.budget.limit * 1) ? 'inherit' : '#dddddd'
      }
    },
    limit() {
      return this.$numbers.format(this.budget.limit,{style: 'currency'});
    }
  }
}
</script>

<style lang="sass" scoped>
.budget__limit
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  width: 60px

  p
    margin: 0
</style>