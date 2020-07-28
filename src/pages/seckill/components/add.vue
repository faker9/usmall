<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <!-- 活动名称 -->
        <el-form-item label="活动名称" label-width="80px">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <!-- 活动期限 -->
        <el-form-item label="一级分类" label-width="80px">
          <div class="block">
            
            <el-date-picker
              v-model="form.begintime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>

        <!-- 一级分类 -->
        <el-form-item label="一级分类" label-width="80px" class="sel">
          <el-select v-model="form.first_cateid" placeholder="请选择" @change="changeFirst()">
            <el-option disabled label="请选择" value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 二级分类 -->
        <el-form-item label="二级分类" label-width="80px">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option disabled label="请选择" value="0"></el-option>
             <el-option
              v-for="item in secArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!--三级商品-->
        <el-form-item label="三级分类" label-width="80px">
          <el-select v-model="form.goodsid" placeholder="请选择">
             </el-select>
        </el-form-item>
        <!-- 状态开关 -->
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <!-- <el-button type="primary" @click="add" v-if="info.isAdd">添加</el-button> -->
        <el-button type="primary" @click="update">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  requestMemberDetail,
  requestMemberUpdate,
} from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  components: {},
  props: ["info"],
  data() {
    return {
      secArr:[],
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "sort/list",
    }),
  },
  methods: {
    ...mapActions({
      // requestList: "member/requestList",
      requestList: "sort/requestList",
    }),
    empty() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
    },
    changeFirst(bool){ 
      this.secArr =[]
      // this.form.second_cateid = ""
      // let index
      this.list.forEach(item=>{
        if(item.id == this.form.first_cateid){
           this.secArr = item.children;
        }
      })
      console.log(this.form.second_cateid)
      if(!bool){
      (this.form.second_cateid = "");
      }
    },
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },

    // 获取一条详细信息
    getDetail(id) {
      requestMemberDetail({ uid: id }).then((res) => {
        (this.form = res.data.list), (this.form.password = "");
      });
    },

    //会员修改
    update() {
      requestMemberUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel(), this.empty();
          //重新请求数据
          this.requestList();
        }
      });
    },
  },
  mounted() {
    if (this.list.length == 0) {
      this.requestList();
    }
  },
};
</script>
<style scoped>
</style>