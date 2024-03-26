// main.js  
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './mock/list.js' // 引入模拟数据  


// 创建 Vue 应用  
const app = createApp(App)

// 使用Element Plus  
app.use(ElementPlus)

// 使用Pinia  
const pinia = createPinia()
app.use(pinia)
// 使用Vue Router  
app.use(router)

// 挂载 Vue 应用  
app.mount('#app')