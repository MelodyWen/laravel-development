export let SideBar = Vue.component('side-bar', {
    template: `
<el-row class="tac">
    <el-col :span="24">
        <h2 class="text-center">development</h2>
        <el-menu
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
      
        <!--循环遍历路由-->
        <template v-for="(router,index) in routes">
            <!-- 1. 如果 child 只有 一个元素 则直接显示 -->
            <el-menu-item v-if="router.children.length < 2 " :index="index.toString()" @click="redirectTo(router, router.children[0])">
                <i :class="router.children[0].meta.icon"></i>
                <span slot="title">{{ router.children[0].meta.title }}</span>
            </el-menu-item>
            
            <!--2. 如果 child 有多个 元素 则分组显示， 最多二级分类， 不存在三级分类-->
            <el-submenu v-else :index="index.toString()">
                
                <template slot="title">
                  <i :class="router.meta.icon"></i>
                  <span>{{ router.meta.title }}</span>
                </template>

                <el-menu-item v-for="(grandson,grandIndex) in router.children" 
                    :key="grandIndex" :index="index + '-' + grandIndex"
                    @click="redirectTo(router, grandson)"
                    >
                    {{ grandson.meta.title }}  {{ index + '-' + grandIndex  }}
                </el-menu-item>
            </el-submenu>
        </template>
    </el-menu>
  </el-col>
</el-row>
    `,

    computed: {
        routes: function () {
            return this.$router.options.routes;
        },
    },

    methods: {
        redirectTo: function (router, grandson) {
            let path = router.path;

            if (path.substr(path.length - 1) !== '/') {
                path += '/'
            }
            this.$router.push(path + grandson.path);

            console.log("跳转路由到：", grandson)
        }
    },
    mounted() {
        console.log("侧边栏加载完毕：", this.$router.options.routes)
    }
})

