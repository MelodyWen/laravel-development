let globalVue;

// 使用ES 的语法完成结果
(async function () {
    
    // 1 . 获取相应的资源
    let app = await import('./app.js');
    let router = await import('./router/index.js');
    router = router.default;
    let store = await import('./store/index.js');
    store = store.default;


    router.beforeEach(async function (to, from, next) {
        NProgress.start()

        if (store.state.tableCollection.module === undefined) {
            let cookieStore = await import('./utils/cookie_store.js');

            store.dispatch('setTableCollection',cookieStore.getStoreTableCollection())
            next();
        } else {
            next();
        }
    })

    router.afterEach(() => {
        NProgress.done() // 结束Progress
    })


    // 2. 绑定到对应的vue 上面
    globalVue = new Vue({
        el: '#app',
        router,
        store,
        render: h => h(app.default)
    })

    console.log('框架加载：vue complete')
})();
