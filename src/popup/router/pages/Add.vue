<template>
    <el-container style="display: flex;">
        <el-col style="text-align: center;">
            <el-row :gutter="10" style="padding: 20px;">
                <el-row :span="5">
                    <span>입력 단어</span>
                    <el-input placeholder="단어를 입력하세요" v-model="abbrWord" ></el-input>
                </el-row>
                <br />
                <el-row :span="5">
                    <span>대체 단어</span>
                    <el-input placeholder="단어를 입력하세요" v-model="originWord"></el-input>
                </el-row>
            </el-row>

            <el-row>
                <el-button @click="Save('Hi')" type="success">저장</el-button>
                <el-button @click="Back()" type="warning">돌아가기</el-button>
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
      Save(word) {
        this.$message({
            showClose: true,
            message: '저장되었습니다!',
            type: 'success'
        });
      },
      Back() {
        this.$router.push('List');
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
