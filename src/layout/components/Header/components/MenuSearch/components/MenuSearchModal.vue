<script lang="ts" setup>
import { useEventListener,useVModel } from '@vueuse/core'
import { onMounted,ref,watch } from 'vue'
import useAuthStore from '@/store/modules/auth'
import { useRouter } from 'vue-router'

interface Props {
  // 可见
  visible: boolean
}

interface MenuSearchOption {
  labels: string[]

  path: string

  icon?: string
}

interface Emits {
  (e: 'update:visible',isShow: boolean): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const visible = useVModel(props,'visible',emits)
const authStore = useAuthStore()
const router = useRouter()

const menus = ref<MenuSearchOption[]>([])
const searchText = ref('')
const searchResult = ref<MenuSearchOption[]>([])
const active = ref(0)

const menuSearchKeyPrompt = [
  {
    icons: [ IIcBaselineSubdirectoryArrowLeft ],
    prompt: '选择'
  },
  {
    icons: [ IIcBaselineArrowUpward,IIcBaselineArrowDownward ],
    prompt: '切换'
  }
]

// 扁平化菜单
const flattenMenu = (menus: Route.RouteRecordRaw[]): MenuSearchOption[] => {
  const menuList: MenuSearchOption[] = []
  const handle = (menus: Route.RouteRecordRaw[],iconName?: string | undefined,menuNameList?: string[]) => {
    menus.forEach(menu => {
      const icon = iconName || menu.meta?.icon
      const menuNames = menuNameList || []
      if (!menu.children?.length) {
        menuList.push({
          icon: icon as string,
          labels: [ ...menuNames,menu.meta?.title as string ],
          path: menu.path as string
        })
      } else {
        menuNames.push(menu.meta?.title as string)
        handle(menu.children,icon,menuNames)
      }
    })
  }
  handle(menus)
  return menuList
}

// 处理键盘事件
const handleKeyboardEvents = (event: KeyboardEvent) => {
  if (!visible.value) return
  const length = searchResult.value.length
  const menu = searchResult.value[active.value]
  if (!length) return
  switch (event.code) {
    case 'ArrowUp':
      active.value === 0 ? (active.value = length - 1) : (active.value -= 1)
      break
    case 'ArrowDown':
      active.value === length - 1 ? (active.value = 0) : (active.value += 1)
      break
    case 'Enter':
      if (menu) {
        router.push(menu.path)
        visible.value = false
      }
      break
  }
}

const handleMenuClick = (path: string,i: number) => {
  router.push(path)
  visible.value = false
  active.value = i
}

onMounted(() => {
  menus.value = flattenMenu(authStore.routes as Route.RouteRecordRaw[])
  useEventListener(window,'keyup',handleKeyboardEvents)
})

watch(searchText,(value) => {
  searchResult.value = menus.value.filter(item => item.labels.some(name => value && name.includes(value)))
})
</script>

<template>
  <a-modal
    v-model:open="visible"
    :align-center="false"
    :closable="false"
    title-align="start"
    width="630px"
  >
    <a-flex gap="middle" vertical>
      <a-input
        v-model:value="searchText"
        autofocus
        placeholder="请输入你想搜索的菜单"
        size="large"
      >
        <template #suffix>
          <i-antd:search-outlined />
        </template>
      </a-input>
      <div class="menuSearchModal">
        <div
          v-for="(item,i) in searchResult"
          :key="item.path"
          :class="{active:active===i}"
          class="menuSearchModal-card"
          size="small"
          @click="handleMenuClick(item.path,i)"
        >
          <div class="menuSearchModal-card-name">
            <svg-icon :icon="item.icon" />
            <span v-for="(label,index) in item.labels" :key="label">{{ label }}
              <i-antd:right-outlined v-if="index!==item.labels.length-1" class="text-xs" />
            </span>
          </div>
          <i-ic:outline-subdirectory-arrow-left />
        </div>
      </div>
    </a-flex>
    <template #footer>
      <div class="menuSearchModal-footer">
        <div class="menuSearchModal-footer-prompt">
          <div
            v-for="item in menuSearchKeyPrompt"
            :key="item.prompt"
            class="menuSearchModal-footer-prompt-key"
          >
            <component
              :is="icon"
              v-for="icon in item.icons"
              :key="icon"
              class="menuSearchModal-footer-prompt-key-icon"
            />
            {{ item.prompt }}
          </div>
        </div>
      </div>
    </template>
  </a-modal>
</template>

<style lang="scss" scoped>
.menuSearchModal {
  max-height: 500px;
  overflow: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &-card {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    gap: 15px;
    padding: 15px;
    border-radius: theme('borderRadius.md');
    border: 1px solid theme('borderColor.secondary');

    &.active {
      background: theme('colors.primary');
      color: white;

      //:deep(.arco-card-body) {
      //  color: white;
      //}

      box-shadow: 5px 5px 5px theme('colors.primary-shallow');
    }


    svg {
      flex-shrink: 0;
    }

    &-name {
      display: flex;
      align-items: center;
      gap: 15px;

      span {
        display: flex;
        align-items: center;
        gap: 15px;
      }
    }
  }

  &-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-prompt {
      display: flex;
      align-items: center;
      gap: 20px;

      &-key {
        display: flex;
        align-items: center;
        gap: 5px;

        &-icon {
          box-shadow: inset 0 -2px #cdcde6, inset 0 0 1px 1px #fff,
          0 1px 2px 1px #1e235a66;
        }
      }
    }
  }
}
</style>
