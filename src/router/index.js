//import vue router
import { createRouter, createWebHistory } from "vue-router";
import store from "@/storeVuex";

//import axios
import axios from 'axios';

//default base URL / EndPoint API
axios.defaults.baseURL = "https://sekolah.izaldev.my.id/";
//define a routes
const routes = [
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "@/views/auth/Register.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/auth/Login.vue"),
  },
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "Home" */ "@/views/home/Index"),
  },
  {
    path: "/post",
    name: "post",
    component: () =>
      import(/* webpackChunkName: "PostIndex" */ "@/views/post/Index"),
  },
  {
    path: "/tag/:slug",
    name: "detail_tag",
    component: () =>
      import(/* webpackChunkName: "TagShow" */ "@/views/tag/Show"),
  },
  {
    path: "/category/:slug",
    name: "detail_category",
    component: () =>
      import(/* webpackChunkName: "CategoryShow" */ "@/views/category/Show"),
  },
  {
    path: "/event",
    name: "event",
    component: () =>
      import(/* webpackChunkName: "EventIndex" */ "@/views/event/Index"),
  },
  {
    path: "/event/:slug",
    name: "detail_event",
    component: () =>
      import(/* webpackChunkName: "EventShow" */ "@/views/event/Show"),
  },
  {
    path: "/photo",
    name: "photo",
    component: () =>
      import(/* webpackChunkName: "PhotoIndex" */ "@/views/photo/Index"),
  },
  {
    path: "/video",
    name: "video",
    component: () =>
      import(/* webpackChunkName: "VideoIndex" */ "@/views/video/Index"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () =>
      import(/* webpackChunkName: "ContactIndex" */ "@/views/contact/Index"),
  },
  {
    path: "/:slug",
    name: "detail_post",
    component: () =>
      import(/* webpackChunkName: "PostShow" */ "@/views/post/Show"),
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "Dashboard" */ "@/views/dashboard/Index"),

    meta: {
      //chek is loggedIn
      requiresAuth: true,
    },
  },
  {
    path: "/dashboard/friend",
    name: "friend",
    component: () =>
      import(/* webpackChunkName: "Dashboard" */ "@/views/dashboard/Friend"),

    meta: {
      //chek is loggedIn
      requiresAuth: true,
    },
  },

  {
    path: "/dashboard/transaction",
    name: "transaction",
    component: () =>
      import(/* webpackChunkName: "Dashboard" */ "@/views/dashboard/Transaction"),

    meta: {
      //chek is loggedIn
      requiresAuth: true,
    },
  },
  {
    path: "/dashboard/transaction/create",
    name: "transaction-create",
    component: () =>
      import(/* webpackChunkName: "Dashboard" */ "@/views/dashboard/Transaction-Create"),

    meta: {
      //chek is loggedIn
      requiresAuth: true,
    },
  },
  {
    path: "/register-success",
    name: "register_success",
    component: () =>
      import(/* webpackChunkName: "PostShow" */ "@/views/dashboard/Register_Success"),
  },

];

//create router
const router = createRouter({
  history: createWebHistory(),
  routes, // <-- routes
});

//define route for handle authentication
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    //cek nilai dari getters isLoggedIn di module auth
    if (store.getters["auth/isLoggedIn"]) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
