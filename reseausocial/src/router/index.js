//import Vue from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';

//import Home from "../views/Home.vue";
import login from "../views/login.vue";
import register from "../views/signup.vue";
import post from "../views/post.vue";
//import { VueElement } from 'vue';

//Vue.routes(VueRouter)

const routes = [
 
{
    name:'login',
    path:'/login',
    component: login, 

},

{
    name:'register',
    path:'/register',
    component: register,
 },
{
    name:'post',
    path:'/post',
    component: post,
}

];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;