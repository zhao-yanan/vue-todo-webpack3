import VueRouter from 'vue-router';

import routes from './routes.js';

export default () => {
    return new VueRouter({
        routes,
        mode: 'history'
    })
}