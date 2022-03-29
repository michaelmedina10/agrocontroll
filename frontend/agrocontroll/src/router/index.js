import Vue from "vue";
import VueRouter from "vue-router";
const { VUE_APP_USERKEY } = process.env;

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
    meta: { requiresAdmin: true },
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

router.beforeEach((to, from, next) => {
  const json = localStorage.getItem(VUE_APP_USERKEY);
  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    const user = JSON.parse(json);
    user && user.admin == "1" ? next() : next({ path: "/" });
  } else {
    next();
  }
});

export default router;
