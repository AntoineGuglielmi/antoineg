<template>
  <h2 :class="{before}"><slot></slot></h2>
</template>

<script>
export default {
  props: {
    titre: {
      type: String,
      default: 'Donner un titre au H2 dans le slot'
    },
    before: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="sass" scoped>
$h2: 1.5rem
$color: lighten($noir,30%)
h2
  font-size: $h2
  font-weight: 600
  color: $color
  margin-bottom: 1rem

  &.before::before
    height: 1px
    display: block
    content: ""
    background-color: rgba($color,0.5)
    margin-bottom: 0.5rem
</style>