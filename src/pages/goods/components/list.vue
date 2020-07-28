<template>
  <!-- =====================商品列表=================================== -->
  <div class="list2">
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="80"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="120"></el-table-column>
      <el-table-column prop="price" label="商品价格" width="80"></el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="80"></el-table-column>
      <el-table-column label="图片" width="180">
        <template slot-scope="scope">
          <img id="img" :src="$preImg+scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column label="是否新品" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isnew == 1">是</el-tag>
          <el-tag type="warning" v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.ishot == 1">是</el-tag>
          <el-tag type="warning" v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="状态" width="100">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
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
import { mapActions, mapGetters } from "vuex";
import { requestGoodsDelete } from "../../../util/request";
import { successAlert, warningAlert, deleteAlert } from "../../../util/alert";
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "goods/list",
       total:'goods/total',
      size:'goods/size',
       page:'goods/page'
    }),
  },
  data() {
    return {
      imgUrl: "",
    };
  },
  methods: {
    ...mapActions({
      requestList: "goods/requestList",
      requestTotal: "goods/requestTotal",
       changePage:'goods/changePage',
    }),
    //编辑
    edit(id) {
      this.$emit("edit", id);
    },
    //删除
    del(id) {
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then((res) => {
        requestGoodsDelete({ id: id }).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            // 当前页面删完页数减一
            if (
              res.data.list.length % this.size == 0 &&
              res.data.list.length > 0
            ) {
              this.changePage(this.page - 1);
            }
            this.requestTotal();
            this.requestList();
          } else {
            warningAlert(res.data.msg);
          }
        });
      });
    },
    //分页
    changeP(i){
      this.changePage(i)
      this.requestList()  
    }
  },
  mounted() {
    this.requestList();
    this.requestTotal();
  },
};
</script>
<style scoped>
#img {
  width: 100px;
  height: 100px;
}
</style>