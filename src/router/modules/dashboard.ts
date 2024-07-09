// 仪表盘
import { RoleEnum } from '@/enums/auth'

export default {
  path: '/dashboard',
  name: 'dashboard',
  component: 'basic',
  meta: {
    title: '控制台',
    icon: 'ant-design:area-chart-outlined',
    order: 1
  },
  children: [
    {
      path: '/dashboard/analysis',
      name: 'dashboard/analysis',
      meta: {
        title: '分析页',
        roles: [ RoleEnum.SUPER ],
        keepAlive: true,
        affix: true
      },
      component: 'submenu',
      children:[
        {
          path: '/dashboard/analysis/details',
          name: 'dashboard/analysis/details',
          meta: {
            title: '详情',
            roles: [ RoleEnum.SUPER ],
            keepAlive: true,
            affix: true
          },
          component: 'menu',
        }
      ]
    }
  ]
} as AppRouteRecordRaw
