<template>
    <div>
         <img class= "logo" src="../assets/icon-above-font.svg" alt="Girl in a jacket" width="400" height="300"> 
    </div>
  
<div class="container">
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <form @submit.prevent="signup">
      <h3>Signup Form</h3>
      <div class="form-group">
          <label>Nom</label>
          <input v-model="nom" type="text" class="form-control" placeholder="Nom"/>
      </div>
      <div class="form-group">
          <label>Prenom</label>
          <input v-model="prenom" required type="text" class="form-control" placeholder="Prenom"/>
      </div>
      <div class="form-group">
          <label>Email</label>
          <input v-model ="email" type="email" class="form-control" placeholder="email"/>
      </div>
      <div class="form-group">
          <label>Password</label>
          <input v-model ="password"  type="password" class="form-control" required placeholder="password"/>
      <div v-if= "password.length >1 && password.length <6 " class="text-danger"> password legnth should be grater than 6</div>
      </div>
      <button  class="btn btn-primary btn-block">Sign Up</button>
  </form></div>
    <div class="col-md-3"></div>
  </div>

</div>


  
</template>

<script>
import axios from 'axios'
//import apiservice from '../store/apiservice'

export default{
  
    name: 'signup',
    data(){
      return{
nom:'',
prenom:'',
email:'',
password:''
    }
    

  },
    methods:{
  signup(){
axios.post ('http://localhost:3000/signup',{
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
}

    }

 
</script>


<style>
/*
form{
  width: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
}
*/
</style>