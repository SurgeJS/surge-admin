<script lang="ts" setup>
import useAppStore from '@/store/modules/app'

const appStore = useAppStore()
</script>

<template>
  <div :class="appStore.dynamicTopDark.className" class="iconHoverContainer">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.iconHoverContainer {
  border-radius: theme('borderRadius.md');
  padding: 7px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: .1s;
  font-size: 16px;

  &:hover {
    background: theme('colors.fill-tertiary');
  }

  &.dark {
    &:hover {
      background-color: theme('colors.fill-dark');
    }
  }
}
</style>
