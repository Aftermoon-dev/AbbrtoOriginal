<template>
  <el-container>
    <el-col style="padding: 10px;">
      <el-row>
        <el-checkbox v-model="enabled">줄임말 변환기 활성화</el-checkbox>
      </el-row>
      <el-row>
        <el-button @click="questionDelete()" type="danger">모든 데이터 초기화</el-button>
      </el-row>
      <el-row>
        <el-button size="mini" @click="gotoLink('https://github.com/Aftermoon-dev/AbbrtoOriginal')" type="primary">GitHub 저장소</el-button>
        <el-button size="mini" @click="gotoLink('https://github.com/Aftermoon-dev/')" type="primary">개발자 GitHub</el-button>
      </el-row>
    </el-col>
  </el-container>  
</template>

<script>
export default {
  data () {
    return {
      enabled: true
    };
  },
  methods: {
    questionDelete() {
      this.$confirm('등록된 모든 데이터가 삭제됩니다. 진행하시겠습니까?', '경고', {
        confirmButtonText: '예',
        cancelButtonText: '아니오',
        type: 'warning'
      }).then(() => {
        this.$message({
          showClose: true,
          type: 'success',
          message: '모두 삭제되었습니다.'
        });
        this.Reset();
      })
    },
    Reset() {
      console.log("All Reset");
    },
    gotoLink(addr) {
      chrome.tabs.create({url: addr, active: true});
    }
  }
}
</script>

<style lang="scss" scoped>
  .footer {
    font-size: 8px;
    color: #BDBDBD;
  }

  .el-row {
    padding: 10px;
  }
</style>
