export default Vue.component('modules', {
    template: `
        <div id="modules">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="page-header">
                            <h3>模块管理</h3>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
    <!--<el-table-->
    <!--:data="tableData"-->
    <!--style="width: 100%"-->
    <!--:row-class-name="tableRowClassName">-->
    <!--<el-table-column-->
      <!--prop="date"-->
      <!--label="日期"-->
      <!--&gt;-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
      <!--prop="name"-->
      <!--label="姓名"-->
      <!--&gt;-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
      <!--prop="address"-->
      <!--label="地址">-->
    <!--</el-table-column>-->
  <!--</el-table>-->
                    </div>
                </div>
            </div>
       
        </div>
    `,

        data() {
            return {
                tableData: [{
                    id: 1,
                    module_name:'学校模块',
                    sort:1,
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                }]
            }
        }
})
