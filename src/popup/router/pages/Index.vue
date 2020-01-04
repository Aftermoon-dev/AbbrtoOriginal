<template>
  <div id="app">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246);">
        <el-menu default-openeds="['1']" default-active="1-1">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>{{ menu }}</template>
            <el-menu-item-group>
              <el-menu-item index="1-1"><i class="el-icon-s-order"></i>{{list}}</el-menu-item>
              <el-menu-item index="1-2"><i class="el-icon-s-tools"></i>{{setting}}</el-menu-item>
              <br />
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <span>{{title}}</span>
          <el-row>
            <el-button icon="el-icon-check" circle></el-button>
            <el-button icon="el-icon-refresh-left" circle></el-button>
          </el-row>
        </el-header>
        <el-main>
         Main Content
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: "줄임말 변환기",
      menu: "메뉴",
      list: "목록",
      setting: '설정',
      developer: "Made by Aftermoon"
    }
  }
}
</script>

<style lang="scss" scoped>
  #app {
    width: 700px;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    max-width: 600px;
    background-color: #69D2E7;
    color: #FFFFFF;
    line-height: 60px;
  }

  .el-header span {
    font-size: 18px;
    font-weight: bold;
  }

  .el-aside {
    color: #333;
  }
</style>
