<template>
  <Molecules-Section>
    <template v-slot:header>
      <Atoms-Text-H2>Informations du budget</Atoms-Text-H2>
    </template>
    <template v-slot:body>
      <Molecules-Form-Budget-Infos
        :budget="budget"
        @mustUpdate="$emit('mustUpdate',$event)"
        @redirect="$emit('redirect')"
      />
    </template>
  </Molecules-Section>
</template>

<script>
export default {
  props: {
    budget: {
      type: Object
    }
  }
}
</script>

<style lang="sass" scoped>

</style>