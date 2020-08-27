import Vue from 'vue'
import VueRouter from 'vue-router'
import Cart from '../views/Cart'
import Order from '../views/Order'
import OrderDetail from "../views/OrderDetail"
import Pay from "../views/Pay"
import Mine from "../views/Mine"
import About from "../views/About"
import Info from "../views/Info"
import Login from "../views/Login"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '购物车',
    component: Cart
  },
  {
    path: '/order',
    name: '订单',
    component: Order
  },
  {
    path: '/orderDetail',
    name: '订单详情',
    component: OrderDetail
  },
  {
    path: '/pay',
    name: '支付',
    component: Pay
  },
  {
    path: '/mine',
    name: '我的',
    component: Mine
  },
  {
    path: '/about',
    name: '关于',
    component: About
  },
  {
    path: '/info',
    name: '用户信息',
    component: Info
  },
  {
    path: '/login',
    name: '登录',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.localStorage.getItem('access-user'))
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

export default router
