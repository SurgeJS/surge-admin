<script lang="ts" setup>
import useAppStore from '@/store/modules/app'
import ContextMenu from '@/layout/components/Header/components/Settings/components/ContextMenu.vue'

const appStore = useAppStore()

const tab = ref('system')

const update = (v: ThemeMode & 'system') => {
  if (v === 'system') {
    appStore.toggleThemeModeFollowingSystem(true)
  } else {
    appStore.toggleThemeMode(v)
  }
}

const railStyle = ({ focused, checked }) => {
  return { background :'#222330' }
}
</script>

<template>
  <n-divider>
    主题模式
  </n-divider>
  <n-flex>
    <n-tabs
      v-model:value="tab"
      type="segment"
      animated
      @update:value="update"
    >
      <n-tab-pane name="light">
        <template #tab>
          <icon class="text-primary" icon="i-ic:baseline-wb-sunny" />
        </template>
      </n-tab-pane>
      <n-tab-pane name="dark">
        <template #tab>
          <icon icon="i-ic:sharp-dark-mode" />
        </template>
      </n-tab-pane>
      <n-tab-pane name="system">
        <template #tab>
          <icon icon="i-ic:round-hdr-auto" />
        </template>
      </n-tab-pane>
    </n-tabs>
    <context-menu label="跟随系统">
      <n-switch :rail-style="railStyle" size="large">
        <template #checked-icon>
          <icon class="text-primary" icon="i-ic:round-hdr-auto" />
        </template>
        <template #unchecked-icon>
          <icon icon="i-ic:baseline-minus" />
        </template>
      </n-switch>
    </context-menu>
  </n-flex>
</template>

<style lang="scss" scoped>

</style>
