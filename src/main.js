// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
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
//vee validate
import ZHTW from 'vee-validate/dist/locale/zh_TW';
import VeeValidate, { Validator } from 'vee-validate';
Vue.use(VeeValidate, {
  events: 'input|blur',
});
Validator.localize('ZHTW', ZHTW);


Vue.config.productionTip = false;





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth === true) {
    const vm = this;
    const API = `${process.env.APIPATH}/api/user/check`;
    axios.post(API).then(response => {
      // console.log(to.meta.requiresAuth + '1');
      if (response.data.success === true) {
        // console.log('true');
        next();
      } else if (response.data.success === false) {
        console.log(to.meta.requiresAuth);
        console.log('fail');
        router.push('/login');
      }
    })
  } else {
    next();
  }
})