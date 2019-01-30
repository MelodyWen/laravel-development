import tableCollection from './modules/table_collection.js'


const store = new Vuex.Store({
    modules: {
        tableCollection
    },
});

console.log('框架加载：vuex complete')

export default store
