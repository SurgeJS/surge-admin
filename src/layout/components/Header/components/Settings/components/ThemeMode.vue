<script lang="ts" setup>
import useAppStore from '@/store/modules/app'

const appStore = useAppStore()

const tab = ref('system')

const update = (v: ThemeMode & 'system') => {
  if (v === 'system') {
    appStore.toggleThemeModeFollowingSystem(true)
  } else {
    appStore.toggleThemeModeFollowingSystem(false)
    appStore.toggleThemeMode(v)
  }
}

watch(() => appStore.themeModeFollowingSystem, (isFollow) => {
  tab.value = isFollow ? 'system' : appStore.themeMode
},{ immediate:true })
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
          <icon icon="i-ic:baseline-wb-sunny" />
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
  </n-flex>
</template>

<style lang="scss" scoped>

</style>
