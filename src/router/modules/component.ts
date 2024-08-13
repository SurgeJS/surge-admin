export default {
  path: '/component',
  component: 'basic',
  meta: {
    title: '组件',
    icon: 'ant-design:copyright-circle-filled',
    order: 4
  },
  children: [
    {
      path: '/schemaForm',
      meta: {
        title: 'Schema Form'
      },
      children: [
        {
          path: '/basicForm',
          component: 'single',
          meta: {
            title: '基础表单'
          }
        },
        {
          path: '/groupForm',
          component: 'single',
          meta: {
            title: '分组表单'
          }
        },
        {
          path: '/stepForm',
          component: 'single',
          meta: {
            title: '步骤表单'
          }
        },
        {
          path: '/searchForm',
          component: 'single',
          meta: {
            title: '搜索表单'
          }
        },
        {
          path: '/popupForm',
          component: 'single',
          meta: {
            title: '弹框表单'
          }
        }
      ]
    },
    {
      path:'/animation',
      component: 'single',
      meta: {
        title: '动画'
      },
    },
    {
      path:'/table',
      component: 'single',
      meta: {
        title: '表格'
      },
    }
  ]
} satisfies AppRouteRecordRaw
