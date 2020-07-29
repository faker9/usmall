import {requestSeckillList,requestSeckillCount} from '../../util/request'
export const state ={
    list:[],
}

export const mutations ={
    changeList(state,arr){
        state.list = arr
    },
}

export const actions = {
    //发送请求获取获取管理员;列表
    requestList(context,boo){
        var params = {}
        if(boo){
            params = {}
        }
        else{
            params =  {size:context.state.size,page:context.state.page}
        }
        requestSeckillList(params).then(res=>{
            context.commit('changeList',res.data.list)
        })
    },
}
//导出值
export const getters ={
    list(state){
        return state.list
    },

     
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}