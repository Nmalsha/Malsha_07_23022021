<template>
    <div>
         <img class= "logo" src="../assets/icon-above-font.svg" alt="Girl in a jacket" width="400" height="300"> 
    </div>
  
  <div class="card">
      <h2 class="card_title1">Bienvenue sur votre réseau social de Groupomania</h2> 
  <h2 class="card_title2" v-if="mode =='login'">Connectez vous</h2> 
   <h2 class="card_title2" v-else>Inscrez vous</h2> 
 
  <div class="form_row">
      <input class="form_input" type="text" placeholder="Entrez votre adresse email">
  </div>
  <div class="form_row">
      <input class="form_input" type="text" placeholder="Entrez votre mot de pass">
  </div>
  <div class="form_row">
      <button class="button btn_disable" v-if="mode == 'login'"> Connect</button>
       <button class="button btn_disable" v-else> Créer mon compte</button>
  </div>
 <p class="card_subtitle"> Tu n'as pas encore de compte ? <span class="card_action" @click="switchToCreateAccount()">créé un compte</span></p>
<p class="card_subtitle"> Tu as deja une compte ? <span class="card_action" @click="switchToLogin()">Se connecter</span></p>
  </div>
 
</template>

<script>
export default{
    name:'login',
    data:function(){
        return{
            mode:'login',
        }
    },

    methods:{
        switchToCreateAccount : function(){
        this.mode = 'create';
        },
        switchToLogin : function(){
        this.mode = 'login';
        }
    }
}
</script>


<style>

</style>