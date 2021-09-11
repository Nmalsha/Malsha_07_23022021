<template>
  <div>
    <Nav></Nav>
    <div class="home">
      <p>
        Bienvenue dans votre réseau groupomania. Veuillez vous
        <span @click="gottologin">connecter</span> si vous avez déjà un compte,
        si non cliqué <span @click="gottosignup">ici</span>
      </p>
      <img id="logo" src="../assets/home.png" />
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

  methods: {
    gottologin() {
      this.$router.push("/login");
    },
    gottosignup() {
      this.$router.push("/signup");
    },
  },
};
</script>
<style scoped>
p {
  margin-top: 50px;
  font-weight: bold;
}
#logo {
  height: 300px;
  width: 50%;
}

@media (min-width: 768px) and (max-width: 1028px) {
}

@media (max-width: 768px) {
  .logo_wrappe {
    height: 100px;
  }
  #logo {
    height: 300px;
    width: 300px;
  }
  span {
    cursor: pointer;
    color: red;
  }

  img {
    height: 150px;
    width: 300px;
  }
}
</style>
