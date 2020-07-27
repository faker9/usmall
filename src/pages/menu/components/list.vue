<template>
  <div class="list">
    <!-- 表格 -->
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="编号" sortable width="180"></el-table-column>
      <el-table-column prop="title" label="标题" sortable width="180"></el-table-column>
      <el-table-column prop="icon" label="图标"></el-table-column>
      <el-table-column prop="url" label="地址"></el-table-column>
      <el-table-column label="状态">
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
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
// import { requestList } from "../../../util/request";
import { requestMenuDelete } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  components: {},
  data() {
    return {
      
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      requestMenuAction: "menu/requestMenuAction",
    }),

    // 点击编辑
    edit(id){
        this.$emit('edit',id)
    },
    // 删除
    del(id) {
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        requestMenuDelete({id:id}).then((res) => {
            if(res.data.code == 200){
                successAlert(res.data.msg);
                this.requestMenuAction()
            }else{
                warningAlert(res.data.msg)
            }
        });
      }).catch(()=>{
          this.$message({
            type: "info",
            message: "已取消删除",
          });
      })
    },
  
  },
  mounted() {
    this.requestMenuAction();
  },
};
</script>
<style scoped>
</style>