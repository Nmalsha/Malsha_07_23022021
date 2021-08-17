<template>
    <div>
         <img class= "logo" src="../assets/icon-above-font.svg" alt="Girl in a jacket" width="400" height="300"> 
    </div>
  <div class="container">
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-6">
        <form @submit.prevent="login">
      <h3>Login Form</h3>
      
      
      <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" class="form-control" required placeholder="email"/>
      </div>
      <div class="form-group">
          <label>Password</label>
          <input v-model="password" type="password" class="form-control" required placeholder="password"/>
      <div v-if= "password.length >1 && password.length <6 " class="text-danger"> password legnth should be grater than 6</div>
      </div>
      <button  class="btn btn-primary btn-block">Login</button>
  </form>
    </div>
    <div class="col-md-3"></div>
  </div>

</div>

  
</template>

<script>
import axios from 'axios'
//import apiservice from '../store/apiservice'

export default{
  
    name: 'login',
    data(){
      return{

email:'',
password:''
    }
    

  },
    methods:{
  login(){
axios.post ('http://localhost:3000/login',{
   email:this.email,
           nom:this.nom,
           prenom:this.prenom,
           password:this.password,
})
 .then((response) => {
  console.log(response.data);
}, (error) => {
  console.log(error);
});
},
},

    }

 
</script>


<style>

</style>