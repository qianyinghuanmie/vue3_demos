// main.js  
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import { createPinia } from 'pinia'
import App from './App.vue'
// import router from './router'
import { createAppRouter } from './router'; // 确保路径正确  

import './mock/list.js' // 引入模拟数据  


// 创建 Vue 应用  
// const app = createApp(App)


// 使用Vue Router  
// app.use(router)
createAppRouter().then((router) => {
    const app = createApp(App);
    app.use(router);
    // 使用Element Plus  
    app.use(ElementPlus)

    // 使用Pinia  
    const pinia = createPinia()
    app.use(pinia)
    app.mount('#app');
}).catch((error) => {
    console.error('Failed to create router:', error);
    // 可以添加额外的错误处理逻辑，比如重定向到错误页面或显示错误信息给用户  
});
// 挂载 Vue 应用
// app.mount('#app')