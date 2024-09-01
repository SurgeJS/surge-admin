<script setup lang="ts">
import IconHoverContainer from '@/layouts/components/Header/components/HoverContainer.vue'
import MenuSearchModal from '@/layouts/components/Header/components/MenuSearch/components/MenuSearchModal.vue'

defineOptions({ name: 'MenuSearch' })
const [ visible, setVisible ] = useToggle()
</script>

<template>
  <icon-hover-container @click="setVisible(true)">
    <icon icon="i-ant-design:search-outlined" />
  </icon-hover-container>
  <menu-search-modal v-model:visible="visible" />
</template>

<style lang="scss" scoped>


</style>
