<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" :rules="rules" ref="form">
        <!-- 活动名称 -->
        <el-form-item label="活动名称" label-width="80px" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <!-- 活动期限 -->
        <el-form-item label="活动期限" label-width="80px" prop="endtime">
          <div class="block">
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <!-- 一级分类 -->
        <el-form-item label="一级分类" label-width="80px" class="sel" prop="first_cateid">
          <el-select v-model="form.first_cateid" placeholder="请选择" @change="changeFirst()">
            <el-option disabled label="请选择" value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 二级分类 -->
        <el-form-item label="二级分类" label-width="80px" prop="second_cateid">
          <el-select v-model="form.second_cateid" placeholder="请选择" @change="changeSecond()">
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
        <el-form-item label="三级分类" label-width="80px" prop="goodsid">
          <el-select v-model="form.goodsid" placeholder="请选择">
            <el-option
              v-for="item in secArr2"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 状态开关 -->
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
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
import {
  requestSeckillUpdate,
  requestSeckillDetail,
  requestSeckillAdd,
  requestGoodsList,
} from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  components: {},
  props: ["info"],
  data() {
    var timeCheck = (rule, value, callback) => {
      this.getDate(this.date)
        if (isNaN(value)) {
          callback(new Error('请选择时间'));
        } else {
          callback();
        }
      };
    return {
      secArr: [],
      secArr2: [],
      date: [],
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      rules: {
        title: [
          {
            required: true,
            message: "请选择活动名称",
            trigger: "blur",
          },
        ],
        endtime: [
          {
            required: true,
            validator:timeCheck,
            trigger: "change",
          },
        ],
        first_cateid: [
          {
            required: true,
            message: "请选择一级分类",
            trigger: "change",
          },
        ],
        second_cateid: [
          {
            required: true,
            message: "请选择二级分类",
            trigger: "change",
          },
        ],
        goodsid: [
          {
            required: true,
            message: "请选择商品",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "sort/list",
      goodsList: "goods/list",
      seckillList: "seckill/list",
    }),
  },
  methods: {
    ...mapActions({
      requestList: "sort/requestList",
      requesSeckillList: "seckill/requestList",
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
      this.secArr = [];
      this.secArr2 = [];
      this.date = [];
    },
    changeFirst(bool) {
      this.secArr = [];
      // this.getDate(this.date)
      this.list.forEach((item) => {
        if (item.id == this.form.first_cateid) {
          this.secArr = item.children;
        }
      });
      if (!bool) {
        this.form.second_cateid = "";
      }
    },
    //更改二级菜单时
    changeSecond(bool) {
      this.secArr2 = [];
      requestGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        if (res.data.code == 200) {
          this.secArr2 = res.data.list;
        }
      });
    },
    //获取时间错
    getDate(date) {
      this.form.begintime = Date.parse(new Date(date[0]));
      this.form.endtime = Date.parse(new Date(date[1]));
    },
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //添加信息
    add(formName) {
       this.getDate(this.date)
        this.$refs[formName].validate((valid) => {
        if (valid) {
            requestSeckillAdd(this.form).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.cancel();
              this.empty();
              this.requesSeckillList();
            } else {
              warningAlert(res.data.msg);
            }
          })
          } else {
          warningAlert("请全部填写完毕");
          return false;
        }
      })
       
      
    },
    // 获取一条详细信息
    getDetail(id) {
      requestSeckillDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id
        this.date = [
          JSON.parse(this.form.begintime),
          JSON.parse(this.form.endtime),
        ];
        this.changeFirst(true)
        this.changeSecond(true)
      });
    },

    //会员修改
    update(formName) {
      this.getDate(this.date)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          requestSeckillUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel(),
           this.empty();
          //重新请求数据
          this.requestList();
          this.requesSeckillList()
        }else{
          warningAlert(res.data.msg)
        }
      });
          } else {
          warningAlert("请全部填写完毕");
          return false;
        }
      })
      
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