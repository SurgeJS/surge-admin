<script lang="ts" setup>
import useAppStore from '@/store/modules/app'
import ContextMenu from '@/layout/components/Header/components/Settings/components/ContextMenu.vue'

const appStore = useAppStore()

const updateFollowingSystem = (value: boolean) => {
  appStore.toggleThemeModeFollowingSystem(value)
}

const updateThemeMode = (mode: ThemeMode) => {
  appStore.toggleThemeMode(mode)
}

const railStyle = () => {
  return { background: '#464e62' }
}
</script>

<template>
  <n-divider>
    主题模式
  </n-divider>
  <n-flex>
    <context-menu label="主题模式">
      <n-switch
        :value="appStore.themeMode"
        class="transition"
        checked-value="dark"
        unchecked-value="light"
        :rail-style="railStyle"
        @update:value="updateThemeMode"
      >
        <template #checked>
          <icon
            color="#4f60fc"
            size="18px"
            icon="i-ic:sharp-dark-mode"
          />
        </template>
        <template #unchecked>
          <icon
            color="#ffb948"
            size="18px"
            icon="i-ic:baseline-wb-sunny"
          />
        </template>
      </n-switch>
    </context-menu>
    <context-menu label="跟随系统">
      <n-switch
        class="transition"
        :value="appStore.themeModeFollowingSystem"
        :rail-style="railStyle"
        @update:value="updateFollowingSystem"
      >
        <template #checked>
          <icon
            color="white"
            size="18px"
            icon="i-ic:round-hdr-auto"
          />
        </template>
        <template #unchecked>
          <icon
            color="white"
            size="18px"
            icon="i-ic:baseline-minus"
          />
        </template>
      </n-switch>
    </context-menu>
  </n-flex>
</template>

<style lang="scss" scoped>

</style>
