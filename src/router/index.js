import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
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
          component:()=>import('../pages/menu/menu')
        },
        {
          path:'role',
          name:'角色列表',
          component:()=>import('../pages/role/role')
        },
        {
          path:'manage',
          name:'管理员列表',
          component:()=>import('../pages/manage/manage')
        },
        {
          path:'sort',
          name:'商品分类列表',
          component:()=>import('../pages/sort/sort')
        },
        {
          path:'spec',
          name:'商品规格',
          component:()=>import('../pages/spec/spec')
        },
        {
          path:'goods',
          name:'商品列表',
          component:()=>import('../pages/goods/goods')
        },
        {
          path:'member',
          name:'会员',
          component:()=>import('../pages/member/member')
        },
        {
          path:'banner',
          name:'轮播图管理',
          component:()=>import('../pages/banner/banner')
        },
        {
          path:'seckill',
          name:'秒杀活动',
          component:()=>import('../pages/seckill/seckill')
        },
        {
          path:'',
          redirect:'home'
        }
      ]
    }
  ]
})
