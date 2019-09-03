import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/pages/Home'
import Login from '@/components/pages/Login'
import Admin from '@/components/pages/Admin'
import ProductList from '@/components/ProductList'
import SingleProduct from '@/components/pages/SingleProduct'

Vue.use(Router)

export default new Router({
  routes: [
    // 路徑後面隨便亂打，都會被導向login component
    {
      path: '*',
      redirect: 'Home'
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [

      ]
    },
    {
      path: '/singleproduct/:productId',
      name: 'singleproduct',
      component: SingleProduct,
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
      children: [{
        path: 'products',
        name: 'products',
        component: ProductList,
        meta: { requiresAuth: true }
      }]
    }
  ]
})
