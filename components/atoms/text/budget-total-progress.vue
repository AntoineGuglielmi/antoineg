<template>
  <div class="budget__total">
    <!-- <Atoms-Icons-Google-Icon
      :class="classes"
    >
      donut_small
    </Atoms-Icons-Google-Icon> -->
    <Atoms-Icons-Chart
      :class="classes"
    />
    <p>{{ total }}</p>
    <p v-if="budget.limit">{{ progress }}</p>
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
    progress() {
      return this.$numbers.format(this.budget.progress,{
        style: 'percent',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      });
    },
    classes() {
      return {
        cold: this.budget.limit && this.budget.progress < 0.33,
        medium: this.budget.limit && this.budget.progress >= 0.33 && this.budget.progress < 0.66,
        hot: this.budget.limit && this.budget.progress >= 0.66
      }
    },
    total() {
      return this.$numbers.format(this.budget.total,{style: 'currency'});
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
  width: 60px
  flex-shrink: 0

  p
    margin: 0
</style>