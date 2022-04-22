<template>
  <div id="details__ins">
    <ul id="ins__main">
      <li
        class="ins_self detail"
        v-for="(inSelf, index) in ins"
        :key="index"
      >

        <div class="budget__name">
          <Nuxt-Link
            :to="{name: 'budgets-budgetId', params: {budgetId: inSelf.budget.id}}"
          >{{ inSelf.budget.name }}</Nuxt-Link>
        </div>

        <ul class="budget__total_costs">
          <li class="budget__total">{{ signe }}{{ $numbers.format(inSelf.budget.total, {style: 'currency'}) }}</li>
          <li
            class="budget__cost"
            v-for="(cost, index) in inSelf.budget.costs"
            :key="cost.id"
          >
            <Nuxt-Link
              :to="{
                name: 'costs-costId',
                params: {
                  costId: cost.id
                }
              }"
            >{{ index > 0 ? signe : '' }}{{ $numbers.format(cost.amount, {style: 'currency'}) }}</Nuxt-Link>
          </li>
        </ul>

        <div class="detail__savingAmount" :class="{'align-self-end': inSelf.budget.costs.length > 0}">
          {{ $numbers.format(inSelf.savingAmount, {style: 'currency'}) }}
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      types: {
        in: '+ ',
        out: '- '
      }
    }
  },
  props: {
    ins: {
      type: Array
    },
    inout: {
      type: String
    }
  },
  computed: {
    signe() {
      return this.types[this.inout];
    }
  }
}
</script>

<style lang="sass" scoped>
#details__ins
  #ins__main
    display: flex
    flex-direction: column
    gap: 0.5rem

    .detail
      background-color: $bleu-clair
      border-radius: 0.25rem
      display: flex
      gap: 0.5rem
      padding: 0.5rem
      align-items: center

      .budget__name
        // align-self: center
        text-decoration: underline
      
      .budget__total_costs
        margin-left: auto
        flex-shrink: 0
        text-align: right

        .budget__cost
          color: $bleu
          font-size: 0.75rem
          text-decoration: underline
      
      .detail__savingAmount
        // margin-left: auto
        margin-left: 2rem
        flex-shrink: 0
        font-size: 0.75rem
        color: $bleu

        &.align-self-end
          align-self: flex-end
</style>