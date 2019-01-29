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
                            <label for="module_name" class="col-xs-2 control-label">模块名称</label>
                            <div class="col-xs-6">
                                <input type="text" class="form-control" v-model="formData.module_name" id="module_name">
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
                module_name: '',
                sort: 0,
            }
        }
    },
    mounted: function () {
        let that = this;

        service({
            url: '/modules/' + this.$route.params.id,
            method: 'get',
            data: this.formData
        }).then(function (response) {
            that.$set(that, 'formData', {
                module_name: response.data.module_name,
                sort: response.data.sort,
            })
        })
    },
    methods: {
        submit() {
            let that = this;

            service({
                url: '/modules/' + this.$route.params.id,
                method: 'put',
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

