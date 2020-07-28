import {requestBannerList} from '../../util/request'
export const state ={
    list:[],
}

export const mutations ={
    changeList(state,arr){
        state.list = arr
    }
}

export const actions = {
    requestList(context){
        requestBannerList({istree:true}).then(res=>{
            context.commit('changeList',res.data.list)
        })
    }
}
//导出值
export const getters ={
    list(state){
        return state.list
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}