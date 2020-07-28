<template>
<div class="manage">
    <!-- <el-button type="primary" round @click='add'> 添加</el-button> -->
    <v-add :info='info' ref='add' ></v-add>
    <v-list @edit='edit'></v-list>
</div>
</template>
<script>
import vList from './components/list'
import vAdd from './components/add'
export default {
components: {
    vList,
    vAdd
},
data() {
return {
    info:{
        show:true,
        isAdd:true,
        title:'会员添加'
    }
};
},
methods: {
    add(){
        this.info.show=true,
        this.info.isAdd =true,
        this.info.title= '会员添加'
    },
    // 点击修改时,list传参至父组件
    edit(id){
        this.info.show=true,
        this.info.isAdd =false,
        this.info.title= '会员修改',
        this.$refs.add.getDetail(id);
    }
}
};
</script>
<style scoped>

</style>