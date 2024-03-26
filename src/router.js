// router.js  
import { createRouter, createWebHistory } from 'vue-router'

// 引入你的组件  
import Home from './views/Home.vue'
import Login from './views/Login.vue'

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login },
    // 其他路由...  
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router