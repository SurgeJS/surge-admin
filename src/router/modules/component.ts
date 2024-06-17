export default {
  path: '/component',
  name: 'component',
  component: 'basic',
  meta: {
    title: '组件',
    icon: 'ant-design:copyright-circle-filled',
    order: 2
  },
  children: [
    {
      path: '/component/schemaForm',
      name: 'component/schemaForm',
      component: 'directory',
      meta: {
        title: 'Schema Form'
      },
      children: [
        {
          path: '/component/schemaForm/basicForm',
          name: 'component/schemaForm/basicForm',
          component: 'submenu',
          meta: {
            title: '基础表单'
          }
        },
        {
          path: '/component/schemaForm/groupForm',
          name: 'component/schemaForm/groupForm',
          component: 'submenu',
          meta: {
            title: '分组表单'
          }
        },
        {
          path: '/component/schemaForm/stepForm',
          name: 'component/schemaForm/stepForm',
          component: 'submenu',
          meta: {
            title: '步骤表单'
          }
        },
        {
          path: '/component/schemaForm/searchForm',
          name: 'component/schemaForm/searchForm',
          component: 'submenu',
          meta: {
            title: '搜索表单'
          }
        }
      ]
    }
  ]
} as AppRouteRecordRaw
