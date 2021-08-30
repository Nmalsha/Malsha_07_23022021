<template>
  <div>
    <nav class="navbar navbar-expand-md navbar_dark">
      <div class="container">
        <div class="logo-wrappe col-md-3">
          <span class="p2 title title__style h6 align-self-center">
            <a href="/">
              <img
                src="../assets/icon-left-font-monochrome-black.png"
                width="400"
                height="300"
            /></a>
          </span>
        </div>
        <div class="collapse navbar-collapse  col-md-9">
          <ul class="navbar-nav ml-auto mb-2 mb-lg-0 col-md-9">
            <li class="nav-item col-md-12">
              <router-link to="/myprofile">Profile</router-link>
            </li>
            <li class="nav-item" @click="logout">
              <a href="#">Deconnection</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="post-wrapp col-md-6">
      <h6>Bonjour {{ prenom }} bienvenue dans le réseau GROUPOMANIA</h6>
      <br />
      <p>
        Ici, vous pouvez interagir avec vos collègues à tout moment et partager
        vos réflexions avec la communauté
      </p>
    </div>
    <div class="post_wrapp">
      <div class="addpost_wrappe col-md-4">
        <div class="add_img com-md-1">Insérer une image</div>
        <div class="write_post com-md-9">
          <input
            class="form-control mr-sm-2 bg-light"
            v-model="postContent"
            maxlength="max"
            type="text"
            placeholder="Publier ici..."
            aria-label="publication"
            id="publication"
          />
        </div>
        <div class="write_post com-md-2">
          <div>
            <v-btn class="btn_color" elevation="2"> Envoyer</v-btn>
          </div>
          <div class="btn_annule btn_color"><v-btn rounded>Annuler</v-btn></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Post",
  data() {
    return {
      email: "",
      nom: "",
      prenom: "",
    };
  },

  created() {
    let token = localStorage.getItem("userToken");
    if (token === null) {
      this.$router.push("/login");
    }
    console.log(token);
  },
  mounted() {
    axios
      .get("http://localhost:3000/user", {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then((res) => {
        this.nom = res.data.findUser.nom;
        this.prenom = res.data.findUser.prenom;
        this.email = res.data.findUser.email;
      });
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
  // getUserProfile() {},
};
</script>

<style>
.post-wrapp {
  margin-top: 100px;
  height: 100px;
  width: 40%;
  display: inline-block;
}

.card-header {
  padding: 0 0 0 0;
  margin-bottom: 0;
  background-color: #00000000;
}
.card {
  box-shadow: 0 0 10px 0 rgba(183, 192, 206, 0.2);
  width: 75%;
  display: grid;
}
.addpost_wrappe {
  margin-top: 100px;
  align-items: center;
  justify-content: space-evenly;
  background-color: #ffb3b3;
  margin-left: 50px;
  display: flex;
  justify-content: space-around;
  padding: 30px;
}
.form-control {
  width: 370px;
  height: 70px;
  margin-right: 20px;
}
.btn_color {
  background-color: white;
  border-radius: 40%;
  padding: 10px;
  cursor: pointer;
}
.btn_annule {
  margin-top: 10px;
}
.post_wrapp {
  display: grid;
  justify-items: center;
}
.add_img {
  margin: 4px;
  border: 1px solid;
  height: 67px;
  cursor: pointer;
}
</style>
