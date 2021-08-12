
<template>
  <div class="hello">
    <h1></h1>
   <p v-if="abonnes==0"> Aucun abonnées 😢</p>
    <p v-else-if="abonnes==1">{{abonnes}} une personnes se sont abonnées! 💪</p>
   <p v-else>{{abonnes}} personnes se sont abonnées 🔥</p>
   <button v-on:click="subscribe()">S'inscrit</button>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  
  data:function(){
    return {
      abonnes:0,
    }
  },
  methods:{
    subscribe:function(){
      this.abonnes++;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
p{
  font-size: 16px;
}
</style>
