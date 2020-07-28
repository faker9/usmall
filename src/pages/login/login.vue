<template>
    <div class="login">
      <div class="con">
          <h3>管理员登录</h3>
            <el-input placeholder="请输入用户名" v-model="user.username"></el-input>
            <el-input show-password placeholder='请输入密码' v-model="user.password"></el-input>
            <el-button class="btn" type='primary' @click='login'>登录</el-button>
      </div>
        
    </div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
import {requestLogin} from '../../util/request'
import {successAlert,warningAlert} from '../../util/alert'

export default {
components: {

},
data() {
return {
    user:{
        username:'',
        password:''
    }
};
},
methods: {
    login(){
        requestLogin(this.user).then(res=>{
            if(res.data.code==200){
                successAlert(res.data.msg)
                this.changeUser(res.data.list)
                this.$router.push("/")
            }
            else{
                warningAlert(res.data.msg)
            }
        })    
    },
    ...mapActions({
        changeUser:'changeUser'
    })
}
};
</script>
<style scoped>
.login{
    width:100vw;
    height:100vh;
    background: linear-gradient(to right, #553443,#303C5F);
    overflow: hidden;
}
.con{
    width: 400px;
    height: 300px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: white;
    overflow: hidden;
    border-radius: 10px;
}
h3{
    text-align: center;
    margin: 40px;
}
.el-input,.btn{
    display: block;
    width: 300px;
    margin: 20px auto;
}

</style>