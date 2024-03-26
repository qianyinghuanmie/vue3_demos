<template>
  <div>
    <el-sub-menu
      v-if="route.children && route.children.length > 0"
      :index="route.path.toString()"
    >
      <template #title>
        <span>{{ route.name }}</span></template
      >
      <menu-item v-for="child in route.children" :key="child.path" :route="child" />
    </el-sub-menu>
    <el-menu-item v-else :index="route.path.toString()">{{ route.name }}111</el-menu-item>
  </div>
</template>

<script>
export default {
  name: "MenuItem",
  mounted() {
    console.log("我的trout", this.route);
  },
  props: {
    route: {
      type: Object,
      required: true,
    },
  },

  components: {
    // 直接引用当前组件，而不是尝试重新导入它
    "menu-item": () => ({
      extends: this,
    }),
  },
};
</script>
