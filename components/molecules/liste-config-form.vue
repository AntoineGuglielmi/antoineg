<template>
  <div>
    <form @submit.prevent="">
      <div
        class="form__group"
        v-for="config in configs"
        :key="config.id"
      >
        
        <label :for="'field_'+config.name" v-if="config.type === 'text'">
          {{ config.text }}
          <!-- @change="update(config.id, $event)" -->
          <input
            type="text"
            :id="'field_'+config.name"
            :value="config.value"
            @keyup="update(config.id, $event)"
          >
        </label>
        
        <label :for="'field_'+config.name" v-if="config.type === 'number'">
          {{ config.text }}
          <!-- @change="update(config.id, $event)" -->
          <input
            type="number"
            step="1"
            :id="'field_'+config.name"
            :value="config.value"
            @keyup="update(config.id, $event)"
          >
        </label>
        
        <label
          :for="'field_'+config.name"
          v-if="config.type === 'checkbox'"
          class="label__checkbox label__label"
          :class="{ 'label__active': getValue(config) }"
        >
          {{ config.text }}
          <input
            type="checkbox"
            :id="'field_'+config.name"
            v-model="dataConfig[config.name]"
            v-on:change="updateCheckbox(config,$event)"
          >
        </label>
        
        <template v-if="config.type === 'radio'">
          {{ config.text }}
          <div class="form__row">
            <label
              v-for="(radio,index) in radios[config.name]"
              :key="index"
              :for="`field_+${config.name}_${index}`"
              class="label__radio label__label"
              :class="{ 'label__active': dataConfig[config.name] === radio.value }"
            >
              <component :is="radio.text"></component>
              <input
                type="radio"
                :id="`field_+${config.name}_${index}`"
                v-model="dataConfig[config.name]"
                :value="radio.value"
                v-on:change="update(config.id, $event)"
              >
            </label>
          </div>
        </template>

      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return {
      dataConfig: {}
    }
  },
  fetch() {
    this.configs.forEach(config => {
      this.$set(this.dataConfig, config.name, config.value);
    });
  },
  computed: {
    ...mapState({
      configs(state) {
        return state.cfg.cfg;
      }
    }),
    radios() {
      return {
        budget_default_costs_sorting: [
          {value: 'name:asc', text: () => import('@/components/atoms/icons/a-to-z.vue')},
          {value: 'name:desc', text: () => import('@/components/atoms/icons/z-to-a.vue')},
          {value: 'amount:asc', text: () => import('@/components/atoms/icons/small-to-big.vue')},
          {value: 'amount:desc', text: () => import('@/components/atoms/icons/big-to-small.vue')}
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      storeUpdateConfig: 'cfg/updateConfig'
    }),
    async update(id,event) {
      const value = event.target.value;
      const payload = {
        id,
        value
      };
      await this.storeUpdateConfig(payload);
    },
    async updateCheckbox(config,event) {
      this.dataConfig[config.name] = event.target.checked;
      const payload = {
        id: config.id,
        value: event.target.checked
      };
      await this.storeUpdateConfig(payload);
    },
    getValue(config) {
      return !!this.dataConfig[config.name];
    }
  }
}
</script>

<style lang="sass" scoped>
form
  gap: 1rem
</style>