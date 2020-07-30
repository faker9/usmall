<template>
  <div class="add">
    <el-dialog :visible.sync="info.show" @opened="createEditor">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="一级分类" label-width="80px" class="sel" prop="first_cateid">
          <el-select v-model="form.first_cateid" placeholder="请选择" @change="changeFirst()">
            <el-option disabled label="请选择" value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="80px" prop="second_cateid">
          <el-select v-model="form.second_cateid" placeholder="请选择" class="sel2" ref="sel2">
            <el-option disabled label="请选择" value="0"></el-option>
            <el-option
              v-for="item in secArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" label-width="80px" prop="goodsname">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" label-width="80px" prop="price">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="80px" prop="market_price">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <div class="img-box">
          <el-form-item label="图片" label-width="80px" prop="img">
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

        <el-form-item label="商品规格" label-width="80px" prop="specsid">
          <el-select v-model="form.specsid" placeholder="请选择" @change="change2()">
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="80px" prop="specsattr">
          <el-select v-model="form.specsattr" placeholder="请选择" multiple>
            <el-option label="请选择" disabled value></el-option>
            <el-option v-for="item in secArr2" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" label-width="80px">
          <template>
            <el-radio v-model="form.isnew" :label="1">是</el-radio>
            <el-radio v-model="form.isnew" :label="2">否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="80px">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" label-width="80px" prop="description"></el-form-item>
        <div id="desc"></div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add('form')" v-if="info.isAdd">添加</el-button>
        <el-button type="primary" @click="update('form')" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import E from "wangeditor";
import {
  requestGoodsAdd,
  requestGoodsDetail,
  requestGoodsUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      secArr: [],
      secArr2: [],
      imageUrl: "",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      rules: {
        first_cateid: [
          { required: true, message: "请选择一级菜单", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级菜单", trigger: "change" },
        ],
        goodsname: [
          { required: true, message: "请选择商品", trigger: "change" },
        ],
        price: [{ required: true, message: "请输入价格", trigger: "change" }],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "change" },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "change" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "sort/list",
      specList: "spec/list",
    }),
  },
  methods: {
    changImg(e) {
      var file = e.raw;
      //设置url地址
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    empty() {
      (this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsattr: [],
        specsid: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      }),
        (this.imageUrl = "");
      this.secArr = [];
      this.secArr2 = [];
      this.editor.txt.html("");
    },
    cancel() {
      this.info.show = false;
      this.empty();
    },
    // 添加商品信息=========================================================
    add(formName) {
      this.form.description = this.editor.txt.html();

      /* console.log(this.form.description)
      console.log(this.form.specsattr)
      console.log(this.imageUrl) */
      if (this.imageUrl == "") {
        warningAlert("选择图片");
        return;
      } else if (this.form.specsattr == "[]") {
        warningAlert("请选择属性");
        return;
      } else if (this.form.description == "<p><br></p>") {
        warningAlert("请写入描述");
        
        return;
      }
      
      this.$refs[formName].validate((valid) => {
        this.form.specsattr = JSON.stringify(this.form.specsattr);
        if (valid) {
          requestGoodsAdd(this.form).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.cancel();
              this.empty();
              this.requestTotal();
              this.requestGoodsList();
            } else {
              warningAlert(res.data.msg);
            }
          });
        } else {
          warningAlert("请全部填写完毕");
          return false;
        }
      });

    },

    //获取详细信息==========================================================
    getDetail(id) {
      requestGoodsDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.imageUrl = this.$preImg + this.form.img;
          this.form.specsattr = JSON.parse(this.form.specsattr);
          this.form.id = id;
          this.change2(true);
          this.changeFirst(true);
        }
      });
    },
    //更新
    update() {
      this.form.description = this.editor.txt.html();
      this.form.specsattr = JSON.stringify(this.form.specsattr);
      requestGoodsUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();

          this.requestGoodsList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    ...mapActions({
      requestList: "sort/requestList",
      requestSpecList: "spec/requestList",
      requestGoodsList: "goods/requestList",
      requestTotal: "goods/requestTotal",
    }),
    // 一级分类改变之后
    changeFirst(bool) {
      this.list.forEach((item) => {
        if (item.id == this.form.first_cateid) {
          this.secArr = item.children;
        }
      });
      if (!bool) {
        this.form.second_cateid = "";
      }
    },
    //商品规格一级菜单改变之后
    change2(bool) {
      this.secArr2 = [];
      if (!bool) {
        this.form.specsattr = [];
      }
      this.specList.forEach((item) => {
        if (item.id == this.form.specsid) {
          this.secArr2 = JSON.parse(item.attrs);
        }
      });
    },
    // 创建编辑器
    createEditor() {
      this.editor = new E("#desc");
      this.editor.create();
      //设置值
      this.editor.txt.html(this.form.description);
    },
  },

  // 挂载页面时需要做的事
  mounted() {
    if (this.list.length == 0) {
      this.requestList();
    }

    this.requestSpecList(true);
  },
};
</script>
<style scoped lang= 'stylus'>
.img-box >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.img-box >>> .el-upload:hover {
  border-color: #409EFF;
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