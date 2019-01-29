import Layout from '../views/layout/layout.js'

export const constantRouterMap = [
    {
        path: '/',
        redirect: '/modules/index',
    },
    {
        path: '/modules',
        component: Layout,
        redirect: '/modules/index',
        meta: {title: '模块管理', icon: 'el-icon-star-on'},
        name: 'modules',
        children: [
            {
                path: 'index',
                name: 'index',
                meta: {title: '列表'},
                component: async function () {
                    return (await import('../views/modules/index.js')).default
                },
            },
            {
                path: 'create',
                hidden: true,
                name: 'create',
                meta: {title: '新增'},
                component: async function () {
                    return (await import('../views/modules/create.js')).default
                },
            },
            {
                path: 'update/:id',
                hidden: true,
                name: 'update',
                meta: {title: '修改'},
                component: async function () {
                    return (await import('../views/modules/update.js')).default
                },
            }
        ]
    },
    {
        path: '/table',
        component: Layout,
        meta: {title: '数据表管理', icon: 'el-icon-star-on'},
        children: [
            {
                path: 'index',
                meta: {title: '模块划分', icon: 'el-icon-tickets'},
                component: async function () {
                    return (await import('../views/tables/index.js')).default
                },
            },
            {
                path: 'all',
                meta: {title: '所有数据表', icon: 'el-icon-tickets'},
                component: async function () {
                    return (await import('../views/tables/all.js')).default
                },
            }
        ]
    },
    {
        path: '/form',
        component: Layout,
        meta: {title: '模块管理', icon: 'el-icon-star-on'},
        children: [
            {
                path: 'index',
                name: 'Form',
                // component: () => import('@/views/form/index'),
                meta: {title: 'Form', icon: 'el-icon-tickets'}
            }
        ]
    },

    {
        path: '/nested',
        component: Layout,
        redirect: '/nested/menu1',
        name: 'Nested',
        meta: {
            title: 'Nested',
            icon: 'el-icon-star-on'
        },
        children: [
            {
                path: 'menu1',
                // component: () => import('@/views/nested/menu1/index'), // Parent router-view
                name: 'Menu1',
                meta: {title: 'Menu1'},
            },
            {
                path: 'menu2',
                // component: () => import('@/views/nested/menu2/index'),
                meta: {title: 'menu2'}
            }
        ]
    },
]

console.log('框架加载：router complete')

export default new VueRouter({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})