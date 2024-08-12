import RouterConfig from '@/config/router'

export default {
  path: RouterConfig.HOME_PATH,
  component: 'menu',
  meta: {
    title: '首页',
    icon: 'ant-design:area-chart-outlined',
    affixTab: true,
    order: 1
  }
} satisfies AppRouteRecordRaw
