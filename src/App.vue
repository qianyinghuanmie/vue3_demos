<template>
  <div id="app">
    <el-container style="height: 100vh">
      <el-aside width="200px" style="background-color: #545c64; color: #fff">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @select="handleMenuSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <template v-for="route in routes" :key="route.path">
            <el-submenu
              v-if="route.children && route.children.length > 0"
              :index="route.path.toString()"
            >
              <template v-slot:title>{{ route.name }}</template>
              <el-menu-item
                v-for="child in route.children"
                :key="child.path"
                :index="child.path.toString()"
                >{{ child.name }}</el-menu-item
              >
            </el-submenu>
            <el-menu-item v-else :index="route.path.toString()">{{
              route.name
            }}</el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import router from "./router"; // 确保可以访问到router实例
import axios from "axios"; // 确保已经安装了axios

export default {
  name: "App",
  setup() {
    const routes = ref([]); // 使用 reactive 代替 ref，因为 routes 是一个数组对象
    const handleMenuSelect = (index) => {
      router.push(index);
    };
    onMounted(async () => {
      // 假设登录成功后，你已经添加了路由
      // 这里我们模拟获取已经添加的路由
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
          // router.push("/dashboard");

          routes.value = router.getRoutes().filter((child) => child.path !== "/");
        } else {
          // 处理登录失败的情况（这里可以弹出提示等）...
        }
      } catch (error) {
        // 处理请求错误（这里可以弹出错误提示等）...
        console.error("登录失败:", error);
      }
    });
    console.log(routes, handleMenuSelect);
    return { routes, handleMenuSelect };
  },
};
</script>
