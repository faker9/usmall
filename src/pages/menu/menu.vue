<template>
  <div class="menu">
    <el-button type="primary" round @click="add">添加</el-button>
    <v-add :info="info" ref="add"></v-add>
    <v-list @edit="edit" ></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
        info:{
          show:false,
           title:"菜单添加",
            isAdd:true  
        }
        
    };
  },
/*   computed(){
      ...mapGetters({
          
      })
  }, */
  methods: {
      add(){
          this.info.show=true;
           this.info.title = '菜单添加',
          this.info.isAdd = true
      },
      edit(id){
          this.info.show =true,
          this.info.title = '菜单修改',
          this.info.isAdd = false
          // console.log(this.$refs.add,'234657')
            this.$refs.add.getDetail(id);
      }
  },

};
</script>
<style scoped>
</style>