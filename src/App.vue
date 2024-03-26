<template>
  <div id="app">
    <!-- 登录表单或其他UI元素 -->
    <button @click="handleLogin">登录</button>
    <!-- 动态菜单或其他受保护的UI -->
    <router-view />
  </div>
</template>

<script>
// import { ref } from "vue";
import router from "./router"; // 确保可以访问到router实例
import axios from "axios"; // 确保已经安装了axios

export default {
  name: "App",
  setup() {
    const handleLogin = async () => {
      try {
        // 这里硬编码了用户名和密码，实际应用中应从表单获取
        const username = "your_username";
        const password = "your_password";

        const response = await axios.post("/api/login", { username, password });

        if (response.data.code === 200) {
          // 登录成功，保存token等操作（这里省略）...
          //你可以用这个登录接口来模拟获得菜单的接口
          // 动态添加路由，这里是新增一个路由
          router.addRoute(
            {
              path: "/dashboard",
              name: "UserDashboard",
              component: () => import("./views/Dashboard.vue"), // 懒加载组件
              meta: { requiresAuth: true }, // 需要认证才能访问的路由元数据
            }
            // 其他需要动态添加的路由...
          );

          // 跳转到新增的路由导航到仪表盘页面或其他受保护的页面...
          router.push("/dashboard");
        } else {
          // 处理登录失败的情况（这里可以弹出提示等）...
        }
      } catch (error) {
        // 处理请求错误（这里可以弹出错误提示等）...
        console.error("登录失败:", error);
      }
    };

    return { handleLogin };
  },
};
</script>
