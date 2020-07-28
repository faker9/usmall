import {requestGoodsList,requestGoodsCount} from '../../util/request'
export const state ={
    list:[],
    // 当前页数
    page:1,
    //每页条数
    size:2,
    //总数
    total:0,

}

export const mutations ={
    changeList(state,arr){
        state.list = arr
    },
    //修改总页数
    changeTotal(state,total){
        state.total =total
    },
     //修改当前页码
     changePage(state,page){
        state.page=page
    }
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
        requestGoodsList(params).then(res=>{
            context.commit('changeList',res.data.list)
        })
    },
    //获取总数量
    requestTotal(context){
        requestGoodsCount().then(res=>{
            context.commit("changeTotal",res.data.list[0].total)
        })
    },
    //获取设置当前页数
    changePage(context,page){
        context.commit('changePage',page)
    }

}
//导出值
export const getters ={
    list(state){
        return state.list
    },
    total(state){
        return state.total
    },
    //一页几条信息
    size(state){
        return state.size
    },
    page(state){
        return state.page
    }
     
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}