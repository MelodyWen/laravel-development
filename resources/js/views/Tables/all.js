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
                        <el-tabs type="border-card">
                            <el-tab-pane label="所有的数据表">
                                <el-table :data="allTables" height="530">
                                    <el-table-column width="100" prop="id" label="sn" fixed="left"></el-table-column>
                                    <el-table-column width="200" prop="TABLE_NAME" label="table_name" fixed="left"></el-table-column>
                                    <el-table-column width="300" prop="TABLE_COMMENT" label="table_comment" ></el-table-column>
                                    <el-table-column width="200" prop="TABLE_SCHEMA" label="table_schema"></el-table-column>
                                    <el-table-column width="150" prop="TABLE_COLLATION" label="table_collection"></el-table-column>
                                    <el-table-column width="200" prop="CREATE_TIME" label="create_time"></el-table-column>
                                    <el-table-column width="200" prop="table_collection.module.module_name" label="module" fixed="right"></el-table-column>
                               </el-table>
                            </el-tab-pane>
                          <el-tab-pane label="未分配的数据表">
                                <el-table :data="notInCollection" height="530">
                                    <el-table-column prop="id" label="sn"></el-table-column>
                                    <el-table-column prop="TABLE_NAME" label="table_name"></el-table-column>
                                    <el-table-column prop="TABLE_COMMENT" label="table_comment" ></el-table-column>
                                     <el-table-column label="操作">
                                        <template slot-scope="scope">
                                            <el-row>
                                                <el-col :span="15">
                                                    <el-select v-model="scope.row.module" size="mini" clearable placeholder="请选择">
                                                        <el-option
                                                          v-for="item in modules"
                                                          :key="item.value"
                                                          :label="item.module_name"
                                                          :value="item.id">
                                                        </el-option>
                                                    </el-select>
                                                </el-col>
                                                <el-col :span="9" class="text-center">
                                                    <el-button type="text" size="small" @click="submit(scope.row)">确定</el-button>                                 
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
            allTables: [],
            modules: [],
            notInCollection: []
        }
    },
    methods: {
        initPage() {
            let that = this;
            service({
                url: '/common/all',
                method: 'get',
            }).then(function (response) {
                that.$set(that, 'allTables', collect(response.data).sortBy('TABLE_NAME').map(function (item, key) {
                    item.id = key + 1;
                    return item;
                }).toArray());

                console.log('所有的数据表', response.data)
                that.getNotInCollection();
            });
            service({
                url: '/modules',
                method: 'get',
            }).then(function (response) {
                that.$set(that, 'modules', response.data);

                console.log('所有的模块', response.data)
            });

        },
        getNotInCollection() {
            let response = collect(this.allTables).filter(function (item) {
                return !item.table_collection;
            }).map(function (item, key) {
                let param = {...item};
                param.id = key + 1;
                param.module = null;

                return param;
            }).toArray();

            this.$set(this, 'notInCollection', response);
        },
        submit(row) {
            let that = this;
            service({
                url: '/' + row.module + '/table-collections',
                method: 'post',
                data: {
                    module_name: row.TABLE_NAME
                }
            }).then(function (response) {
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

