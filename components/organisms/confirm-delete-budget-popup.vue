<template>
  <Organisms-Popup-Modal ref="popup" @cancel="_cancel">
    <Atoms-Text-H2 :before="false">{{ title }}</Atoms-Text-H2>
    <p>{{ message }}</p>
    <div class="btns">
      <!-- <button class="cancel-btn" @click="_cancel">{{ cancelButton }}</button> -->
      <button class="ok-btn" @click="_confirm">{{ okButton }}</button>
    </div>
  </Organisms-Popup-Modal>
</template>

<script>
export default {

  data() {
    return {
      // Parameters that change depending on the type of dialogue
      title: undefined,
      message: undefined, // Main text content
      okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
      cancelButton: 'Annuler', // text for cancel button
      
      // Private variables
      resolvePromise: undefined,
      rejectPromise: undefined,
    }
  },

  methods: {
    show(opts = {}) {
      this.title = opts.title
      this.message = opts.message
      this.okButton = opts.okButton
      if (opts.cancelButton) {
        this.cancelButton = opts.cancelButton
      }
      // Once we set our config, we tell the popup modal to open
      this.$refs.popup.open()
      // Return promise so the caller can get results
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve
        this.rejectPromise = reject
      })
    },

    _confirm() {
      this.$refs.popup.close()
      this.resolvePromise(true)
    },

    _cancel() {
      this.$refs.popup.close()
      this.resolvePromise(false)
      // Or you can throw an error
      // this.rejectPromise(new Error('User cancelled the dialogue'))
    },
  },
}
</script>

<style lang="sass" scoped>
.btns
    display: flex
    flex-direction: row
    justify-content: flex-end

.ok-btn
    // color: red
    // text-decoration: underline
    // line-height: 2.5rem
    cursor: pointer
    font-size: inherit
    color: inherit
    font-family: inherit
    border: none
    background-color: $rouge-clair
    color: $rouge-fonce
    padding: 0.5rem
    border-radius: 0.25rem

.cancel-btn
    // padding: 0.5em 1em
    // background-color: #d5eae7
    // color: #35907f
    // border: 2px solid #0ec5a4
    // border-radius: 5px
    // font-weight: bold
    // font-size: 16px
    // text-transform: uppercase
    // cursor: pointer
</style>