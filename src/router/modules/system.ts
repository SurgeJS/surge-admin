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
            path: 'https://www.naiveui.com/zh-CN/light/docs/customize-theme#%E8%B0%83%E6%95%B4%E4%B8%BB%E9%A2%98%E5%8F%98%E9%87%8F',
            meta: { title: '用户管理' },
            component: 'view'
        }
    ]
} satisfies AppRouteRecordRaw
