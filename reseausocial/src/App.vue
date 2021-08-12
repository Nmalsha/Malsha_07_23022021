<template>
  <nav>
   
     <router-link to="/"> Home</router-link>
   <router-link to="/login"> login</router-link>
    <router-link to="/signup"> signup</router-link>
    <router-link to="/post"> post</router-link>
 
<router-view />
 </nav>



</template>


<script>
export default {
  name: 'App',
  components: {
  
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#logo{
  width: 300px;
}
</style>
