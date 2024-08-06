<script setup lang="ts">
import IconHoverContainer from '@/layouts/components/Header/components/IconHoverContainer.vue'
import { ref } from 'vue'
import MenuSearchModal from '@/layouts/components/Header/components/MenuSearch/components/MenuSearchModal.vue'

defineOptions({ name: 'MenuSearch' })
const visible = ref(false)

</script>

<template>
  <icon-hover-container @click="visible= true">
    <icon icon="i-ant-design:search-outlined" />
  </icon-hover-container>
  <menu-search-modal v-model:visible="visible" />
</template>

<style lang="scss" scoped>


</style>
