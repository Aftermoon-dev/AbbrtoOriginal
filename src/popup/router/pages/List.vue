<template>
  <el-container>
    <el-table :data="tableData">
        <el-table-column prop="abbr" label="입력 단어">
        </el-table-column>
        <el-table-column prop="origin" label="바꿀 단어">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="delWarning(scope.$index)">삭제
            </el-button>
          </template>
        </el-table-column>
    </el-table>
  </el-container>  
</template>

<script>
function getLocalWordList() {
  return new Promise(function (resolve, reject) {
        chrome.storage.local.get('WordList', function(items){
        if (!chrome.runtime.error) {
          resolve(items);
        }
        reject(new Error(chrome.runtime.error));
     });
  });
}

export default {
  data () {
    return {
      tableData: []
    }
  },
  created() {
    var _this = this;
    // Check First Initial
    chrome.storage.local.get(['firstInit'], function (items) {
      if(items.firstInit == undefined) {
        console.log("Setting First Data...");
        var firstList = JSON.stringify([{"abbr": "ㅎㅇ", "origin": "안녕하세요"}, {"abbr": "ㅅㄱ", "origin": "수고하셨습니다"}]);
        chrome.storage.local.set({'enable': true}, function() {});
        chrome.storage.local.set({'firstInit': false}, function() {});
        chrome.storage.local.set({'WordList': firstList}, function() {});
      }
      _this.writeList();
    });
  },
  methods: {  
    delWarning(idx) {
      console.log(idx);
      this.$confirm('정말 "' + this.tableData[idx]['abbr'] + '/' + this.tableData[idx]['origin'] + '"을(를) 삭제하시겠습니까?', '경고', {
        confirmButtonText: '예',
        cancelButtonText: '아니오',
        type: 'warning'
      }).then(() => {
        this.deleteItem(this.tableData[idx]['abbr']);
      }).catch(() => {});
    },
    deleteItem(targetAbbr) {
      var _this = this;
      getLocalWordList().then(function (data) {
        _this.$message({
          showClose: true,
          message: '삭제되었습니다!',
          type: 'success'
        });
        var wordArray = Object.values(JSON.parse(data.WordList));
        console.log('original : ' + JSON.stringify(wordArray));
        wordArray = wordArray.filter(wordArray => wordArray.abbr !== targetAbbr)
        chrome.storage.local.set({'WordList': JSON.stringify(wordArray)}, function() {});
        console.log('change : ' + JSON.stringify(wordArray));
        _this.resetTable();
      }).catch(function (err) {
        console.error(err);
      });
    },
    writeList() {
      var _this = this;
      getLocalWordList().then(function (data) {
        if(data.WordList != undefined) {
          var objectWord = JSON.parse(data.WordList);
          for(var i in objectWord) {
            if(objectWord[i] != null && objectWord[i] != undefined) {
              _this.tableData.push(objectWord[i]);
            }
          }
        }
      }).catch(function (err) {
        console.error(err);
      });
    },
    resetTable() {
      this.tableData = [];
      this.writeList();
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
