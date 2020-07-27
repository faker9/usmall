<template>
  <div class="list">
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="管理员编号" width="180"></el-table-column>
      <el-table-column prop="username" label="管理员名称" width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180"></el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- =============分页器========= -->
    <el-pagination background layout="prev, pager, next" :page-size="size" :total="total" @current-change='changeP'></el-pagination>
  </div>
</template>
<script>
import { requestManageDelete } from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "manage/list",
      total:'manage/total',
      size:'manage/size',
      page:'manage/page'
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "manage/requestList",
      requestTotal:'manage/requestTotal',
      changePage:'manage/changePage',
      requestTotal:'manage/requestTotal'
    }),
    //改变页数时===================================
    changeP(page){
        this.changePage(page)
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
          requestManageDelete({ uid: id }).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              if(res.data.list.length%this.size==0){
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
    
    console.log(this.total,this.size)
  },
};
</script>
<style scoped>
</style>