// 使用ES 的语法完成结果
(async function () {

    // 1 . 获取相应的资源
    let app = await import('./app.js');
    let router = await import('./router/index.js');
    router = router.default;
    let store = await import('./store/index.js');
    store = store.default;


    // 2. 绑定到对应的vue 上面
    new Vue({
        el: '#app',
        router,
        store,
        render: h => h(app.default)
    })

    console.log('框架加载：vue complete')
})();
