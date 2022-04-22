<template>
  <nav id="nav__main">
    <div class="container maxw">
      <div id="nav__content">

        <p id="nav__today" v-if="displayDate">{{ today }}</p>

        <ul id="nav__links">
          <li
            class="nav__link"
            v-for="link in links"
            :key="link.id"
          >

            <NuxtLink
              :to="link.href"
            >
              <Atoms-Icons-Google-Icon>{{ link.google_icon }}</Atoms-Icons-Google-Icon>
            </NuxtLink>

          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
export default {
  // data() {
  //   return {
  //     // links: []
  //   }
  // },
  computed: {
    ...mapState({
      links: (state) => {
        return state.navLinks.navLinks;
      },
      displayDate(state) {
        return state.cfg.display_date_in_footer;
      }
    }),
    today() {
      return this.$strings.ucfirst(this.$dates.today());
    }
  },
  // async mounted() {
  //   // this.links = await this.$axios.$get('/api/all/nav_links');
  // }
}
</script>

<style lang="sass" scoped>
$navPadding: 0.75rem
#nav__main
  position: fixed
  bottom: 0
  left: 0
  right: 0
  background-color: $dark

  #nav__content
    display: flex
    flex-direction: column
    gap: $navPadding
    padding: $navPadding 0

    #nav__today
      text-align: center
      color: $blanc
      margin: 0
    
    #nav__links
      display: flex
      align-items: center
      justify-content: center
      gap: 1rem

      .nav__link
        a
          font-size: 1.25rem
          color: $blanc
          display: block

          &.nuxt-link-active,
          &.nuxt-link-exact-active
            color: $bleu
</style>