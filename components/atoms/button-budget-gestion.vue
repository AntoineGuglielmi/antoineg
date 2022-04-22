<template>
  <button
    :class="classes"
    @click="emitAction(budget)"
  ><Atoms-Icons-Google-Icon>{{ googleIcon }}</Atoms-Icons-Google-Icon></button>
</template>

<script>
export default {
  data() {
    return {
      actions: {
        down: 'expand_more',
        up: 'expand_less',
        delete: 'delete'
      }
    }
  },
  props: {
    action: {
      type: String,
      default: ''
    },
    budget: {
      type: Object,
      default: {}
    }
  },
  computed: {
    googleIcon() {
      return this.actions[this.action];
    },
    classes() {
      return {
        action__delete: this.action === 'delete'
      }
    }
  },
  methods: {
    emitAction(budget) {
      this.$emit(this.action,budget);
    }
  }
}
</script>

<style lang="sass" scoped>
button
  font-size: inherit
  color: inherit
  border: none
  background-color: transparent
  // padding: 0.5em
  font-size: 1.35rem
  width: 40px

  &.action__delete
    color: $rouge-clair
    background-color: $rouge-clair2
</style>