<template>
  <section>
    <header v-if="header" class="section__header">
      <slot name="header"></slot>
    </header>
    <div v-if="body" class="section__body">
      <slot name="body"></slot>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    header() {
      return !!this.$slots.header;
    },
    body() {
      return !!this.$slots.body;
    }
  }
}
</script>

<style lang="sass" scoped>
section
  margin: 2.5rem 0 5rem
</style>