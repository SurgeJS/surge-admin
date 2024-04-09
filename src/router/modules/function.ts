export default {
  path: '/function',
  component: 'basic',
  name: 'function',
  meta: {
    title: '功能',
    icon: 'ant-design:database-outlined',
    order: 1
  },
  children: [
    {
      path: '/function/maps',
      name: 'function/maps',
      meta: {
        title: '地图'
      },
      component: 'directory',
      children: [
        {
          path: '/function/maps/twoDimensionalMap',
          name: 'function/maps/twoDimensionalMap',
          component: 'submenu',
          meta: {
            title: '二维地图'
          }
        }
      ]
    },
    {
      path: '/function/multilevelMenu',
      name: 'function/multilevelMenu',
      meta: {
        title: '多级菜单'
      },
      component: 'directory',
      children: [
        {
          path: '/function/multilevelMenu/menu-1',
          name: 'function/multilevelMenu/menu-1',
          component: 'directory',
          meta: {
            title: 'menu-1'
          },
          children: [
            {
              path: '/function/multilevelMenu/menu-1/menu-1-1',
              name: 'function/multilevelMenu/menu-1/menu-1-1',
              component: 'directory',
              meta: {
                title: 'menu-1-1'
              },
              children: [
                {
                  path: '/function/multilevelMenu/menu-1/menu-1-1/menu-1-1-1',
                  name: 'function/multilevelMenu/menu-1/menu-1-1/menu-1-1-1',
                  component: 'submenu',
                  meta: {
                    title: 'menu-1-1-1'
                  }
                }
              ]
            },
            {
              path: '/function/multilevelMenu/menu-1/menu-1-2',
              name: 'function/multilevelMenu/menu-1/menu-1-2',
              component: 'submenu',
              meta: {
                title: 'menu-1-2'
              }
            }
          ]
        }
      ]
    },
    {
      path: '/function/print',
      name: 'function/print',
      component: 'submenu',
      meta: {
        title: '打印'
      }
    }
  ]
} as AppRouteRecordRaw
