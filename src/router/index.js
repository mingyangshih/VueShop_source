import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/pages/Home'
import Login from '@/components/pages/Login'
import Admin from '@/components/pages/Admin'
import ProductList from '@/components/ProductList'
import SingleProduct from '@/components/pages/SingleProduct'
import Checkout from '@/components/pages/Checkout'
import HomePage from '@/components/Homepage'
import Order from '@/components/Order'

Vue.use(Router)

export default new Router({
  routes: [
    // 路徑後面隨便亂打，都會被導向login component
    {
      path: '*',
      redirect: 'Home'
    },
    {
      path: '/Home',
      name: '',
      component: Home,
      children: [
        {
          path: '',
          name: 'homepage',
          component: HomePage,
          // meta: { requiresAuth: true }
        },
        {// 結帳畫面
          path: 'checkout',
          name: 'Checkout',
          component: Checkout
        },
        {// 切換至單一商品畫面
          path: 'singleproduct/:productId',
          name: 'singleproduct',
          component: SingleProduct,
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'products',
          name: 'products',
          component: ProductList,
          meta: { requiresAuth: true }
        },
        {
          path: 'order',
          name: 'order',
          component: Order,
          meta: { requiresAuth: true }
        },
      ]
    }
  ]
})
