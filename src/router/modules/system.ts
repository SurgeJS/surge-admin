export default {
  path: '/system',
  component: 'basic',
  name: 'system',
  meta: {
    title: '系统管理',
    icon: 'ant-design:database-outlined',
    order: 1
  },
  children: [
    {
      path: '/system/userManagement',
      name: 'system/userManagement',
      meta: {
        title: '用户管理'
      },
      component: 'submenu'
    }
  ]
} as AppRouteRecordRaw
