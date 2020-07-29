<template>
  <div class="list">
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="180"></el-table-column>
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
    <!-- <el-pagination background layout="prev, pager, next" :page-size="size" :total="total" @current-change='changeP'></el-pagination> -->
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import {requestSeckillDelete} from '../../../util/request'
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "seckill/list",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "seckill/requestList",
    }),
   
    //编辑=======================================
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
          requestSeckillDelete({ id: id }).then((res) => {
            console.log(222)
            if (res.data.code == 200) {
              successAlert(res.data.msg);        
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
    this.requestList();

  },
};
</script>
<style scoped>
</style>