export default {
  path: '/function',
  component: 'basic',
  meta: {
    title: '功能',
    icon: 'ant-design:database-outlined',
    order: 3
  },
  children: [
    {
      path: '/maps',
      meta: {
        title: '地图'
      },
      component: 'directory',
      children: [
        {
          path: '/twoDimensionalMap',
          component: 'submenu',
          meta: {
            title: '二维地图'
          }
        }
      ]
    },
    {
      path: '/multilevelMenu',
      meta: {
        title: '多级菜单'
      },
      component: 'directory',
      children: [
        {
          path: '/menu-1',
          component: 'directory',
          meta: {
            title: 'menu-1'
          },
          children: [
            {
              path: '/menu-1-1',
              component: 'directory',
              meta: {
                title: 'menu-1-1'
              },
              children: [
                {
                  path: '/menu-1-1-1',
                  component: 'submenu',
                  meta: {
                    title: 'menu-1-1-1'
                  }
                }
              ]
            },
            {
              path: '/menu-1-2',
              component: 'submenu',
              meta: {
                title: 'menu-1-2'
              }
            }
          ]
        }
      ]
    },
  ]
} satisfies AppRouteRecordRaw
