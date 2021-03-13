<template>
  <span class="u-icon" :class="classes" v-html="url"></span>
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
      classes () {
        const classes = [`icon-${this.name}`]
        return classes.join(' ')
      },
      url () {
        try {
          return require(`@/assets/svg/icons/${this.name}.svg?inline`)
        } catch (e) {
          console.log('SVG ICON ERROR: ', e)
          return `<small class='icon-error'><i title='Cannot find file: ${this.name}.svg'>error &times</i></small>`
        }
      }
    }
  }

</script>

<style lang="scss">

  .u-icon {
    display: inline-block;
    color: currentColor;

    svg {
      width: 1em;
      height: 1em;
      display: block;
    }

    svg path {
      fill: currentColor;
    }

    .icon-error {
      font-size: 0.75em;
      color: red;
      border: 1px solid;
      padding: 5px;
      cursor: help;
    }

  }

</style>
