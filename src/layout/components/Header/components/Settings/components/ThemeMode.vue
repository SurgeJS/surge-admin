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
onMounted(() => {
  console.log(appStore)
  tab.value = appStore.themeModeFollowingSystem ? 'system' : appStore.themeMode
  console.log(appStore.themeModeFollowingSystem)
})
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
      <n-tab-pane name="light" tab="第一章">
        <template #tab>
          <icon icon="i-ic:baseline-wb-sunny" />
        </template>
      </n-tab-pane>
      <n-tab-pane name="dark" tab="第二章">
        <template #tab>
          <icon icon="i-ic:sharp-dark-mode" />
        </template>
      </n-tab-pane>
      <n-tab-pane name="system" tab="第三章">
        <template #tab>
          <icon icon="i-ic:round-hdr-auto" />
        </template>
      </n-tab-pane>
    </n-tabs>
  </n-flex>
</template>

<style lang="scss" scoped>
.themeSwitch {
  background: #464e62;

  &:hover {
    background: #464e62;
  }

  &.ant-switch-checked {
    background: #464e62;

    &:hover {
      background: #464e62;
    }
  }

  :deep(.ant-switch-inner-checked), :deep(.ant-switch-inner-unchecked) {
    display: flex;
    align-items: center;
    height: 100%;
  }
}
</style>
