<script lang="ts" setup>
import ConfigMenu from '@/layout/components/Header/components/Settings/components/ContextMenu.vue'
import useAppStore from '@/store/modules/app'
import { ref,watch } from 'vue'

const appStore = useAppStore()
const isDark = ref(appStore.base.themeMode === 'dark')

const onUpdate = (value) => appStore.setThemeMode(value ? 'dark' : 'light')

watch(() => appStore.base.themeMode,() => {
  isDark.value = appStore.base.themeMode === 'dark'
})
</script>

<template>
  <a-divider>
    主题模式
  </a-divider>
  <a-flex gap="middle" vertical>
    <config-menu label="深色主题">
      <a-switch
        v-model:checked="isDark"
        checked-color="#464e62"
        class="themeSwitch"
        unchecked-color="#464e62"
        @change="onUpdate"
      >
        <template #checkedChildren>
          <i-ic:baseline-mode-night class="text-[#4f60fc]" />
        </template>
        <template #unCheckedChildren>
          <i-ic:baseline-wb-sunny class="text-[#ffb948]" />
        </template>
      </a-switch>
    </config-menu>
    <config-menu label="跟随系统">
      <a-switch
        v-model:checked="appStore.base.themeModeFollowSystem"
        checked-color="#464e62"
        class="themeSwitch"
        unchecked-color="#464e62"
      >
        <template #checkedChildren>
          <i-ic:round-hdr-auto />
        </template>
        <template #unCheckedChildren>
          <i-ic:baseline-do-disturb-on />
        </template>
      </a-switch>
    </config-menu>
  </a-flex>
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
