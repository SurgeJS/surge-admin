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
            path: '/component/schemaForm',
            meta: {
                title: 'Schema Form'
            },
            children: [
                {
                    path: '/component/schemaForm/basicForm',
                    component: 'view',
                    meta: {
                        title: '基础表单'
                    }
                },
                {
                    path: '/component/schemaForm/groupForm',
                    component: 'view',
                    meta: {
                        title: '分组表单'
                    }
                },
                {
                    path: '/component/schemaForm/stepForm',
                    component: 'view',
                    meta: {
                        title: '步骤表单'
                    }
                },
                {
                    path: '/component/schemaForm/searchForm',
                    component: 'view',
                    meta: {
                        title: '搜索表单'
                    }
                },
                {
                    path: '/component/schemaForm/popupForm',
                    component: 'view',
                    meta: {
                        title: '弹框表单'
                    }
                }
            ]
        },
        {
            path: '/component/animation',
            component: 'view',
            meta: {
                title: '动画'
            },
        },
        {
            path: '/component/table',
            component: 'view',
            meta: {
                title: '表格'
            },
        }
    ]
} satisfies AppRouteRecordRaw
