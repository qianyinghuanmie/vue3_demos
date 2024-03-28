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
import { ref } from "vue";
import { useRouter } from "vue-router";
import MenuItem from "./views/MenuItem.vue";
export default {
  name: "App",
  components: { "menu-item": MenuItem },
  setup() {
    const routes = ref([]);
    const router = useRouter();
    const handleMenuSelect = (index) => {
      router.push(index);
    };

    // 使用 watchEffect 或其他方法来监听路由变化并更新 routes（如果需要的话）
    // 但在这个例子中，我们假设合并后的路由在应用启动时就已经确定了，所以不需要监听变化
    routes.value = router.options.routes; // 直接使用合并后的路由配置（确保这在实际应用中是可行的）

    return { routes, handleMenuSelect };
  },
};
</script>
