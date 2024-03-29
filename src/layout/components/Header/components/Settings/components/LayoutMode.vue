<script lang="ts" setup>
import useAppStore from '@/store/modules/app'
import LayoutCard from '@/layout/components/Header/components/Settings/components/LayoutCard.vue'

const layoutModeList: LayoutModeOption[] = [
    {
        value: 'side',
        label: '侧边菜单模式'
    },
    {
        value: 'mix-side',
        label: '侧边菜单混合模式'
    },
    {
        value: 'top',
        label: '顶部菜单模式'
    }
]
const appStore = useAppStore()
const { base } = appStore
</script>

<template>
  <a-divider>
    布局模式
  </a-divider>
  <div class="layoutMode">
    <layout-card
      v-for="item in layoutModeList"
      :key="item.value"
      :active="item.value === base.layoutMode"
      :popover-content="item.label"
      @click-card="base.layoutMode = item.value"
    >
      <div v-if="item.value === 'side'" class="vertical">
        <div class="side" />
        <div class="container">
          <div class="header" />
          <div class="main" />
        </div>
      </div>
      <div v-if="item.value === 'mix-side'" class="vertical">
        <div class="mixSide">
          <div />
          <div />
        </div>
        <div class="container">
          <div class="header" />
          <div class="main" />
        </div>
      </div>
      <div v-if="item.value === 'top'" class="horizontal">
        <div class="header primary" />
        <div class="main" />
      </div>
    </layout-card>
  </div>
</template>

<style lang="scss" scoped>
.layoutMode {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  justify-items: center;
  gap: 20px 0;

  .vertical {
    display: flex;
    height: 100%;
    gap: 3px;
  }

  .horizontal {
    display: flex;
    height: 100%;
    flex-direction: column;
    gap: 3px;
  }

  .header,
  .side,
  .mixSide,
  .main {
    border-radius: 2px;
    background: theme('colors.primary-shallow');
  }

  .header {
    height: 10px;
    background: theme('colors.primary-shallow');
  }

  .primary {
    background: theme('colors.primary');
  }

  .side {
    width: 13px;
    height: 100%;
    background: theme('colors.primary');
  }

  .mixSide {
    width: 13px;
    height: 100%;
    display: flex;

    div:first-of-type {
      width: 6px;
      height: 100%;
      background: theme('colors.primary');
      border-radius: 3px;
    }

    div:last-of-type {
      background: theme('colors.primary-shallow');
      width: 10px;
      height: 100%;
    }
  }

  .container {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .main {
    flex: 1;
  }
}
</style>
