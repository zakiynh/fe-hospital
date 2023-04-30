import { createRouter, createWebHistory } from "vue-router";
import SideBar from "../components/SideBar.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../components/Home.vue"),
        meta: { layout: SideBar }
    },
    {
        path: "/list",
        name: "List",
        component: () => import("../components/ListPatient.vue"),
        meta: { layout: SideBar }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router