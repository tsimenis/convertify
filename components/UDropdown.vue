<template>
  <div class="u-dropdown" :class="classes">
    <slot name="button-content" :toggle="toggle">
      <button
        type="button"
        class="button button-toggle"
        @click="toggle"
      >
        <slot name="button">
          Select
        </slot>
      </button>
    </slot>
    <transition name="dropdown-transition">
      <div
        v-show="expanded"
        class="dropdown-container"
      >
        <div class="dropdown-content">
          <slot :toggle="toggle" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        expanded: false
      }
    },
    computed: {
      classes () {
        return [
          { 'is-expanded': this.expanded }
        ]
      }
    },
    watch: {
      expanded (val) {
        if (val) {
          this.$nextTick(() => {
            document.addEventListener('click', this.hide)
          })
          this.$emit('show')
        } else {
          this.$emit('hide')
          document.removeEventListener('click', this.hide)
        }
      }
    },
    methods: {
      toggle (e) {
        e.preventDefault()
        this.expanded = !this.expanded
      },
      hide (e) {
        if (!(this.$el === e.target || this.$el.contains(e.target))) {
          this.expanded = false
        }
      }
    }
  }

</script>

<style lang="scss">

  .u-dropdown {
    @apply relative inline-block;

    .button-toggle {
      @apply bg-transparent font-normal rounded-full py-2;
      min-width: 80px;
      box-shadow: inset 0 0 0 2px theme('colors.gray.200');

      &:hover:not(:disabled) {
        box-shadow: inset 0 0 0 2px theme('colors.gray.600');
      }

    }

    &.is-expanded {
      .button-toggle {
        box-shadow: inset 0 0 0 2px theme('colors.gray.600');
      }
    }

  }

  .dropdown-container {
    @apply absolute left-0 w-full z-40;
    top: 100%;
  }

  .dropdown-content {
    @apply bg-white shadow rounded mt-4 overflow-hidden;
  }

  .dropdown-transition-enter-active, .dropdown-transition-leave-active {
    transition: opacity .15s ease-out, transform .2s ease-out;
  }
  .dropdown-transition-enter, .dropdown-transition-leave-to {
    opacity: 0;
    transform: translateY(.5rem);
  }

</style>
