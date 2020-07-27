<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <!-- 手机号 -->
        <el-form-item label="手机号" label-width="80px">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item label="昵称" label-width="80px">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" label-width="80px">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>

        <!-- 状态开关 -->
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <!-- <el-button type="primary" @click="add" v-if="info.isAdd">添加</el-button> -->
        <el-button type="primary" @click="update" >修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
requestMemberDetail,
requestMemberUpdate
} from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  components: {},
  props: ["info"],
  data() {
    return {
      form: {
         phone: '',
        nickname: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      List: "member/list",
    }),
  },
  methods: {
    ...mapActions({
      requestList:"member/requestList",
    }),
    empty() {
      this.form = {
        phone: '',
        nickname: "",
        password: "",
        status: 1,
      };
    },
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },

    // 获取一条详细信息
    getDetail(id){
        requestMemberDetail({uid:id}).then(res=>{
            this.form = res.data.list,
            this.form.password =''
        })
    },
    //会员修改
    update() {
        requestMemberUpdate(this.form).then(res=>{
            if(res.data.code==200){
                successAlert(res.data.msg)
                this.cancel(),
                this.empty()
                //重新请求数据 
                this.requestList()
            }
        })
    },
    
  },
  mounted() {
    /* if (this.List.length == 0) {
      this.requestList();
    } */
  },
};
</script>
<style scoped>
</style>