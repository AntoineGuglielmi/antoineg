<template>
  <div>
    
    <Atoms-Text-H1>Paramètres</Atoms-Text-H1>

    <Molecules-Section>
      <template v-slot:header>
        <Atoms-Text-H2>Modifier les paramètres</Atoms-Text-H2>
      </template>
      <template v-slot:body>
        <Molecules-Liste-Config-Form />
      </template>
    </Molecules-Section>
    
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="sass" scoped>

</style>