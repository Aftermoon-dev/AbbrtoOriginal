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
        <el-button size="mini" @click="gotoLink('https://github.com/Aftermoon-dev/AbbrtoOriginal/wiki/Help-(%EB%8F%84%EC%9B%80%EB%A7%90)')" type="primary">도움말</el-button>
        <el-button size="mini" @click="gotoLink('https://github.com/Aftermoon-dev/AbbrtoOriginal')" type="primary">GitHub 저장소</el-button>
        <el-button size="mini" @click="gotoLink('https://github.com/Aftermoon-dev/')" type="primary">개발자 GitHub</el-button>
      </el-row>
    </el-col>
  </el-container>  
</template>

<script>
var data = {
  enabled: true
}
export default {
  data () {
    return data
  },
  created() {
    chrome.storage.local.get('enable', function (items) {
      data.enabled = items.enable;
      console.log('Load ' + items.enable);
    });
  },
  methods: {
    questionDelete() {
      this.$confirm('등록된 모든 데이터가 삭제되고 초기 상태로 돌아갑니다. 진행하시겠습니까?', '경고', {
        confirmButtonText: '예',
        cancelButtonText: '아니오',
        type: 'warning'
      }).then(() => {
        var _this = this;
        chrome.storage.local.clear(function() {
          var err = chrome.runtime.lastError;
          if (err) {
            _this.$message({
              showClose: true,
              type: 'danger',
              message: '초기화에 실패하였습니다. 지속적으로 발생할 경우 개발자에게 문의해주세요.'
            });
            console.error(err);
          }
          else {
            console.log("All Data Reset!");
            _this.$message({
              showClose: true,
              type: 'success',
              message: '초기화가 완료되었습니다!'
            });
            _this.$router.push('List');
          }
        });
      }).catch(() => {});
    },
    gotoLink(addr) {
      chrome.tabs.create({url: addr, active: true});
    },
    saveEnableData() {
      chrome.storage.local.set({'enable': data.enabled}, function() {});
      console.log('Save ' + data.enabled);
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
