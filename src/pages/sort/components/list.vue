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
      <el-table-column prop="id" label="分类编号" sortable width="180"></el-table-column>
      <el-table-column prop="catename" label="分类名称" sortable width="180"></el-table-column>
      <el-table-column prop="icon" label="图片">
        <template slot-scope="scope">
          <img class="img" :src="$preImg+scope.row.img" alt="">
        </template>
        
        
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <!-- <el-button type="danger" @click="del(scope.row.id)">删除</el-button> -->
          <del-btn @confirm ='del(scope.row.id)'></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { requestSortDelete } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  components: {},
  data() {
    return {
      
    };
  },
  computed: {
    ...mapGetters({
      list: "sort/list",
    }),
  },
  methods: {
    ...mapActions({
      requestList: "sort/requestList",
    }),

    // 点击编辑
    edit(id){
        this.$emit('edit',id)
    },
    // 删除
    del(id) {     
        requestSortDelete({id:id}).then((res) => {
            if(res.data.code == 200){
                successAlert(res.data.msg);
                this.requestList()
            }else{
                warningAlert(res.data.msg)
            }
        });
    },
  
  },
  mounted() {
    this.requestList();
  },
};
</script>
<style scoped>
.img{
  width: 100px;
  height: 100px;
}
</style>