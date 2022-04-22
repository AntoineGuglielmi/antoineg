<template>
  <div id="page__main">

    <div class="container maxw">
      <Nuxt />
    </div>

    <Molecules-Nav/>

  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="sass" scoped>
#page__main
  background-color: $blanc
  color: $noir
  min-height: 100vh
  padding-bottom: 5rem
</style>