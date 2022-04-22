<template>
  <div class="cost">
    <Nuxt-Link
      class="cost__name"
      :to="{
        name: 'costs-costId',
        params: {
          costId: cost.id
        }
      }"
    >
      {{ cost.name }}
    </Nuxt-Link>

    <p class="cost__amount">
      {{ amount }}
    </p>

    <div class="cost__actions">

      <Nuxt-Link
        class="cost__duplicate button--regular"
        :to="{
          name: 'costs-duplicate-costId',
          params: {
            costId: cost.id
          }
        }"
      ><Atoms-Icons-Google-Icon>content_copy</Atoms-Icons-Google-Icon></Nuxt-Link>

      <button
        class="cost__delete button--regular"
        @click="deleteCost($event,cost)"
        v-if="deleteButton"
      ><Atoms-Icons-Google-Icon>delete</Atoms-Icons-Google-Icon></button>
      
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    cost: {
      type: Object
    },
    deleteButton: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    amount() {
      return this.$numbers.format(this.cost.amount, {style: 'currency'});
    }
  },
  methods: {
    deleteCost(event,cost) {
      this.$emit('delete-cost',event,cost)
      // const ok = await this.$refs.confirmDialogue.show({
      //   title: `Suppression de la dépense ${this.cost.name}`,
      //   message: 'On supprime cette dépense ? Cette opération est irréversible.',
      //   okButton: 'Supprimer',
      // })
      // if(ok) {
      //   await this.storeDeleteCost(this.cost.id);
      // }
    },
    duplicateCost() {

    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/styles/imports/_15_functions.scss'
.cost
  display: flex
  gap: 0.5rem
  align-items: center
  background-color: $bleu-clair
  border-radius: 0.25rem

  .cost__name
    text-decoration: underline
    padding: 0.75rem

  .cost__amount
    margin: 0
    margin-left: auto
    flex-shrink: 0

  .cost__actions
    flex-shrink: 0
    display: flex
    align-items: center
  
    .cost__delete,
    .cost__duplicate
      height: 40px
      width: 40px
      border: none
      font-size: 1.35rem
      background-color: transparent
      display: flex
      align-items: center
      
    .cost__delete
      color: color(rouge,clair)
      
    .cost__duplicate
      color: color(noir,gris-fonce)
</style>