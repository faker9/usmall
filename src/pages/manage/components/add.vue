<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="所属角色" label-width="80px">
          <el-select v-model="form.roleid" placeholder="请选择" >
            <el-option label="请选择" disabled  value></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" label-width="80px">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>

        <!-- 开关 -->
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添加</el-button>
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  requestManageAdd,
  requestManageDetail,
  requestManageUpdate,
  requestManageList,
  requestRoleList,
} from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  components: {},
  props: ["info"],
  data() {
    return {
      form: {
        roleid: '',
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      requestRoleList: "role/requestList",
      requestList:"manage/requestList",
       requestTotal:'manage/requestTotal'
    }),
    empty() {
      this.form = {
        roleid: '',
        username: "",
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
    add() {
        requestManageAdd(this.form).then(res=>{
            if(res.data.code==200){
                successAlert(res.data.msg)
                this.cancel()
                this.empty()
                // 刷新页面
            this.requestTotal()
            this.requestList()
            }else{
                warningAlert(res.data.msg)
            }
        })
    },
    // 获取一条详细信息
    getDetail(id){
        requestManageDetail({uid:id}).then(res=>{
            this.form = res.data.list,
            this.form.password =''
        })
    },
    update() {
        requestManageUpdate(this.form).then(res=>{
            if(res.data.code==200){
                successAlert(res.data.msg)
                this.cancel(),
                this.empty()
                //重新请求数据 
                this.requestTotal()
                this.requestList()
            }
        })
    },
    
  },
  mounted() {
    if (this.roleList.length == 0) {
      this.requestRoleList();
    }
  },
};
</script>
<style scoped>
</style>