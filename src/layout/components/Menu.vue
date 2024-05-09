<script lang="tsx">
import { defineComponent,PropType } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import useAppStore from '@/store/modules/app'

export default defineComponent({
  props: {
    menus: {
      type: Array as PropType<AppRouteRecordRaw[]>,
      required: true
    },
    horizontal: Boolean,
    collapsed: Boolean,
    dark: Boolean
  },
  setup(props) {
    const route = useRoute()
    const { sidebar } = useAppStore()
    const router = useRouter()
    const renderSubMenu = (menus: AppRouteRecordRaw[]) => {
      return menus.map(item => {
        if (item.meta?.hideMenu) return
        const icon = () => item.meta?.icon ?
                           (<svg-icon icon={ item.meta?.icon }></svg-icon>) :
                           undefined
        if (item.component === 'submenu' || item.component === 'menu') {
          return (
            <a-menu-item disabled={ item.meta?.disabledMenu } onClick={ () => router.push(item.path) }
                         key={ item.path }
                         v-slots={ { icon } }>
              { item.meta?.title }
            </a-menu-item>
          )
        }

        if (item.component === 'basic' || item.component === 'directory') {
          return (
            <a-sub-menu v-slots={ { icon,title: () => item.meta?.title } }
                        key={ item.path }>
              { item.children?.length && renderSubMenu(item.children) }
            </a-sub-menu>
          )
        }
      }).filter(item => item)
    }

    return () => (
      <a-menu theme={ props.dark ? 'dark' : 'light' }
              selected-keys={ [ route.path ] }
              inline-collapsed={ props.collapsed }
              accordion={ sidebar.isMenuAccordion }
              mode={ props.horizontal ? 'horizontal' : 'inline' }>
        { renderSubMenu(props.menus) }
      </a-menu>
    )
  }
})
</script>

<style lang="scss" scoped>
:global(.ant-menu-horizontal >.ant-menu-submenu), :global(.ant-menu-horizontal >.ant-menu-item) {
  display: flex;
  align-items: center;
}

:global(.ant-menu-dark) {
  background: theme('backgroundColor.dark');
}
</style>
