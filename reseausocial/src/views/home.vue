<template>
  <div>
    <Nav></Nav>
    <div class="home">
      <p>
        Bienvenue dans votre réseau groupomania. Veuillez vous connecter si vous
        avez déjà un compte
        <img src="../assets/home.png" />
      </p>
    </div>
  </div>
</template>

<script>
import Nav from "./nav.vue";

export default {
  name: "Home",
  components: {
    Nav,

    //Header,
  },
};
</script>
<style scoped>
p {
  margin-top: 50px;
  font-weight: bold;
}

img {
  width: 70%;
  margin-top: 60px;
}
</style>
