import service from './../../utils/request.js';

export default Vue.component('modules-index', {
    template: `
        <div id="modules">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="page-header">
                            <h3>
                                所有的数据表管理
                            </h3>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <el-tabs type="border-card" tab-position="left" style="height: 600px;">
                            <el-tab-pane :key="key" v-for="(module,key) in modules" :label="module.sort +'. '+ module.module_name"> 
                                
                                <el-table :data="module.table_collections" height="530">
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
        }
    },

    mounted: function () {
        this.initPage()
    }
})

