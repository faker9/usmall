import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
//防止二次点击报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)
// 路由独享守卫
function  havePower(url){
  return store.state.user.menus_url.some(i=>i==url)
  
}

let route =  new Router({
  routes: [
    {
      path:'/login',
      component:()=>import('../pages/login/login')
    },
    {
      path:'/memberLogin',
      component:()=>import('../pages/memberLogin/memberLogin')
    },
    {
      path:'/memberReg',
      component:()=>import('../pages/memberReg/memberReg')
    },
    {
      path:'/',
      component:()=>import('../pages/index/index'),
      children:[
        {
          path:'home',
          name:'首页',
          component:()=>import('../pages/home/home')
        },
        {
          path:'menu',
          name:'菜单列表',
          component:()=>import('../pages/menu/menu'),
          beforeEnter(to,from,next){
            havePower('/menu')?next():next('/home');
            }
        },
        {
          path:'role',
          name:'角色列表',
          component:()=>import('../pages/role/role'),
          beforeEnter(to,from,next){
            havePower('/role')?next():next('/home');
            }
        },
        {
          path:'manage',
          name:'管理员列表',
          component:()=>import('../pages/manage/manage'),
          beforeEnter(to,from,next){
            havePower('/manage')?next():next('/home');
            }
        },
        {
          path:'sort',
          name:'商品分类列表',
          component:()=>import('../pages/sort/sort'),
          beforeEnter(to,from,next){
            havePower('/sort')?next():next('/home');
            }
        },
        {
          path:'spec',
          name:'商品规格',
          component:()=>import('../pages/spec/spec'),
          beforeEnter(to,from,next){
            havePower('/spec')?next():next('/home');
            }
        },
        {
          path:'goods',
          name:'商品列表',
          component:()=>import('../pages/goods/goods'),
          beforeEnter(to,from,next){
            havePower('/goods')?next():next('/home');
            }
        },
        {
          path:'member',
          name:'会员',
          component:()=>import('../pages/member/member'),
          beforeEnter(to,from,next){
            havePower('/member')?next():next('/home');
            }
        },
        {
          path:'banner',
          name:'轮播图管理',
          component:()=>import('../pages/banner/banner'),
          beforeEnter(to,from,next){
            havePower('/banner')?next():next('/home');
            }
        },
        {
          path:'seckill',
          name:'秒杀活动',
          component:()=>import('../pages/seckill/seckill'),
          beforeEnter(to,from,next){
            havePower('/seckill')?next():next('/home');
            }
        },
        {
          path:'',
          redirect:'home'
        }
      ]
    }
  ]
})
route.beforeEach((to, from, next) => {
  if(to.path ==='/login'){
    next()
    return
  }
  if(store.state.user){
    next()
    return
  }
  next("/login") 
})
export default route