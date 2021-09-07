//import Vue from 'vue'
import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../views/home.vue";
import login from "../views/login.vue";
import signup from "../views/signup.vue";
import post from "../views/post.vue";
import posts from "../views/posts.vue";
import myprofile from "../views/myprofile.vue";
import popupe from "../views/popup.vue";
import comment from "../views/comment";
//import { VueElement } from 'vue';

//Vue.routes(VueRouter)

const routes = [
  {
    name: "login",
    path: "/login",
    component: login,
  },

  {
    name: "signup",
    path: "/signup",
    component: signup,
  },
  {
    name: "post",
    path: "/post",
    component: post,
  },
  {
    name: "posts",
    path: "/posts",
    component: posts,
  },
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "myprofile",
    path: "/myprofile",
    component: myprofile,
  },
  {
    name: "popupe",
    path: "/popupe/:id",
    component: popupe,
  },
  {
    name: "comment",
    path: "/comment/:id",
    component: comment,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
