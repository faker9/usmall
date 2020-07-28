<template>
<div class="goods">
    <el-button type="primary" round @click='add'>添加</el-button>
    <v-add :info='info' ref = 'add' ></v-add>
    <v-list @edit= 'edit'></v-list>
</div>
</template>
<script>
import vAdd from './components/add'
import vList from './components/list'
export default {
components: {
    vAdd,
    vList
},
data() {
return {
    info:{
        show:false,
        title:'商品管理',
        isAdd:true
    }
};
},
methods: {
    add(){
        this.info.show=true,
        this.info.title='商品管理',
        this.info.isAdd=true
    },
    //点击编辑,主页触发事件
    edit(id){
        this.info.show=true,
        this.info.title='商品修改',
        this.info.isAdd=false;
        this.$refs.add.getDetail(id)
    }
}
};
</script>
<style scoped>

</style>