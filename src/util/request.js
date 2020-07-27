import axios from 'axios'
import qs from 'qs'

// 响应拦截
axios.interceptors.response.use(res => {
  console.group('=============url:' + res.config.url + '===================')
  console.log(res)
  console.groupEnd()
  return res
})

//开发模式
const baseUrl = '/api'
// =========================登录=====================================
export const requestLogin = (params) => axios({
  url: baseUrl + '/api/userlogin',
  method: 'post',
  data: qs.stringify(params)
})

// =========================菜单=======================================
//上传菜单列表
export const requestMenu = (params) => {
  return axios({
    url: baseUrl + '/api/menuadd',
    method: 'post',
    data: qs.stringify(params)
  })
}
//获取表单信息
export const requestList = (params) => {
  return axios({
    url: baseUrl + '/api/menulist',
    method: 'get',
    params
  })
}
//通过id获取一条信息
export const requestDetail = (params) => {
  return axios({
    url: baseUrl + '/api/menuinfo',
    method: 'get',
    params
  })
}

//删除一条菜单信息
export const requestMenuDelete = (params) => {
  return axios({
    url: baseUrl + '/api/menudelete',
    method: 'post',
    data: qs.stringify(params)
  })
}
//修改数据
export const requestMenuUpdate = (params) => {
  return axios({
    url: baseUrl + '/api/menuedit',
    method: 'post',
    data: qs.stringify(params)
  })
}

// ===========================角色=====================================
// 添加角色
export const requestRoleAdd = params => axios({
  url: baseUrl + '/api/roleadd',
  method: 'post',
  data: qs.stringify(params)
})

//获取角色列表
export const requestRoleList = () => axios({
  url: baseUrl + '/api/rolelist',
  method: 'get',
})

//获取角色一条
export const requestRoleDetail = (params) => axios({
  url: baseUrl + '/api/roleinfo',
  method: 'get',
  params
})

//角色修改
export const requestRoleUpdate = (params) => axios({
  url: baseUrl + '/api/roleedit',
  method: 'post',
  data: qs.stringify(params)
})

//角色删除
export const requestRoleDelete = (params) => axios({
  url: baseUrl + '/api/roledelete',
  method: 'post',
  data: qs.stringify(params)
})


// ===========================管理员=====================================
//添加管理员
export const requestManageAdd = (params) => axios({
  url: baseUrl + '/api/useradd',
  method: 'post',
  data: qs.stringify(params)
})
//管理员总数
export const requestManageCount = () => axios({
  url: baseUrl + '/api/usercount',
  method: 'get'
})

//管理员列表
export const requestManageList = (params) => axios({
  url: baseUrl + '/api/userlist',
  method: 'get',
  params
})

//获取管理员一条
export const requestManageDetail = (params) => axios({
  url: baseUrl + '/api/userinfo',
  method: 'get',
  params
})

//管理员修改
export const requestManageUpdate = (params) => axios({
  url: baseUrl + '/api/useredit',
  method: 'post',
  data: qs.stringify(params)
})

//管理员删除
export const requestManageDelete = (params) => axios({
  url: baseUrl + '/api/userdelete',
  method: 'post',
  data: qs.stringify(params)
})

// ===========================商品规格=====================================
//添加商品规格
export const requestSpecAdd = (params) => axios({
  url: baseUrl + '/api/specsadd',
  method: 'post',
  data: qs.stringify(params)
})
//商品规格总数
export const requestSpecCount = () => axios({
  url: baseUrl + '/api/specscount',
  method: 'get'
})

//商品规格列表
export const requestSpecList = (params) => axios({
  url: baseUrl + '/api/specslist',
  method: 'get',
  params
})

//获取商品规格一条
export const requestSpecDetail = (params) => axios({
  url: baseUrl + '/api/specsinfo',
  method: 'get',
  params
})

//商品规格修改
export const requestSpecUpdate = (params) => axios({
  url: baseUrl + '/api/specsedit',
  method: 'post',
  data: qs.stringify(params)
})

//商品规格删除
export const requestSpecDelete = (params) => axios({
  url: baseUrl + '/api/specsdelete',
  method: 'post',
  data: qs.stringify(params)
})

// ===========================会员管理=====================================
//注册会员
export const requestMemberReg = (params) => axios({
  url: baseUrl + '/api/register',
  method: 'post',
  data: qs.stringify(params)
})
//会员登录
export const requestMemberLogin = (params) => axios({
  url: baseUrl + '/api/login',
  method: 'post',
  data: qs.stringify(params)
})

//会员列表
export const requestMemberList = (params) => axios({
  url: baseUrl + '/api/memberlist',
  method: 'get',
  params
})

//获取会员信息一条
export const requestMemberDetail = (params) => axios({
  url: baseUrl + '/api/memberinfo',
  method: 'get',
  params
})

//会员修改
export const requestMemberUpdate = (params) => axios({
  url: baseUrl + '/api/memberedit',
  method: 'post',
  data: qs.stringify(params)
})

// ===========================分类管理=====================================

//分类添加
export const requestSortAdd = (params) => {
  var form = new FormData();
  for (var i in params) {
    form.append(i, params[i])
  }
  return axios({
    url: baseUrl + '/api/cateadd',
    method: 'post',
    data: form
  })
}

//分类列表
export const requestSortList = (params) => axios({
  url: baseUrl + '/api/catelist',
  method: 'get',
  params
})

//获取分类信息一条
export const requestSortDetail = (params) => axios({
  url: baseUrl + '/api/cateinfo',
  method: 'get',
  params
})

//分类修改
export const requestSortUpdate = (params) => {
  var form = new FormData();
  for (var i in params) {
    form.append(i, params[i])
  }
  return axios({
    url: baseUrl + '/api/cateedit',
    method: 'post',
    data:form
  })
}
//分类删除
export const requestSortDelete = (params) => axios({
  url: baseUrl + '/api/catedelete',
  method: 'post',
  data: qs.stringify(params)
})


// ===========================商品管理=====================================
//商品添加
export const requestGoodsAdd = (params) => {
  var form = new FormData();
  for (var i in params) {
    form.append(i, params[i])
  }
  return axios({
    url: baseUrl + '/api/goodsadd',
    method: 'post',
    data: form
  })
}

//商品列表
export const requestGoodsList = (params) => axios({
  url: baseUrl + '/api/goodslist',
  method: 'get',
  params
})
//获取商品总数
export const requestGoodsCount = (params) => axios({
  url: baseUrl + '/api/goodsinfo',
  method: 'get',
  params
})
//获取商品信息一条
export const requestGoodsDetail = (params) => axios({
  url: baseUrl + '/api/goodscount',
  method: 'get',
  params
})

//商品修改
export const requestGoodsUpdate = (params) => {
  var form = new FormData();
  for (var i in params) {
    form.append(i, params[i])
  }
  return axios({
    url: baseUrl + '/api/goodsedit',
    method: 'post',
    data:form
  })
}
//商品删除
export const requestGoodsDelete = (params) => axios({
  url: baseUrl + '/api/goodsdelete',
  method: 'post',
  data: qs.stringify(params)
})