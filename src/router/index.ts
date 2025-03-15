import Vue from "vue";
import Router from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import TaskList from "@/views/TaskList.vue";
import TaskHistoryView from "@/views/TaskHistoryView.vue";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/home",
    name: "Home",
    component: TaskList,
  },
  {
    path: "/history",
    name: "History",
    component: TaskHistoryView,
  },
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const token = localStorage.getItem("token");

  if (requiresAuth && !token) {
    next("/");
  } else {
    next();
  }
});

export default router;
