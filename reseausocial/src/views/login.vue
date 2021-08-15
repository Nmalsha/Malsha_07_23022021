<template>
    <div>
         <img class= "logo" src="../assets/icon-above-font.svg" alt="Girl in a jacket" width="400" height="300"> 
    </div>
  
  <div class="card">
      <h2 class="card_title1">Bienvenue sur votre réseau social de Groupomania</h2> 
  <h2 class="card_title2" v-if="mode =='login'">Connectez vous</h2> 
   <h2 class="card_title2" v-else>Inscrez vous</h2> 
 
  <div class="form_row">
      <input v-model="email" class="form_input" type="text" placeholder="Entrez votre adresse email">
  </div>
  <div class="form_row" v-if ="mode =='create'">
      <input v-model="nom" class="form_input" type="text" placeholder="Nom">
        <input v-model="prenom" class="form_input" type="text" placeholder="Prénom">
  </div>
  <div class="form_row">
      <input v-model="password" class="form_input" type="password" placeholder="Entrez votre mot de pass">
  </div>
  <div class="form_row" v-if="mode == 'login' && status == 'error_login'">
       Address email et/ou mot de pass invalide
  </div>
  <div class="form_row" v-if="mode == 'create' && status == 'create'">
       Address email deja utilisé
  </div>
  <div class="form_row">
      <button @click="login()" class="button " :class="{'button--disabled':!validatedFields}" v-if="mode == 'login'">
           <span v-if="status == 'loading'">Connection en cours ....</span>
          <span v-else>Connection</span></button>
       <button @click="signup()" class="button" :class="{'button--disabled':!validatedFields}" v-else> 
           <span v-if ="status == 'loading'">céation en cours .....</span>
           <span v-else>Céer mon compte</span></button>
  
  </div>
 <p class="card_subtitle" v-if="mode == 'login'"> Tu n'as pas encore de compte ? <span class="card_action" @click="switchToCreateAccount()">créé un compte</span></p>
<p class="card_subtitle" v-else> Tu as deja une compte ? <span class="card_action" @click="switchToLogin()">Se connecter</span></p>
  </div>
 
</template>

<script>

import { mapState } from 'vuex'

export default{
    name:'login',
    data:function(){
        return{
            mode:'login',
            email:'',
            nom:'',
            prenom:'',
            password:'',
        }
    },
computed:{
validatedFields :function (){
    if(this.mode == 'create'){
if(this.email != "" && this.nom != "" && this.prenom != "" && this.password != ""){
    return true ;
}else {
    return false;
}
    }else{
        if(this.email !="" && this.password !=""){
return true ;
        }else {
    return false;
}
    }
    
},
...mapState(['status'])
},
    methods:{

        switchToCreateAccount : function(){
        this.mode = 'create';
        },
        switchToLogin : function(){
        this.mode = 'login';
        },
        login(){

 fetch ('http://localhost:3000/login',{
    method:"POST",
    headers:{
        "content-Type":"application.json"
            },
            body:JSON.stringify({
                email:this.email,
           
           password:this.password,
            })
});
console.log('login');
},
        /*
        login: function(){
       const self = this;
       this.$store.dispatch('login',{
           
           email:this.email,
           password:this.password,

       }).then(function(){
           
          self.$router.push('/post');
        })
},
*/
signup(){

 fetch ('http://localhost:3000/signup',{
    method:"POST",
    headers:{
        "content-Type":"application.json"
            },
            body:JSON.stringify({
                email:this.email,
           nom:this.nom,
           prenom:this.prenom,
           password:this.password,
            })
});
console.log('signup');
},

/*

        signup : function(){
              const self = this;
                
       this.$store.dispatch('signup',{
           
           email:this.email,
           nom:this.nom,
           prenom:this.prenom,
           password:this.password,
          
       })
        .then(function(response){
            console.log(response);
            self.login();
       })
       
    }
    */
    }
   
  }
</script>


<style>

</style>