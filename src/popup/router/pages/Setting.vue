<template>
  <el-container>
    <el-col style="padding: 10px;">
      <el-row>
        <el-checkbox v-model="enabled" @change="saveEnableData()">줄임말 변환기 활성화</el-checkbox>
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
  created() {
    this.enabled = this.$localStorage.get('Enable', true);
  },
  methods: {
    questionDelete() {
      this.$confirm('등록된 모든 데이터가 삭제되고 초기 상태로 돌아갑니다. 진행하시겠습니까?', '경고', {
        confirmButtonText: '예',
        cancelButtonText: '아니오',
        type: 'warning'
      }).then(() => {
        this.$message({
          showClose: true,
          type: 'success',
          message: '초기화가 완료되었습니다!'
        });
        console.log("All Data Reset!");
        this.$localStorage.clear();
      })
    },
    gotoLink(addr) {
      chrome.tabs.create({url: addr, active: true});
    },
    saveEnableData() {
      this.$localStorage.set('Enable', this.enabled);
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
