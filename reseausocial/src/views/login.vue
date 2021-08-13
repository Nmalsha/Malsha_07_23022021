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
      <input v-model="password" class="form_input" type="text" placeholder="Entrez votre mot de pass">
  </div>
  <div class="form_row">
      <button class="button button--disabled" v-if="mode == 'login'"> Connect</button>
       <button @click="CreateAccount()" class="button" :class="{'button--disabled':!validatedFields}" v-else> Créer mon compte</button>
  
  </div>
 <p class="card_subtitle" v-if="mode == 'login'"> Tu n'as pas encore de compte ? <span class="card_action" @click="switchToCreateAccount()">créé un compte</span></p>
<p class="card_subtitle" v-else> Tu as deja une compte ? <span class="card_action" @click="switchToLogin()">Se connecter</span></p>
  </div>
 
</template>

<script>
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
}
},
    methods:{
        switchToCreateAccount : function(){
        this.mode = 'create';
        },
        switchToLogin : function(){
        this.mode = 'login';
        },
        CreateAccount : function(){
            
       this.$store.dispatch('CreateAccount',{
           
           email:this.email,
           nom:this.nom,
           prenom:this.prenom,
           password:this.password,
       }).then(function(reponce){
           console.log(reponce);
        },function(error){
            console.log(error);
        })
       
    }
    }
    
}
</script>


<style>

</style>