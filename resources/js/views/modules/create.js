import service from './../../utils/request.js';

export default Vue.component('modules-create', {
    template: `
        <div id="modules">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="page-header">
                            <h3>
                                模块管理 —— 新建                               
                            </h3>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <form class="form-horizontal" onsubmit="return false">
                        <div class="form-group">
                            <label for="collection_name" class="col-xs-2 control-label">模块名称</label>
                            <div class="col-xs-6">
                                <input type="text" class="form-control" v-model="formData.collection_name" id="collection_name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="sort" class="col-xs-2 control-label">排序</label>
                            <div class="col-xs-6">
                                <input type="number" class="form-control" v-model="formData.sort" id="sort">
                            </div>
                        </div>
                       
                        <div class="form-group">
                            <div class="col-xs-offset-2 col-xs-10">
                                <button type="submit" class="btn btn-default" @click="submit()">提交</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            formData: {
                collection_name: '',
                sort: 0,
            }
        }
    },
    mounted: function () {
    },
    methods: {
        submit() {
            let that = this;
            service({
                url: '/modules',
                method: 'post',
                data: this.formData
            }).then(function (response) {
                that.$message({
                    message: response.message,
                    type: 'success'
                });
                that.$router.push('/modules/index')

            })
        }
    },
})

