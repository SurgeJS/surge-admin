export default {
    path: '/system',
    component: 'basic',
    meta: {
        title: '系统管理',
        icon: 'ant-design:database-outlined',
        order: 2
    },
    children: [
        {
            path: '/system/userManage',
            meta: { title: '用户管理' },
            component: 'view'
        }
    ]
} satisfies AppRouteRecordRaw
