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
              @click="removeItem(tableData[scope.$index]['abbr'])">삭제
            </el-button>
          </template>
        </el-table-column>
    </el-table>
  </el-container>  
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  created() {
    // Check First Initial
    var isFirst = this.$localStorage.get('firstInit', true);
    if(isFirst) {
      this.$localStorage.set('WordList', '[{"abbr": "ㅎㅇ", "origin": "안녕하세요"}, {"abbr": "ㅅㄱ", "origin": "수고하셨습니다"}]');
      this.$localStorage.set('Enable', true);
      this.$localStorage.set('firstInit', false);
    }
    // Load List
    this.getList();
  },
  methods: {
    removeItem(abbr) {
      this.$confirm('정말로 삭제하시겠습니까?', '경고', {
        confirmButtonText: '예',
        cancelButtonText: '아니오',
        type: 'warning'
      }).then(() => {
        this.remove(abbr);
      }).catch(() => {});
    },
    remove(item) {
      console.log("Remove " + item);
      this.$message({
          showClose: true,
          type: 'success',
          message: '삭제되었습니다.'
      });

      var jsonWord = this.$localStorage.get('WordList', []);
      var objectWord = JSON.parse(jsonWord);

      for(var i in objectWord) {
        if(objectWord[i] != null && objectWord[i] != undefined) {
          if(objectWord[i]['abbr'] == item) {
            objectWord[i] = null;
          }
        }
      }
      this.$localStorage.set('WordList', JSON.stringify(objectWord));
      this.resetTable();
    },
    getList() {
      var jsonWord = this.$localStorage.get('WordList', []);
      var objectWord = JSON.parse(jsonWord);
      console.log(objectWord);

      for(var i in objectWord) {
        if(objectWord[i] != null && objectWord[i] != undefined) {
          console.log("Add Item " + i + " : " + objectWord[i]['abbr'] + "/" + objectWord[i]['origin']);
          this.tableData.push(objectWord[i]);
        }
      }
    },
    resetTable() {
      this.tableData = [];
      this.getList();
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
