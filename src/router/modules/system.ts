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
            name: 'system_userManagement',
            meta: {
                title: '用户管理'
            },
            component: 'self'
        }
    ]
} as Route.RouteRecordRaw
