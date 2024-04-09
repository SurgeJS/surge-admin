import { RoleEnum } from '@/enums/auth'

export default {
  path: '/about',
  name: 'about',
  meta: {
    title: '关于',
    roles: [ RoleEnum.SUPER ],
    icon: 'ant-design:like-filled',
    order: 3,
    permissions: [ 'test','test1' ],
    affix: true
  },
  component: 'menu'
} as AppRouteRecordRaw

