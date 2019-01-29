import service from './../../utils/request.js';

export default Vue.component('modules-index', {
    template: `
        <div id="modules">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="page-header">
                            <h3>
                                模块管理 —— 列表 &nbsp;&nbsp;&nbsp;
                                <small>  
                                    <router-link to="/modules/create"><el-button size="mini" type="primary" > 新建 </el-button></router-link>
                                </small>
                            </h3>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <el-table :data="tableData" height="530">
                            <el-table-column prop="id" label="序号"></el-table-column>
                            <el-table-column prop="module_name" label="模块名称"></el-table-column>
                            <el-table-column prop="sort" label="排序"></el-table-column>
                            <el-table-column prop="created_at" label="添加时间"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <router-link :to="'/modules/update/'+scope.row.id">
                                        <el-button size="mini">编辑</el-button>
                                    </router-link>
                                    <el-button
                                      size="mini"
                                      type="danger"
                                      @click="destroy(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            tableData: [{}]
        }
    },
    methods: {
        initPage() {
            let that = this;
            service({
                url: '/modules',
                method: 'get',
            }).then(function (response) {
                that.$set(that, 'tableData', response.data);
            })
        },
        destroy(row) {
            let that = this;
            service({
                url: '/modules/' + row.id,
                method: 'delete',
                data: this.formData
            }).then(function (response) {
                console.log(response)
                that.$message({
                    message: response.message,
                    type: 'success'
                });
                that.initPage();
            })
        }
    },

    mounted: function () {
        this.initPage()
    }
})

