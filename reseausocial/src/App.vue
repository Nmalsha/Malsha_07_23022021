<template>
<div id = "app">
 <form class="form-inline my-2 my-lg-0">
 <router-link class="nav-link" to="/login"> login</router-link>
    <router-link class="btn btn-outline-primary my-2 my-sm-0" to="/register"> signup</router-link>
</form>
   
   
    <router-view />
</div>


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
