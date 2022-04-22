<template>
  <span class="google-icon material-icons-round"><slot></slot></span>
</template>

<script>
export default {
  
}
</script>

<style lang="sass" scoped>
.google-icon
  font-size: inherit
  // color: inherit
  display: block

  &.cold,
  &.credit
    color: $vert
  &.medium
    color: $orange
  &.hot,
  &.debit
    color: $rouge
</style>