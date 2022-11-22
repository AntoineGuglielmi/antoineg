<template>
  <div>
    {{ archiveDate }}
  </div>
</template>

<script>
export default {
  props: {
    archive: {
      type: Object,
      default: null
    }
  },

  computed: {
    archiveDate() {
      const arcDate = new Date(this.archive.archiveDate * 1);
      let template = 'Le {jjj} {jj}/{mm}/{aaaa}, à {hh}h{min}m';
      const values = {
        jjj: arcDate.toLocaleDateString('fr-FR', {weekday: 'long'}),
        jj: this.leading0(arcDate.getDate()),
        mm: this.leading0(arcDate.getMonth() + 1),
        aaaa: arcDate.getFullYear(),
        hh: this.leading0(arcDate.getHours()),
        min: this.leading0(arcDate.getMinutes())
      }
      console.log(values)
      for(const[k,v] of Object.entries(values)) {
        template = template.replace(`{${k}}`,v);
      }
      return template;
    }
  },

  methods: {
    leading0(num, digits = 2) {
      return String(num).padStart(digits, '0');
    }
  }
}
</script>

<style lang="sass" scoped>

</style>