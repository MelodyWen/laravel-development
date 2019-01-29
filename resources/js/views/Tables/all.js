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
                                    <el-table-column width="200" prop="module" label="module" fixed="right"></el-table-column>
                               </el-table>
                            </el-tab-pane>
                          <el-tab-pane label="未分配的数据表">
                          配置管理
                          </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            allTables: [{}]
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
            })
        },
    },

    mounted: function () {
        this.initPage()
    }
})

