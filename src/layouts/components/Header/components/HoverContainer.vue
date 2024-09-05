<script lang="ts" setup></script>

<template>
  <div class="iconHoverContainer">
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
  flex-shrink: 0;

  &:hover {
    background: theme('colors.fill.secondary');
  }
}
</style>
