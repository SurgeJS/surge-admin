import { MockMethod } from 'vite-plugin-mock'


export default [
    {
        url: '/mock/passwordLogin',
        method: 'post',
        // timeout: 5000,
        // statusCode: 400,
        response: () => {
            return {
                code: 200,
                msg: '登录成功',
                token: 'by Simple admin'
            }
        }
    },
    {
        url: '/mock/getUserinfo',
        method: 'get',
        // timeout: 5000,
        // statusCode: 500,
        response: () => {
            return {
                code: 200,
                msg: 'ok',
                result: {
                    // 权限
                    permissions: [],
                    // 角色
                    roles: [ 'Super' ],
                    // 用户信息
                    userinfo: {
                        userId: 1,
                        // 用户名
                        username: 'admin',
                        // 头像
                        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkfVMhgRPHf9mSpyfVGvJTX2-UP9B-5xFsyg&usqp=CAU'
                    }
                }
            }
        }
    },
    {
        url: '/mock/signOut',
        method: 'get',
        timeout: 0,
        response: () => {
            return {
                code: 300,
                msg: 'ok'
            }
        }
    },
    {
        url: '/mock/getRoutes',
        method: 'get',
        timeout: 0,
        response: () => {
            return {
                code: 200,
                msg: 'ok',
                result: [
                    {
                        path: '/system',
                        name: 'system',
                        component: 'Directory',
                        meta: {
                            title: '系统管理',
                            icon: 'lock',
                            orderNo: 2
                        },
                        children: [
                            {
                                path: '/system/user',
                                name: 'system-user',
                                meta: { title: '用户' },
                                component: 'Menu'
                            },
                            {
                                path: '/system/role',
                                name: 'system-role',
                                meta: { title: '角色' },
                                component: 'Menu'
                            },
                            {
                                path: '/system/menu',
                                name: 'system-menu',
                                meta: { title: '菜单' },
                                component: 'Menu'
                            },
                            {
                                path: '/system/test',
                                name: 'system-test',
                                component: 'Directory',
                                meta: { title: '测试' },
                                children: [
                                    {
                                        path: '/system/test/menu',
                                        name: 'system-test-menu',
                                        meta: { title: '测试菜单' },
                                        component: 'Menu'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: '/dashboard',
                        name: 'dashboard',
                        component: 'Directory',
                        meta: {
                            title: '控制台',
                            icon: 'lock',
                            orderNo: 1
                        },
                        children: [
                            {
                                path: '/dashboard/analysis',
                                name: 'dashboard-analysis',
                                meta: {
                                    title: '分析页',
                                    affix: true
                                },
                                component: 'Menu'
                            }
                        ]
                    },
                    {
                        path: '/about',
                        name: 'about',
                        meta: {
                            title: '关于',
                            icon: 'lock',
                            keepAlive: true,
                            orderNo: 3
                        },
                        component: 'SelfMenu'
                    }
                ]
            }
        }
    }
] as MockMethod[]
