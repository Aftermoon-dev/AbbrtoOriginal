<template>
    <el-container>
        <el-row style="text-align: center;">
            <el-input type="textarea" :rows="10" :cols="64" placeholder="입력해주세요" v-model="text" @input="checkText"></el-input>
            <br />
            <br />
            <el-row>
                <el-button @click="saveText()" type="success">저장</el-button>
                <el-button @click="clearText()" type="primary">비우기</el-button>
            </el-row>
            <br />
        </el-row>
        
    </el-container>  
</template>

<script>
export default {
  data () {
    return {
        text: ""
    };
  },
  created() {
      var _this = this;
      function loadData() {
            return new Promise(function (resolve, reject) {
                chrome.storage.local.get('popupText', function(items){
                    if (!chrome.runtime.error) {
                        resolve(items);
                    }
                    reject(new Error(chrome.runtime.error));
                });
            });
        }
        loadData().then(function (data) {
            _this.text = data.popupText;
        });
  },
  methods: {
    saveText() {
        var _this = this;
        chrome.storage.local.set({'popupText': _this.text}, function() {
            _this.$message({
                showClose: true,
                message: '저장되었습니다!',
                type: 'success'
            });
        });
    },
    clearText() {
        this.text = "";
    },
    checkText() {
        var _this = this;
        function loadData() {
            return new Promise(function (resolve, reject) {
                chrome.storage.local.get('WordList', function(items){
                    if (!chrome.runtime.error) {
                        resolve(items);
                    }
                    reject(new Error(chrome.runtime.error));
                });
            });
        }

        loadData().then(function (data) {
            var wordArray = Object.values(JSON.parse(data.WordList));
            for(var i in wordArray) {
                if(_this.text.indexOf(wordArray[i]['abbr'] + ' ') != -1) {
                    _this.text = _this.text.replace(wordArray[i]['abbr'] + ' ', wordArray[i]['origin']);
                }
            }
        });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
