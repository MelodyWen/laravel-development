import service from './../../utils/request.js';
import mock from './../../utils/mock.js';

export default Vue.component('modules-index', {
    template: `
        <div id="modules">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="page-header">
                            <el-row>
                                 <el-col :span="3"><h3>js 格式化</h3></el-col>
                                 <el-col :span="7">
                                    <div class="form-group">
                                        <label class="col-xs-4 control-label"><h3 class="text-right"><small>模块名称</small></h3></label>
                                        <div class="col-xs-8">
                                            <h3>
                                                <select class="form-control" v-model="navForm.moduleId">
                                                    <option v-for="module in modules" :value="module.id">{{ module.collection_name }}</option>
                                                </select>
                                            </h3>
                                        </div>
                                    </div>
                                 </el-col>
                                 <el-col :span="7">
                                    <div class="form-group">
                                        <label class="col-xs-4 control-label"><h3 class="text-right"><small>数据表名</small></h3></label>
                                        <div class="col-xs-8">
                                            <h3>
                                                <select class="form-control" v-model="navForm.tableCollectionId">
                                                    <option v-for="navTableCollection in navTableCollections" :value="navTableCollection.id">
                                                        {{ navTableCollection.sort + '. ' + navTableCollection.collection_name }}
                                                    </option>
                                                  
                                                </select>
                                            </h3>
                                        </div>
                                    </div>
                                 </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <el-tabs type="border-card" tab-position="top">
                             
                             <el-tab-pane label="数据预览">                         
                                <div style="width: 100%;overflow: scroll">
                                    <pre>{{ previewData }}</pre>
                                </div>
                             </el-tab-pane>
                             
                             <el-tab-pane label="生成基本配置">
                                <form class="form-horizontal" onclick="return false">
                                    <div class="form-group">
                                        <label class="col-xs-2 control-label">table name</label>
                                        <div class="col-xs-4">
                                            <input type="text"  class="form-control" disabled
                                                :value="builderGenerateForm.tableCollection.collection_name" 
                                                placeholder="table name">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-xs-2 control-label">row num </label>
                                        <div class="col-xs-4">
                                            <input type="number" class="form-control" v-model="builderGenerateForm.rowNum" placeholder="row num">
                                        </div>
                                    </div>
                                </form>
                             </el-tab-pane>
                             
                        </el-tabs>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            mock: mock,
            modules: [],
            navForm: {
                moduleId: undefined,
                tableCollectionId: undefined,
            },
            builderGenerateForm: {
                tableCollection: {},
                rowNum: 10,
            },
            previewData: ''
        }
    },
    computed: {
        /**
         * 如果选择了对应 module 发生改变 ，则对应的二级联动也需要更变
         * @returns {*}
         */
        navTableCollections: function () {
            let response = collect(this.modules).where('id', this.navForm.moduleId);

            if (response.isEmpty()) {
                return []
            }
            return response.first().table_collections;
        }
    },
    watch: {
        navForm: {
            /**
             *  如果发现 对应的 tableCollection 发生变动， 则需要更新 store 内部的值
             * @param newVal
             * @param oldVal
             */
            handler: async function (newVal, oldVal) {
                if (this.$store.state.tableCollection.id !== newVal.tableCollectionId) {
                    await this.$store.dispatch('setTableCollection', newVal.tableCollectionId)
                }

                // 通过二级联动，选中对应的 table collection 值
                if (this.$store.state.tableCollection.tableCollection) {
                    this.$set(this.builderGenerateForm, 'tableCollection', this.$store.state.tableCollection.tableCollection)
                }
            },
            deep: true
        },
        builderGenerateForm: {
            handler: async function (newVal, oldVal) {
                if (!this.builderGenerateForm.tableCollection) {
                    return;
                }

                let that = this;
                // 节流
                let rowNum = this.builderGenerateForm.rowNum;
                await  new Promise((resolve) => {
                    setTimeout(resolve, 500);
                });

                if(rowNum !== this.builderGenerateForm.rowNum ){
                    return false
                }

                service({
                    url: '/common/preview-js',
                    method: 'post',
                    data: {
                        builderGenerateForm: this.builderGenerateForm,
                    }
                }).then(function (response) {
                    that.$set(that, 'previewData', response.data)

                    that.$message({
                        message: response.message,
                        type: 'success'
                    });
                })
            },
            deep: true
        }
    },
    methods: {
        /**
         * 初始化 导航
         */
        initNav: function () {
            if (this.$store.state.tableCollection.module) {
                this.navForm.moduleId = this.$store.state.tableCollection.module.id
                this.navForm.tableCollectionId = this.$store.state.tableCollection.tableCollection.id
            }
        },
        initPage: async function () {
            let that = this;

            // 1. 加载所有的模块
            let response = await service({
                url: '/modules',
                method: 'get',
            });

            console.log('所有的模块', response.data)

            response = collect(response.data).map(function (item) {
                item.table_collections = collect(item.table_collections)
                    .sortBy('sort')
                    .toArray();
                return item;
            }).toArray();

            that.$set(that, 'modules', response);
        }
    },

    mounted: async function () {
        await this.initPage();
        this.initNav();
    }
})

