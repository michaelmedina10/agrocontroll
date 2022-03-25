import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/Dashboard"),
  },
  {
    path: "/developers",
    name: "developers",
    component: () => import("@/views/Developers"),
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home"),
  },
  {
    path: "/registers",
    name: "registers",
    component: () => import("@/views/Registers"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/views/Admin"),
  },
  {
    path: "/signin",
    name: "Signin",
    component: () => import("@/components/auth/Auth"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
