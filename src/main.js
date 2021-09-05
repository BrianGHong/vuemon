import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import router from './router';
import * as utils from '@/resources/utils.js';

// Bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import './assets/custom.scss';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(VueRouter);

Vue.config.productionTip = false;

// Pass utils.js as a plugin for global usage
const utilsPlugin = {
	install (Vue, options) {
		Vue.prototype.$utils = utils;
	}
};

Vue.use(utilsPlugin);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
