<template>
    <el-container style="display: flex;">
        <el-col style="text-align: center;">
            <el-row :gutter="10" style="padding: 20px;">
                <el-row :span="5">
                    <span>입력 단어</span>
                    <el-input placeholder="단어를 입력하세요" v-model="abbrWord"></el-input>
                </el-row>
                <br />
                <el-row :span="5">
                    <span>대체 단어</span>
                    <el-input placeholder="단어를 입력하세요" v-model="originWord"></el-input>
                </el-row>
            </el-row>

            <el-row>
                <el-button @click="checkError()" type="success">저장</el-button>
                <el-button @click="clearText()" type="warning">지우기</el-button>
                <el-button @click="Back()" type="primary">돌아가기</el-button>
            </el-row>
        </el-col>
    </el-container>  
</template>

<script>
export default {
  data () {
    return {
      enabled: true,
      abbrWord: "",
      originWord: ""
    };
  },
  methods: {
    checkError() {
        console.log(this.abbrWord + " / " + this.originWord);
        if(this.abbrWord != "" && this.originWord != "") {
            if(this.abbrWord != this.originWord) {
                this.Save();
            }
            else {
                this.$message({
                    showClose: true,
                    message: '같은 단어로는 바꿀 수 없습니다.',
                    type: 'warning'
                });
            }
        }
        else {
            this.$message({
                showClose: true,
                message: '모든 칸을 다 채워주세요.',
                type: 'info'
            });
        } 
    },
    Save() {
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
            var isAlreadyRegistered = false;

            for(var i in wordArray) {
                console.log(wordArray[i]);
                if(wordArray[i]['abbr'] == _this.abbrWord || wordArray[i]['origin'] == _this.abbrWord || 
                    wordArray[i]['abbr'] == _this.originWord || wordArray[i]['origin'] == _this.originWord) {
                    isAlreadyRegistered = true;
                    break;
                }
            }
            if(!isAlreadyRegistered) {
                _this.$message({
                    showClose: true,
                    message: '등록되었습니다! 새로고침을 하셔야 정상적으로 적용됩니다.',
                    type: 'success'
                });
                wordArray.push({'abbr': _this.abbrWord, 'origin': _this.originWord});
                chrome.storage.local.set({'WordList': JSON.stringify(wordArray)}, function() {});
                _this.clearText();
            }
            else {
                _this.$message({
                    showClose: true,
                    message: '이미 등록된 단어입니다.',
                    type: 'warning'
                });
            }
        }).catch(function (err) {
            _this.$message({
                showClose: true,
                message: '등록에 실패했습니다. 이 메시지가 지속된다면 개발자에게 문의해주세요.',
                type: 'danger'
            });
            console.error(err);
        });
    },
    Back() {
        this.$router.push('List');
    },
    clearText() {
        this.abbrWord = "";
        this.originWord = "";
    }
  }
}
</script>

<style lang="scss" scoped>
    .el-row span {
        font-size: 15px;
        font-weight: bold;
    }
</style>
