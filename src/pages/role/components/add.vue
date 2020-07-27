<template>
  <!-- =====================角色================ -->
  <div class="add">
    <!-- <el-button type="text" @click="info.show = true">打开嵌套表单的 Dialog</el-button> -->

    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="80px">
          <el-input v-model="form.rolename" clearable></el-input>
        </el-form-item>
        <!-- 角色权限 -->
        <!-- :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"-->
        <el-form-item label="角色权限" label-width="80px">
          <el-tree :data="list" show-checkbox node-key="id" :default-checked-keys='defaultKey' :props="defaultProps" ref="tree"></el-tree>
        </el-form-item>
        <!-- 角色状态 -->
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.show = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添加</el-button>
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  requestMenu,
  requestRoleAdd,
  requestRoleDetail,
  requestRoleList,
  requestRoleUpdate
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  data() {
    return {
      defaultKey:[],
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },

      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  mounted() {
    if (this.list.length === 0) {
      this.requestMenuAction();
    }
  },
  methods: {
    ...mapActions({
      requestMenuAction: "menu/requestMenuAction",
      requestList: "role/requestList",
    }),
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
    //树形结构选中置空
    this.$refs.tree.setCheckedKeys([]);
    },
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //添加==================
    add() {
        //获取tree的key赋值给form.menus
        this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
        //发送添加角色请求
      requestRoleAdd(this.form).then(res=>{
          if(res.data.code==200){
              successAlert(res.data.list)
              this.empty();
              this.cancel();
        //重新请求,更新页面
        this.requestList()
          }
      })
    },
    //获取详细信息==================
    getDetail(id){
      
      requestRoleDetail({id:id}).then(res=>{
        this.form = res.data.list
        this.form.id = id;
        this.defaultKey = JSON.parse(res.data.list.menus)
      })
    },
    //获取修改信息==================
    update(id){
      //获取tree的key赋值给form.menus
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      requestRoleUpdate(this.form).then(res=>{
        successAlert(res.data.msg)
        this.cancel()
        this.empty();
        //重新请求刷新页面
          this.requestList()
      })
    }
  },
};
</script>
<style scoped>
</style>