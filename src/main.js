// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/css/reset.css'
// 导入elementui
import 'element-ui/lib/theme-chalk/index.css';
import elmentUi from 'element-ui'
Vue.use(elmentUi);

//导入css
import './assets/font_icon/iconfont.css'

//封装公共组件
import components from './components'
for(let item in components){
  Vue.component(item,components[item])
}

//封装公共过滤器
import Filters from "./filters"
for (var i in Filters) {
  Vue.filter(i, Filters[i])
}

//导入状态层
import store from './store'

//图片公共头
Vue.prototype.$preImg = 'http://localhost:3000'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
