<template>
  <Molecules-Section>
    <template v-slot:header>
      <Atoms-Text-H2>Les dépenses de ce budget</Atoms-Text-H2>
    </template>
    <template v-slot:body>
      <Molecules-Budget-Costs-List
        :budget="budget"
      />
      <!-- <pre>{{ costs }}</pre> -->
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