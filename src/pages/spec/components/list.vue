<template>
  <div class="list">
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>
      <el-table-column prop="attrs" label="规格属性" width="180">
        <template slot-scope="scope">
         <el-tag v-for="item in  JSON.parse(scope.row.attrs)" :key="item">{{item}}</el-tag>
        </template>
        
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- =============分页器========= -->
    <el-pagination background layout="prev, pager, next" :page-size="size" :total="total" @current-change='changeP'></el-pagination>
  </div>
</template>
<script>
import { requestSpecDelete,requestSpecList} from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "spec/list",
      total:'spec/total',
      size:'spec/size',
       page:'spec/page'
    }),
  },
  data() {
    return {
 
    };
  },
  methods: {
    ...mapActions({
      requestList: "spec/requestList",
      requestTotal:'spec/requestTotal',
      changePage:'spec/changePage',
      requestTotal:'spec/requestTotal'
    }),
    //改变页数时===================================
    changeP(i){
        this.changePage(i)
        this.requestList()       
    },
    //添加=======================================
    edit(id) {
      this.$emit("edit", id);
    },
    //删除=======================================
    del(id) {
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((res) => {
          requestSpecDelete({ id: id }).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              // 当前页面删完页数减一
               if(res.data.list.length%this.size==0&&res.data.list.length>0){
                  this.changePage(this.page-1)
              }
              this.requestTotal()
              this.requestList();   
              
                         
            } else {
              warningAlert(res.data.msg);
            }
          });
        })
   
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
      this.requestTotal()
      this.requestList();
  },
};
</script>
<style scoped>
</style>