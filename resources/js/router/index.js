import Layout from '../views/layout/layout.js'

export const constantRouterMap = [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        children: [{
            path: 'dashboard',
            meta: { title: 'Tree', icon: 'el-icon-star-on' },
            // component: () => import('@/views/dashboard/index')
        }]
    },
    {
        path: '/example',
        component: Layout,
        redirect: '/example/table',
        name: 'Example',
        meta: { title: 'Example', icon: 'el-icon-star-on' },
        children: [
            {
                path: 'table',
                name: 'Table',
                // component: () => import('@/views/table/index'),
                meta: { title: 'Table', icon: 'el-icon-tickets' }
            },
            {
                path: 'tree',
                name: 'Tree',
                // component: () => import('@/views/tree/index'),
                meta: { title: 'Tree', icon: 'el-icon-tickets' }
            }
        ]
    },
    {
        path: '/form',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'Form',
                // component: () => import('@/views/form/index'),
                meta: { title: 'Form', icon: 'el-icon-tickets' }
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
                meta: { title: 'Menu1' },
            },
            {
                path: 'menu2',
                // component: () => import('@/views/nested/menu2/index'),
                meta: { title: 'menu2' }
            }
        ]
    },
]

console.log('框架加载：router complete')

export default new VueRouter({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})