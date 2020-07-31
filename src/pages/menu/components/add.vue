<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" status-icon ref="form">
        <el-form-item
          label="菜单名称"
          label-width="80px"
          prop="title"
          :rules="[{required:true,message:'请输入菜单名称', trigger: 'blur'}]"
        >
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item
          label="上级菜单"
          label-width="80px"
          prop="pid"
          :rules="[{required:true,type:'number',message:'请选择菜单级别', trigger: 'blur'}]"
        >
          <el-select v-model="form.pid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 单选 -->
        <el-form-item label="菜单类型" label-width="80px">
          <template>
            <el-radio v-model="form.type" :label="1">目录</el-radio>
            <el-radio v-model="form.type" :label="2">菜单</el-radio>
          </template>
        </el-form-item>
        <!-- 菜单图标 -->
        <el-form-item label="菜单图标" label-width="80px" v-if="form.type==1">
          <el-select v-model="form.icon">
            <el-option v-for="item in icons" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <!-- 路由地址 -->
        <el-form-item label="路由地址" label-width="80px" v-else>
          <el-select v-model="form.url">
            <el-option v-for="item in urls" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 开关 -->
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm('form')" v-if="info.isAdd">添加</el-button>
        <el-button type="primary" @click="update('form')" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  requestMenu,
  requestMenuDelete,
  requestMenuUpdate,
  requestDetail,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
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
      //表单信息
      form: {
        pid: "",
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      //图标
      icons: [
        "el-icon-setting",
        "el-icon-s-help",
        "el-icon-s-operation",
        "el-icon-s-grid",
      ],
      //路由集合
      urls: [
        "/member",
        "/menu",
        "/role",
        "/manage",
        "/sort",
        "/spec",
        "/goods",
        "/banner",
        "/seckill",
      ],
      /* rules: {
          title: [
            {required: true, validator: ctitle, trigger: 'blur' }
          ],
        
        } */
    };
  },

  methods: {
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    ...mapActions({
      requestMenuAction: "menu/requestMenuAction",
    }),
    //    添加
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.icon == "" && this.form.url == "") {
            alert("请选择图标或者路由");
            return;
          } else {
            requestMenu(this.form).then((res) => {
              if (res.data.code == 200) {
                //弹框
                successAlert(res.data.msg);
                this.info.show = false;
                this.empty();
                //弹框消失
                this.cancel();
                //再次请求数据
                this.requestMenuAction();
              } else {
                warningAlert(res.data.msg);
              }
            });
            return;
          }
        } else {
          alert("请全部填写!");
          return false;
        }
      });
    },

    //获取一条数据
    getDetail(id) {
      requestDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },

    //更新
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.icon == "" && this.form.url == "") {
            alert("请选择图标或者路由");
            return;
          } else {
            requestMenuUpdate(this.form).then((res) => {
              if (res.data.code == 200) {
                successAlert(res.data.msg);
                this.empty();
                this.cancel();
                this.requestMenuAction();
              } else {
                warningAlert(res.data.msg);
              }
            });
            return;
          }
        } else {
          alert("请全部填写!");
          return false;
        }
      });

      /* requestMenuUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.requestMenuAction();
        } else {
          warningAlert(res.data.msg);
        }
      }); */
    },
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
  },
};
</script>
<style scoped>
</style>