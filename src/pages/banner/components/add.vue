<template>
  <div class="add">
    <el-dialog  :visible.sync="info.show">
      <el-form :model="form">

        <!-- 分类名称 -->
        <el-form-item label="标题" label-width="80px">
          <el-input v-model="form.title" clearable></el-input>
        </el-form-item>

        <!-- 图片 -->
        <div class="img-box">
          <el-form-item label="图片" label-width="80px">
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :on-change="changImg"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </div>

        <!-- 开关 -->
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm" v-if="info.isAdd">确 定</el-button>
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  requestBannerAdd,
  requestBannerDetail,
  requestBannerUpdate
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  components: {},
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  data() {
    return {
      //表单信息
      form: {
        title: "",
        img: null,
        status: 1,
      },
      imageUrl:''
    };
  },

  methods: {
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //变更图片
    changImg(e){
      var file = e.raw
      // 生成一个URL地址，赋值给imageUrl,展示出来
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file
    },
    ...mapActions({
      requestList: "banner/requestList",
    }),
    //添加
    confirm() {
      requestBannerAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //弹框
          successAlert(res.data.msg);
          this.info.show = false;
          this.empty();
          //弹框消失
          this.cancel();
          //再次请求数据
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //获取一条数据
    getDetail(id) {
      requestBannerDetail({ id: id }).then((res) => {
        this.form = res.data.list;

        this.form.id = id;
        // 生成一个URL地址，赋值给imageUrl,展示出来
       this.imageUrl = this.$preImg+ this.form.img
      });
    },

    //更新
    update() {
      requestBannerUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    empty() {
      this.form = {
       title: "",
        img: null,
        status: 1,
      };
       this.imageUrl=''
    },
  },
};
</script>
<style scoped lang= 'stylus'>
.img-box >>> .el-upload {
  border: 1px dashed #d9d9d9 ;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.img-box >>> .el-upload:hover {
  border-color: #409EFF ;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>