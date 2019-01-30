import service from './../../utils/request.js';

export default Vue.component('modules-index', {
    template: `
        <div id="modules">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="page-header">
                            <h3>
                                数据生成器
                                
                                    <router-link to="/modules/create"><el-button size="mini" type="primary" > 新建 </el-button></router-link>
                                
                            </h3>
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
        }
    },
    methods: {
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
        sort: function (row) {
            let that = this;
            service({
                url: '/1/table-collections/' + row.id,
                method: 'put',
                data: row
            }).then(function (response) {
                console.log(response)
                that.$message({
                    message: response.message,
                    type: 'success'
                });
                that.initPage()
            });
        },
        destroy: function (row) {
            let that = this;
            service({
                url: '/1/table-collections/' + row.id,
                method: 'delete',
            }).then(function (response) {
                console.log(response)
                that.$message({
                    message: response.message,
                    type: 'success'
                });
                that.initPage()
            });
        },
        tableRowClassName: function ({row, rowIndex}) {
            let color = ['table-color-1', 'table-color-2', 'table-color-3', 'table-color-4', 'table-color-5',
                'table-color-6', 'table-color-7',
            ];

            return color[rowIndex % 7];
        },
    },

    mounted: function () {
        this.$store.dispatch('setTableCollection',13)
        console.log('view')
        this.initPage()
    }
})

