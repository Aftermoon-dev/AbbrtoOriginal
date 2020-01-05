<template>
  <div id="app">
    <el-container style="min-height: 300px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246);">
        <el-menu :default-openeds="['1']" default-active="1-1" :router="true">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>{{ menu }}</template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="navigate('List')"><i class="el-icon-s-order"></i>{{ list }}</el-menu-item>
              <el-menu-item index="1-2" @click="navigate('Setting')"><i class="el-icon-set-up"></i>{{ setting }}</el-menu-item>
              <br />
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container style="width=400px">
        <el-header>
          <span> {{title}} </span>
          <el-row v-if="this.$router.currentRoute.name == 'List'">
            <el-button id="btn_add" @click="addItem()" icon="el-icon-plus" circle></el-button>
          </el-row>
        </el-header>
        <router-view></router-view>
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
      isList: true
    }
  },
  methods: {
    navigate(page) {
      this.$router.push(page);
    },
    addItem() {
      this.navigate("Add");
    }
  },
  created() {
      this.navigate("List");
  }
}
</script>

<style lang="scss" scoped>
  #app {
    max-height: 600px;
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
