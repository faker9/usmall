<template>
<div class="role">
    <el-button type='primary' round @click='add'>添加</el-button>
     <!-- 添加弹框 -->
    <v-add :info="info" ref='add'></v-add>

    <!-- 列表 -->
    <v-list @edit='edit'></v-list>
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
    info: {
        title: "角色修改",
        show: false,
        isAdd:true
      },
};
},
methods: {
    //点击添加
    add(){
        this.info.show=true;
        this.info.title = '角色添加';
        this.info.isAdd = true;
    },
    edit(id){
         this.info.show=true;
        this.info.title = '角色修改';
        this.info.isAdd = false;
        this.$refs.add.getDetail(id);
    }
}
};
</script>
<style scoped>

</style>