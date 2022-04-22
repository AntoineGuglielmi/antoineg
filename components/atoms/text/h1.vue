<template>
  <h1><slot></slot></h1>
</template>

<script>
export default {
  props: {
    titre: {
      type: String,
      default: 'Donner un titre au H1 dans le slot'
    }
  }
}
</script>

<style lang="sass" scoped>
$h1: 2.5rem
h1
  font-size: $h1
  margin: $h1*1.25 0
  font-weight: 100
  color: $bleu

  select
    font-size: inherit
    color: inherit
    font-family: inherit
    border: none
    display: block
    width: 100%
    background-color: transparent
</style>