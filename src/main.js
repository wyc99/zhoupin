// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import Goods from 'components/goods/goods.vue';
import Ratings from 'components/ratings/ratings.vue';
import Seller from 'components/seller/seller.vue';
import VueResource from 'vue-resource';
import './common/stylus/index.styl';

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  { path: '/goods', component: Goods },
  { path: '/ratings', component: Ratings },
  { path: '/seller', component: Seller }
];

const router = new VueRouter({
  linkActiveClass: 'active',
  routes: routes // （缩写）相当于 routes: routes
});
router.push('/goods');

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  render: (h) => h(App),
  data: {
  	eventHub: new Vue()
  }
});








