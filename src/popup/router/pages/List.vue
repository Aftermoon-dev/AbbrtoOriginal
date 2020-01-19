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
        chrome.storage.local.set({'WordList': firstList}, function() {});
        chrome.storage.local.set({'enable': true}, function() {});
        chrome.storage.local.set({'firstInit': false}, function() {});
        
        _this.$confirm('줄임말 변환기를 설치해주셔서 감사합니다! 도움말 페이지를 여시겠습니까?', '알림', {
          confirmButtonText: '예',
          cancelButtonText: '아니오',
          type: 'primary'
        }).then(() => {
          chrome.tabs.create({url: "https://github.com/Aftermoon-dev/AbbrtoOriginal/wiki/Help-(%EB%8F%84%EC%9B%80%EB%A7%90)", active: true});
        }).catch(() => {});
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
      var wordArray = this.tableData;
      wordArray = wordArray.filter(wordArray => wordArray.abbr !== targetAbbr)
      this.tableData = wordArray;
      chrome.storage.local.set({'WordList': JSON.stringify(wordArray)}, function() {});
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
