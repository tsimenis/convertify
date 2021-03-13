<template>
  <u-dropdown class="currency-select">
    <template #button-content="slotProps">
      <button class="currency-select-button" @click="handleButtonToggle($event, slotProps)">
        <span>EUR - Euro</span>
        <div>
          <span>flag</span>
          <span class="text-lg text-gray-400">
            <u-icon name="angle-down" />
          </span>
        </div>
      </button>
    </template>
    <template #default>
      <div class="currencies pt-2">
        <div class="px-6 mb-2">
          <div class="relative">
            <span class="search-icon absolute left-0 top-0 text-gray-200">
              <u-icon name="search" />
            </span>
            <input
              ref="search"
              type="text"
              class="w-full focus:outline-none px-6 py-2 text-sm"
              placeholder="Search currency"
            >
          </div>
        </div>
        <ul class="currencies-list h-80 overflow-y-auto">
          <li class="flex justify-between px-6 py-4 hover:bg-gray-100">
            <div>
              <span>flag</span>
              <span>name</span>
            </div>
            <span>
              code
            </span>
          </li>
          <li class="flex justify-between px-6 py-4 hover:bg-gray-100">
            <div>
              <span>flag</span>
              <span>name</span>
            </div>
            <span>
              code
            </span>
          </li>
          <li class="flex justify-between px-6 py-4 hover:bg-gray-100">
            <div>
              <span>flag</span>
              <span>name</span>
            </div>
            <span>
              code
            </span>
          </li>
          <li class="flex justify-between px-6 py-4 hover:bg-gray-100">
            <div>
              <span>flag</span>
              <span>name</span>
            </div>
            <span>
              code
            </span>
          </li>
          <li class="flex justify-between px-6 py-4 hover:bg-gray-100">
            <div>
              <span>flag</span>
              <span>name</span>
            </div>
            <span>
              code
            </span>
          </li>
          <li class="flex justify-between px-6 py-4 hover:bg-gray-100">
            <div>
              <span>flag</span>
              <span>name</span>
            </div>
            <span>
              code
            </span>
          </li>
          <li class="flex justify-between px-6 py-4 hover:bg-gray-100">
            <div>
              <span>flag</span>
              <span>name</span>
            </div>
            <span>
              code
            </span>
          </li>
          <li class="flex justify-between px-6 py-4 hover:bg-gray-100">
            <div>
              <span>flag</span>
              <span>name</span>
            </div>
            <span>
              code
            </span>
          </li>
          <li class="flex justify-between px-6 py-4 hover:bg-gray-100">
            <div>
              <span>flag</span>
              <span>name</span>
            </div>
            <span>
              code
            </span>
          </li>
          <li class="flex justify-between px-6 py-4 hover:bg-gray-100">
            <div>
              <span>flag</span>
              <span>name</span>
            </div>
            <span>
              code
            </span>
          </li>
          <li class="flex justify-between px-6 py-4 hover:bg-gray-100">
            <div>
              <span>flag</span>
              <span>name</span>
            </div>
            <span>
              code
            </span>
          </li>
          <li class="flex justify-between px-6 py-4 hover:bg-gray-100">
            <div>
              <span>flag</span>
              <span>name</span>
            </div>
            <span>
              code
            </span>
          </li>
        </ul>
      </div>
    </template>
  </u-dropdown>
</template>

<script>

  import UDropdown from '@/components/UDropdown'

  export default {
    components: {
      UDropdown
    },
    methods: {
      handleButtonToggle (e, slotProps) {
        slotProps.toggle(e)
        this.$nextTick(() => {
          this.$refs.search.focus()
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

  .currency-select {
    @apply block;

    &.is-expanded {
      .icon-angle-down {
        transform: rotate(180deg);
      }
    }

  }

  .currency-select-button {
    @apply w-full flex justify-between pb-4 border-b border-gray-200;

    &:focus {
      @apply outline-none;
    }

  }

  .search-icon {
    top: 50%;
    transform: translateY(-50%);
  }

</style>
