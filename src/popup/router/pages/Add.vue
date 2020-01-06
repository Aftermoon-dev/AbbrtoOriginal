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
                <el-button @click="Save()" type="success">저장</el-button>
                <el-button @click="clearText()" type="primary">초기화</el-button>
                <el-button @click="Back()" type="warning">돌아가기</el-button>
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
      Save() {
        console.log(this.abbrWord + " / " + this.originWord);
        if(this.abbrWord != "" && this.originWord != "") {
            if(this.abbrWord != this.originWord) {
                this.$message({
                    showClose: true,
                    message: '저장되었습니다!',
                    type: 'success'
                });

                var jsonWord = this.$localStorage.get('WordList', []);
                var objectWord = JSON.parse(jsonWord);

                var alreadyCheck = false;   
                var loopCheck = false;
                for(var i in objectWord) {
                    if(objectWord[i] != null) {
                        if(objectWord[i]['abbr'] == this.abbrWord) {
                            alreadyCheck = true;
                            break;
                        }
                        else if(objectWord[i]['origin'] == this.abbrWord) {
                            loopCheck = true;
                            break;
                        }
                    }
                }

                if(!alreadyCheck && !loopCheck) {
                    this.$message({
                        showClose: true,
                        message: '등록되었습니다.',
                        type: 'success'
                    });
                    objectWord.push({'abbr': this.abbrWord, 'origin': this.originWord});
                    this.$localStorage.set('WordList', JSON.stringify(objectWord));
                    this.clearText();
                }
                else {
                    this.$message({
                        showClose: true,
                        message: '이미 등록된 단어입니다.',
                        type: 'warning'
                    });
                }
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
