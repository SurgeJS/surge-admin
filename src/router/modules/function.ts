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
            children: [
                {
                    path: '/twoDimensionalMap',
                    component: 'view',
                    meta: {
                        title: '二维地图'
                    }
                }
            ]
        },
        {
            path: '/menu',
            meta: {
                title: '多级菜单',
            },
            children: [
                {
                    path: '/menu-1',
                    meta: { title: '菜单-1' },
                    children: [
                        {
                            path: '/menu-1-1',
                            component: 'view',
                            meta: { title: '菜单-1-1' },
                        },
                        {
                            path: '/menu-1-2',
                            meta: { title: '菜单-1-2' },
                            children: [
                                {
                                    path: '/menu-1-2-1',
                                    component: 'view',
                                    meta: { title: '菜单-1-2-1' }
                                }
                            ],
                        }
                    ]
                },
                {
                    path: '/menu-2',
                    meta: { title: '菜单-2' },
                    children: [
                        {
                            path: '/menu-2-1',
                            component: 'view',
                            meta: { title: '菜单-2-1' }
                        }
                    ]
                }
            ]
        }
    ]
} satisfies AppRouteRecordRaw
