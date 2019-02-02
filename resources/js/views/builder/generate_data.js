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
                                 <el-col :span="3"><h3>数据生成器</h3></el-col>
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
                                    <div class="form-group">
                                        <div class="col-sm-offset-2 col-sm-10">
                                            <button type="submit" class="btn btn-default" @click="submit">生成数据</button>
                                        </div>
                                    </div>
                                </form>
                             </el-tab-pane>
                             <el-tab-pane label="配置字段">
                      
                      
                                <el-tabs tab-position="left">
                                    <template v-for="columnsConfig in columnsConfigs">
                                    <el-tab-pane :label="columnsConfig.column.COLUMN_NAME">
                                        <el-container>
                                        
<!--内容区域的 头部， 用来选择 mock 数据的 具体类别-->
<el-header style="height: 150px;overflow: scroll">

     <div class="el-row" v-for="category in  mock.categories">
        <el-col :span="24"><h5>{{ category.root_name }}</h5></el-col>
        <el-col :span="24">
            <el-button type="text" v-for="(child,childIndex) in  category.root_category" :key="childIndex" 
                @click="changeMockType(columnsConfig, child)">
                {{ child.name }}
            </el-button>
        </el-col>
     </div>
     
</el-header>

<!--实际的出来的结果如下所示-->
<el-main>
    <h5> 运行的代码如下所示 ：<el-button type="success" size="mini" @click="changeMockMethod">再次运行</el-button> </h5>
    <textarea  rows="10" style="background: #fafafa;width: 100%;border-radius: 10px" v-model="columnsConfig.mockCode">
    </textarea>
    <h5> 具体的结果展示 (mock type:  {{ columnsConfig.mockType }}) </h5>
     <pre style="background: #fafafa">
mock result : {{ columnsConfig.mockResult }}
    </pre>
</el-main>
                                            
                                        </el-container>
                                        
                                    </el-tab-pane>
                                    </template>
                                    
                                </el-tabs>
                                                             
                              
                             </el-tab-pane>
                         
 
                             <el-tab-pane label="数据预览">                         
                                <div style="width: 100%;overflow: scroll">
                                    <table class="table table-bordered"><tbody>
                                        <template v-if="builderGenerateForm.tableCollection.table != null">
                                       
                                            <tr>
                                                <th v-for="(column,index) in builderGenerateForm.tableCollection.table.columns">
                                                    {{column.COLUMN_NAME}}
                                                </th>
                                            </tr>
                                            <template v-for="item in generateDataForm">
                                                <tr>
                                                     <td v-for="(column,index) in builderGenerateForm.tableCollection.table.columns"
                                                        style="max-width:50em;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;"
                                                     >
                                                        {{item[column.COLUMN_NAME]}}
                                                    </td>
                                                </tr>
                                            </template>
                                        </template>
                                    </tbody></table>
                                </div>
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
            columnsConfigs: [
                // {column: {},mockType: '', mockCode: {}, mockResult: [],}
            ],
            generateDataForm: [],
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
                // 1. 相应数据 columnsConfigs
                let columnsConfigs = collect(this.builderGenerateForm.tableCollection.table.columns).map(function (item) {
                    let response = {
                        column: item,
                        mockType: mock.autoSelectMockType(item),
                        mockCode: '',
                        mockResult: [],
                    };
                    response.mockCode = mock.getMethodCode(response.mockType)

                    return response;
                }).toArray();
                columnsConfigs = this.computeMockResult(columnsConfigs);
                this.$set(this, 'columnsConfigs', columnsConfigs);


                // 2. 相应数据 generateDataForm
                let generateDataForm = this.getGenerateDataForm(columnsConfigs);
                this.$set(this, 'generateDataForm', generateDataForm);

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
        },
        computeMockResult: function (columnsConfigs) {
            let that = this;
            columnsConfigs = collect(columnsConfigs).map(function (item) {
                if (typeof item.mockCode === "string") {
                    eval(' item.mockCode =' + item.mockCode)
                }

                if (typeof item.mockCode != "function") {
                    return item
                }

                if (item.mockType === 'range') {
                    item.mockResult = item.mockCode(that.builderGenerateForm.rowNum)
                    return item;
                }
                item.mockResult = [];
                for (let i = 0; i < that.builderGenerateForm.rowNum; i++) {
                    item.mockResult.push(item.mockCode(that.builderGenerateForm.rowNum))
                }

                return item;
            }).toArray()

            return columnsConfigs
        },
        getGenerateDataForm: function () {
            let that = this;
            let generateDataForm = [];

            for (let i = 0; i < this.builderGenerateForm.rowNum; i++) {
                let row = collect(this.builderGenerateForm.tableCollection.table.columns).map(function (item) {
                    let val = collect(that.columnsConfigs).where('column.COLUMN_NAME', item.COLUMN_NAME).first()

                    return {[item.COLUMN_NAME]: val.mockResult[i]}
                }).reduce(function (carry, item) {
                    return {...carry, ...item};
                });
                generateDataForm.push(row)
            }

            return generateDataForm;
        },

        changeMockType: function (columnsConfig, mockCategory) {
            columnsConfig.mockType = mockCategory.name;
            columnsConfig.mockCode = mockCategory.method;

            let columnsConfigs = this.computeMockResult(this.columnsConfigs);
            this.$set(this, 'columnsConfigs', columnsConfigs);


            // 2. 相应数据 generateDataForm
            let generateDataForm = this.getGenerateDataForm(columnsConfigs);
            this.$set(this, 'generateDataForm', generateDataForm);
        },
        changeMockMethod: function () {
            console.log(this.columnsConfigs)

            let columnsConfigs = this.computeMockResult(this.columnsConfigs);
            this.$set(this, 'columnsConfigs', columnsConfigs);

            // 2. 相应数据 generateDataForm
            let generateDataForm = this.getGenerateDataForm(columnsConfigs);
            this.$set(this, 'generateDataForm', generateDataForm);
        },
        submit: function () {
            let that = this;
            service({
                url: '/common/mock-data',
                method: 'post',
                data: {
                    builderGenerateForm: this.builderGenerateForm,
                    generateDataForm: this.generateDataForm
                }
            }).then(function (response) {
                that.$message({
                    message: response.message,
                    type: 'success'
                });
            })
        }
    },

    mounted: async function () {
        await this.initPage();
        this.initNav();
    }
})

