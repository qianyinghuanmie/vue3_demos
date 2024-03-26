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
          <menu-item v-for="route in routes" :key="route.path" :route="route" />
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
import MenuItem from "./views/MenuItem.vue";
export default {
  name: "App",
  components: { "menu-item": MenuItem },
  setup() {
    const routes = ref([]); // 使用 reactive 代替 ref，因为 routes 是一个数组对象
    const handleMenuSelect = (index) => {
      router.push(index);
    };
    function mergeRoutes(staticRoutes, apiRoutes) {
      // 创建一个映射，方便通过name快速查找静态路由
      const staticRouteMap = {};

      // 递归函数，用于处理子路由并创建映射
      function processRoutes(routes, parentName = "") {
        routes.forEach((route) => {
          // 使用父路由名称和当前路由名称创建唯一的键
          const routeKey = parentName ? `${parentName}/${route.name}` : route.name;
          staticRouteMap[routeKey] = route;

          // 递归处理子路由
          if (route.children) {
            processRoutes(route.children, routeKey);
          }
        });
      }

      // 处理静态路由并创建映射
      processRoutes(staticRoutes);

      // 递归函数，用于合并路由的meta信息
      function mergeRouteMeta(apiRoute, staticRoute, parentName = "") {
        if (apiRoute.meta) {
          staticRoute.meta = { ...staticRoute.meta, ...apiRoute.meta };
        }

        if (apiRoute.children) {
          if (!staticRoute.children) {
            staticRoute.children = [];
          }

          apiRoute.children.forEach((apiChild) => {
            // 使用父路由名称和当前路由名称创建唯一的键
            const childKey = parentName
              ? `${parentName}/${apiChild.name}`
              : apiChild.name;
            const staticChild = staticRoute.children.find(
              (child) => child.name === apiChild.name || childKey === apiChild.name
            );

            if (staticChild) {
              mergeRouteMeta(apiChild, staticChild, childKey);
            } else {
              console.warn(`Child route ${apiChild.name} not found in static routes.`);
            }
          });
        }
      }

      // 遍历API返回的路由，合并meta信息
      apiRoutes.forEach((apiRoute) => {
        const staticRoute = staticRouteMap[apiRoute.name];
        if (staticRoute) {
          mergeRouteMeta(apiRoute, staticRoute);
        } else {
          console.warn(`Route ${apiRoute.name} not found in static routes.`);
        }
      });

      return staticRoutes;
    }

    onMounted(async () => {
      // 假设登录成功后，你已经添加了路由
      // 这里我们模拟获取已经添加的路由
      try {
        // 这里硬编码了用户名和密码，实际应用中应从表单获取

        const response = await axios.get("/api/routes");

        if (response.data.code == 200) {
          //请求列表成功后，合并两个列表
          console.log(response, "responseresponse");
          // 跳转到新增的路由导航到仪表盘页面或其他受保护的页面...
          // router.push("/dashboard");
          console.log(router, "router");
          // 使用这个函数来处理你的路由，排除根路由 '/' 及其所有子路由

          routes.value = router.options.routes.filter((route) => route.path !== "/");
          const mergedRoutes = mergeRoutes(routes.value, response.data.data);
          routes.value = mergedRoutes;
        } else {
          // 处理登录失败的情况（这里可以弹出提示等）...
        }
      } catch (error) {
        // 处理请求错误（这里可以弹出错误提示等）...
        console.error("登录失败:", error);
      }
    });
    console.log(routes, "routes信息为");

    // console.log(routes, handleMenuSelect);
    return { routes, handleMenuSelect };
  },
};
</script>
