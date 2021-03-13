<template>
  <span class="u-svg" :class="`u-svg-${name}`" v-html="url"></span>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        required: true,
        default: ''
      }
    },
    computed: {
      url () {
        try {
          return require(`@/assets/svg/${this.name}.svg?inline`)
        } catch (e) {
          // console.log('SVG ICON ERROR: ', e)
          return `<small class='svg-error'><i title='Cannot find file: ${this.name}.svg'>error &times</i></small>`
        }
      }
    }
  }

</script>

<style lang="scss">

  .u-svg {
    display: inline-block;

    svg {
      display: block;
      width: auto;
      height: 100%;
    }

    .svg-error {
      font-size: 0.75em;
      color: red;
      border: 1px solid;
      padding: 5px;
      cursor: help;
    }

  }

</style>
