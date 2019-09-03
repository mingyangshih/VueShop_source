// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 自己載入的相關套件
import 'bootstrap'
import $ from 'jquery';
window.$ = $; //將原本的$變成jquery
// import axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);
//把後端回傳的session存在cookies內
axios.defaults.withCredentials = true;
//Vue loading overlay 套件
import Loading from 'vue-loading-overlay';
//使用Vue loading overlay元件
Vue.component('Loading', Loading);
//$bus
Vue.prototype.$bus = new Vue();
// Vue mansory
import { VueMasonryPlugin } from 'vue-masonry';
Vue.use(VueMasonryPlugin);
// currency filter
import filter from './filters/currency';
Vue.filter('currency', filter);


Vue.config.productionTip = false;





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const vm = this;
    const API = `${process.env.APIPATH}/api/user/check`;
    axios.post(API).then(response => {
      if (response.data.success) {
        next();
      } else {
        router.push('/login');
      }
    })
  } else {
    next();
  }
})