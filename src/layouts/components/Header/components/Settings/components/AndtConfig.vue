<script lang="ts" setup>
import ContextMenu from '@/layouts/components/Header/components/Settings/components/ContextMenu.vue'
import useAppStore from '@/store/modules/app'

const appStore = useAppStore()

const componentSize = [
  {
    label: 'small',
    value: 'small'
  },
  {
    label: 'medium',
    value: 'medium'
  },
  {
    label: 'large',
    value: 'large'
  }
]

const { antdConfig } = appStore
</script>

<template>
  <a-divider>
    Antd 组件库配置
  </a-divider>
  <a-flex gap="middle" vertical>
    <context-menu label="组件尺寸">
      <a-select v-model:value="antdConfig.size" style="width: 120px">
        <a-select-option
          v-for="item in componentSize"
          :key="item.value"
          :value="item.value"
        >
          {{ item.label }}
        </a-select-option>
      </a-select>
    </context-menu>
  </a-flex>
</template>

<style scoped>

</style>
