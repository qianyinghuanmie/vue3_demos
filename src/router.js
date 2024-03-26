import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';

import DashDetail2 from './views/child/Detail2.vue';
import DashDetail3 from './views/child/Detail3.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/Dash',
        name: 'Dash',
        children: [
            {
                path: '/DashDetail/1',
                name: 'DashDetail',
                children: [{
                    path: '/DashDetail/3',
                    name: 'DashDetail3',
                    component: DashDetail3,
                }]
            },
            {
                path: '/DashDetail/2',
                name: 'DashDetail2',
                component: DashDetail2
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
