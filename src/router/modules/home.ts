import RouterConfig from '@/config/router'

export default {
  path: RouterConfig.HOME_PATH,
  component: 'basic-view',
  meta: {
    title: '首页',
    icon: 'ant-design:area-chart-outlined',
    affixTab: true,
    order: 1
  }
} satisfies AppRouteRecordRaw
