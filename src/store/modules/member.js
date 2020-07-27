import {requestMemberList} from '../../util/request'
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
    requestList(context){
        requestMemberList({size:context.state.size,page:context.state.page}).then(res=>{
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