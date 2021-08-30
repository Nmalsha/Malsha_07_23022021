<template>
  <div>
    <Nav></Nav>
    <div class="home">
      <h3>
        Bienvenue dans votre réseau groupomania. Veuillez vous connecter si vous
        avez déjà un compte
      </h3>
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
h3 {
  margin-top: 50px;
}
</style>
