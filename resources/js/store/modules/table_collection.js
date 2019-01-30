import service from './../../utils/request.js';
import {setStoreTableCollection, getStoreTableCollection} from './../../utils/cookie_store.js';


const tableCollection = {
    state: {
        // 对应的模块名称
        module: null,
        // 对应的 tableCollection 的记录
        tableCollection: null,
    },

    mutations: {
        setModule: (state, value) => {
            state.module = value;
        },
        setTableCollection: (state, value) => {
            state.token = value
        },
    },

    actions: {
        // 登录
        Login({commit}, userInfo) {
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                login(username, userInfo.password).then(response => {
                    const data = response.data
                    setToken(data.token)
                    commit('SET_TOKEN', data.token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 通过 tableCollectionId 来 设置 整个全局共享的值
         * @param commit
         * @param tableCollectionId
         */
        setTableCollection({commit}, tableCollectionId) {

            service({
                url: '/1/table-collections/' + tableCollectionId,
                method: 'get',
            }).then(function (response) {
                let module = response.data.module;
                delete response.data.module;

                commit('setModule', module);
                commit('setTableCollection', response.data);

                setStoreTableCollection(123123123);
            });


            // console.log(1312, tableCollectionId)tableCollectionId
        }
    },

}

export default tableCollection
