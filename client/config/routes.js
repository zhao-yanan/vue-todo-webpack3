import Todo from '../views/todo/Todo.vue';
import Login from '../views/login/Login.vue';

export default [
    {
        path: '/',
        redirect: '/app'
    },
    {
        path: '/app',
        component: Todo
    },
    {
        path: '/login',
        component: Login
    }
]