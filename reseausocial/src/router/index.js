//import Vue from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';

//import Home from "../views/Home.vue";
import login from "../views/login.vue";
import signup from "../views/signup.vue";
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
    name:'signup',
    path:'/signup',
    component: signup,
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