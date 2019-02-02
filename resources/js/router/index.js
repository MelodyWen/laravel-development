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
                meta: {title: '模块划分'},
                component: async function () {
                    return (await import('../views/tables/index.js')).default
                },
            },
            {
                path: 'all',
                meta: {title: '所有数据表'},
                component: async function () {
                    return (await import('../views/tables/all.js')).default
                },
            }
        ]
    },
    {
        path: '/builder',
        component: Layout,
        meta: {title: '生成器', icon: 'el-icon-star-on'},
        children: [
            {
                path: 'data',
                meta: {title: '数据自动填充'},
                component: async function () {
                    return (await import('../views/builder/generate_data.js')).default
                },
            }, {
                path: 'php',
                meta: {title: 'php 数据格式'},
                component: async function () {
                    return (await import('../views/builder/generate_php.js')).default
                },
            }, {
                path: 'js',
                meta: {title: 'js 数据格式'},
                component: async function () {
                    return (await import('../views/builder/generate_js.js')).default
                },
            }, {
                path: 'yml',
                meta: {title: 'yml 数据格式'},
                component: async function () {
                    return (await import('../views/builder/generate_yml.js')).default
                },
            }, {
                path: 'swagger',
                meta: {title: 'swagger 数据格式'}
            }
        ]
    }
]

console.log('框架加载：router complete')

export default new VueRouter({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})