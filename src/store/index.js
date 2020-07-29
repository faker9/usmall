import vuex from 'vuex'
import qs from 'qs'
import Vue from 'vue'
Vue.use(vuex)
import {actions} from './actions'
import {state,mutations,getters} from './mutations'

import menu from './modules/menu'
import role from './modules/role'
import manage from './modules/manage'
import spec from './modules/spec'
import member from './modules/member'
import sort from './modules/sort'
import goods from './modules/goods'
import banner from './modules/banner'
import seckill from './modules/seckill'

export default new vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules:{
        menu,
        role,
        manage,
        spec,
        member,
        sort,
        goods,
        banner,
        seckill
    }
})