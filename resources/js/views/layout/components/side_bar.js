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
            <el-menu-item v-if="hasChildNum(router) == 1 " :index="index.toString()" @click="redirectTo(router)">
                <template v-for="(child,childIndex) in router.children">
                    <template v-if="child.hidden != true">
                         <i :class="router.meta.icon"></i>
                         <span slot="title">{{ router.meta.title }}</span>                                    
                    </template>
                </template>
            </el-menu-item>
            
            <!--2. 如果 child 有多个 元素 则分组显示， 最多二级分类， 不存在三级分类-->
            <el-submenu v-else-if="hasChildNum(router) > 1" :index="index.toString()">
                <template slot="title">
                  <i :class="router.meta.icon"></i>
                  <span>{{ router.meta.title }}</span>
                </template>
                <template v-for="(child,childIndex) in router.children">
                    <template v-if="child.hidden != true">
                        <el-menu-item
                            :index="index + '-' + childIndex"
                            @click="redirectTo(router, child)"
                        > {{ child.meta.title }} </el-menu-item>         
                    </template>
                </template>
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
        redirectTo: function (router, child) {
            let path = router.path;

            if (path.substr(path.length - 1) !== '/') {
                path += '/'
            }
            this.$router.push(path + (child ? child.path : ''));

            console.log("跳转路由到：", child ? child : router)
        },
        hasChildNum: function (router) {
            let response = collect(router.children).reduce(function (carry, item) {
                carry = carry ? carry : 0;

                return item.hidden ? carry : ++carry;

            });

            return response ? response : 0;
        }
    },
    mounted() {
        console.log("侧边栏加载完毕：", this.$router.options.routes)
    }
})

