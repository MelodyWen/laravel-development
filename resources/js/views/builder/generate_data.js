import service from './../../utils/request.js';

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
                                                <select class="form-control" v-model="navForm.module">
                                                    <option v-for="module in modules" :value="module.id">{{ module.module_name }}</option>
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
                                                <select class="form-control" v-model="navForm.tableCollection">
                                                    <option v-for="navTableCollection in navTableCollections" :value="navTableCollection.id">
                                                        {{ navTableCollection.sort + '. ' + navTableCollection.module_name }}
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
                        <el-tabs type="border-card" tab-position="left" style="height: 700px;">
                            <el-tab-pane :key="key" v-for="(module,key) in modules" :label="module.sort +'. '+ module.module_name"> 
                                
                                <el-table :data="module.table_collections" height="650">
                                    
                                    <el-table-column type="expand">
                                        <template slot-scope="props">
                                            
                                            <el-table :data="props.row.table.columns" style="width: 100%;" :row-class-name="tableRowClassName">
                                                <el-table-column width="150" prop="COLUMN_NAME" label="列名" fixed></el-table-column>
                                                <el-table-column width="120" prop="COLUMN_TYPE" label="列的定义类型"></el-table-column>
                                                
                                                <el-table-column width="70" prop="COLUMN_KEY" label="索引列"></el-table-column>
                                                <el-table-column width="70" prop="IS_NULLABLE" label="is null"></el-table-column>
                                                <el-table-column width="70" prop="COLUMN_DEFAULT" label="默认值"></el-table-column>
                                                <el-table-column width="300" prop="COLUMN_COMMENT" label="备注"></el-table-column>
                                                
                                                <el-table-column width="100" prop="DATA_TYPE" label="数据类型"></el-table-column>
                                                <el-table-column width="100" prop="CHARACTER_MAXIMUM_LENGTH" label="字符-长度"></el-table-column>
                                                <el-table-column width="80" prop="NUMERIC_PRECISION" label="数字长度"></el-table-column>
                                                <el-table-column width="80" prop="NUMERIC_SCALE" label="数字精度"></el-table-column>
                                                <el-table-column width="100" prop="DATETIME_PRECISION" label="时间-精度"></el-table-column>
                                                <el-table-column width="70" prop="CHARACTER_SET_NAME" label="字符集"></el-table-column>
                                                <el-table-column width="120" prop="COLLATION_NAME" label="校对规则"></el-table-column>
                                                
                                                <el-table-column width="250" prop="EXTRA" label="额外信息"></el-table-column>
                                                <el-table-column width="300" prop="GENERATION_EXPRESSION" label="计算表达式"></el-table-column>
                                                
                                            </el-table>
                                          
                                        </template>
                                    </el-table-column>
                                    
                                    <el-table-column prop="sort" label="sn"></el-table-column>
                                    <el-table-column prop="table.TABLE_NAME" label="table_name"></el-table-column>
                                    <el-table-column prop="table.TABLE_COMMENT" label="table_comment" ></el-table-column>
                                     <el-table-column label="操作">
                                        <template slot-scope="scope">
                                            <el-row>
                                                <el-col :span="10">
                                                    <el-input v-model="scope.row.sort" size="mini" type="number"></el-input>
                                                </el-col>
                                                <el-col :span="14" class="text-center">
                                                    <el-button type="text" size="small" @click="sort(scope.row)">确定</el-button>                                 
                                                    <el-button type="text" size="small" @click="destroy(scope.row)">
                                                        <span style="color:#F56C6C">删除</span>
                                                    </el-button>                                 
                                                </el-col>
                                            </el-row>
                                        </template>
                                    </el-table-column>
                                </el-table>
    
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            modules: [],
            navForm: {
                module: undefined,
                tableCollection: undefined,
            }
        }
    },
    computed: {
        /**
         * 如果选择了对应 module 发生改变 ，则对应的二级联动也需要更变
         * @returns {*}
         */
        navTableCollections: function () {
            let response = collect(this.modules).where('id', this.navForm.module);

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
            handler: function (newVal, oldVal) {
                if (this.$store.state.tableCollection.id !== newVal.tableCollection) {
                    this.$store.dispatch('setTableCollection', newVal.tableCollection)
                }
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
                this.navForm.module = this.$store.state.tableCollection.module.id
                this.navForm.tableCollection = this.$store.state.tableCollection.tableCollection.id
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
    },

    mounted: function () {
        this.initNav();
        this.initPage()
    }
})

