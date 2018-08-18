import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

import './assets/css/global.less';
import createRouter from './config/router.js';

Vue.use(VueRouter);

const router = createRouter();

new Vue({
    router,
    render: (h) => h(App)
}).$mount('#root');