<template>
  <el-container>
    <el-table :data="tableData">
      <template slot-scope="scope">
        <el-table-column prop="abbr" label="입력 단어">
        </el-table-column>
        <el-table-column prop="origin" label="바꿀 단어">
        </el-table-column>
        <el-table-column prop="delete">
          <el-button
            size="mini"
            type="danger"
            @click="removeItem(scope.row)">삭제
          </el-button>
        </el-table-column>
      </template>
    </el-table>
  </el-container>  
</template>

<script>
export default {
  data () {
    const item = {
      abbr: "ㅎㅇ",
      origin: "하이"
    };
    return {
      tableData: Array(5).fill(item)
    }
  },
  methods: {
    removeItem(item) {
      this.$confirm('정말로 삭제하시겠습니까?', '경고', {
        confirmButtonText: '예',
        cancelButtonText: '아니오',
        type: 'warning'
      }).then(() => {
        this.$message({
          showClose: true,
          type: 'success',
          message: '삭제되었습니다.'
        });
        this.remove(item);
      })
    },
    remove(item) {
      console.log('Remove - ' + item);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
