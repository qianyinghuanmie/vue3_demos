import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';

import DashDetail2 from './views/child/Detail2.vue';
import DashDetail3 from './views/child/Detail3.vue';
import axios from "axios"; // 确保已经安装了axios

const staticRoutes = [
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
// 异步获取动态路由信息  
async function fetchDynamicRoutes() {
    try {
        const response = await axios.get('/api/routes');
        if (response.data.code === 200) {
            return response.data.data; // 假设返回的数据结构为 { code: 200, data: [动态路由数组] }  
        } else {
            throw new Error('Failed to fetch dynamic routes');
        }
    } catch (error) {
        console.error('Error fetching dynamic routes:', error);
        return []; // 返回空数组以避免崩溃，也可以根据需要抛出错误或重定向到错误页面  
    }
}
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
// 创建并导出 router 实例的工厂函数  
export async function createAppRouter() {
    const dynamicRoutes = await fetchDynamicRoutes();
    const mergedRoutes = mergeRoutes(staticRoutes, dynamicRoutes);

    const router = createRouter({
        history: createWebHistory(),
        routes: mergedRoutes, // 使用合并后的路由配置  
    });

    return router;
}
// const router = createRouter({
//     history: createWebHistory(),
//     routes
// });

// export default router;
