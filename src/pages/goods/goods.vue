<template>
<div class="goods">
    <el-button type="primary" round @click='add'>添加</el-button>
    <v-add :info='info'></v-add>
    <v-list></v-list>
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
    }
}
};
</script>
<style scoped>

</style>