<template>
  <div class="add">
    <el-dialog :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="一级分类" label-width="80px" class="sel">          
          <el-select v-model="form.first_cateid" placeholder="请选择" @change='change' >
                <el-option disabled label="请选择" value="0"></el-option>
               <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id" ></el-option>
          </el-select>
        
        </el-form-item>
        <el-form-item label="二级分类" label-width="80px">
          <el-select v-model="form.second_cateid" placeholder="请选择" class="sel2" ref = 'sel2'>
             <el-option disabled label="请选择" value="0"></el-option>
            <el-option v-for="item in secArr" :key="item" :label="item" :value="item" ></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="商品名称" label-width="80px">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" label-width="80px">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="80px">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
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

        <el-form-item label="商品规格" label-width="80px">
          <el-select v-model="form.specsid" placeholder="请选择" @change="change2">
            <el-option v-for="item in specList" :key='item.id' :label="item.specsname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="80px">
          <el-select v-model="form.specsattr" placeholder="请选择" multiple >
            <el-option label="区域一" value="shanghai"></el-option>
             <el-option v-for="item in secArr2" :key="item" :label="item" :value="item" ></el-option>
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
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
      secArr:[],
      secArr2:[],
      imageUrl: "",
      form: {
        first_cateid: '',
        second_cateid: '',
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: '',
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "sort/list",
      specList:'spec/list'
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
        despecsidsc: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      }),
        (this.imageUrl = "");
    },
    cancel(){
      this.info.show = false
    },
    add(){
      requestGoodsAdd(this.form).then(res=>{
        if(res.data.code == 200){
          successAlert(res.data.msg)
          this.cancel()
          this.empty()
        }else{
          warningAlert(res.data.msg)
        }
      })
    },
    ...mapActions({
      requestList : 'sort/requestList',
      requestList2 : 'spec/requestList'
    }),
    change(){
      console.log('change')
      this.secArr  = [],
      this.form.second_cateid = ''
      console.log(this.form.specsattr)
      this.list.forEach(item=>{
        if(item.id == this.form.first_cateid){
            item.children.forEach((item,index)=>{
              this.secArr[index] = item.catename
            })
          
        }
      })  
    },
    change2(){
    this.secArr2  = [],
    this.form.specsattr = '',
      this.specList.forEach(item=>{
        if(item.id == this.form.specsid){
          this.secArr2 = JSON.parse(item.attrs)      
        }
      })
    }
  },
  mounted(){
    this.requestList(),
    this.requestList2()
  }
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