export let NavBar  =  Vue.component('nav-bar', {
    template: `
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <!--<el-menu-item index="1">处理中心</el-menu-item>-->
          <!--<el-submenu index="2">-->
            <!--<template slot="title">我的工作台</template>-->
            <!--<el-menu-item index="2-1">选项1</el-menu-item>-->
            <!--<el-menu-item index="2-2">选项2</el-menu-item>-->
            <!--<el-menu-item index="2-3">选项3</el-menu-item>-->
            <!--<el-submenu index="2-4">-->
              <!--<template slot="title">选项4</template>-->
              <!--<el-menu-item index="2-4-1">选项1</el-menu-item>-->
              <!--<el-menu-item index="2-4-2">选项2</el-menu-item>-->
              <!--<el-menu-item index="2-4-3">选项3</el-menu-item>-->
            <!--</el-submenu>-->
          <!--</el-submenu>-->
          <el-menu-item index="3" disabled>   </el-menu-item>
          <!--<el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
        </el-menu>
    `,
    data() {
        return {

        };
    },
    methods: {

    }
})

