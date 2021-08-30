<template>
  <div>
    <nav class="navbar navbar-expand-md navbar_dark">
      <div class="container">
        <div class="logo-wrappe col-md-3">
          <span class="p2 title title__style h6 align-self-center">
            <img
              src="../assets/icon-left-font-monochrome-black.png"
              width="400"
              height="300"
            />
          </span>
        </div>
        <div class="collapse navbar-collapse  col-md-9">
          <ul class="navbar-nav ml-auto mb-2 mb-lg-0 col-md-9">
            <li class="nav-item col-md-12">
              <router-link
                class="btn btn-outline-primary my-2 my-sm-0 color"
                to="/post"
              >
                forum</router-link
              >
            </li>
            <li class="nav-item" @click="logout">
              <a href="#">Deconnection</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!----adding profile infos-------->
    <div class="col-md-3"></div>
    <div class="card" style="width: 25rem;">
      <label for="file">select a photo</label>
      <input type="file" @change="UpdatePhoto" ref="file" name="bio" />
      <label for="nom">Nom</label>
      <input
        v-model="nom"
        type="text"
        class="form-control"
        required
        placeholder=""
      />
      <label for="prenom">Prenom</label>
      <input
        v-model="prenom"
        type="text"
        class="form-control"
        required
        placeholder=""
      />
      <label for="email">email</label>
      <input
        v-model="email"
        type="email"
        class="form-control"
        required
        placeholder=""
      />
      <div class="card-body">
        <button
          class="btn btn-primary btn-block "
          @click.prevent="updateUserProfile"
        >
          Edit Profile
        </button>
      </div>
    </div>
    <div class="col-md-3"></div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "myprofile",
  data() {
    return {
      id: "",
      email: "",
      nom: "",
      prenom: "",
      bio: "",
      password: "",
    };
  },

  created() {
    let token = localStorage.getItem("userToken");
    if (token === null) {
      this.$router.push("/login");
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/user", {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then((res) => {
        this.nom = res.data.findUser.nom;
        this.id = res.data.findUser.id;
        this.prenom = res.data.findUser.prenom;
        this.email = res.data.findUser.email;
        this.password = res.data.findUser.password;
      });
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
    /*
    updateUserProfile() {
      axios
        .put("http://localhost:3000/user", {
          headers: { token: localStorage.getItem("userToken") },
        })
        .then((res) => {
          console.log(res);
          //    console.log(this.nom);
          //   this.prenom = res.data.findUser.prenom;
          //   this.email = res.data.findUser.email;
          //    this.bio = res.data.findUser.bio;
        })
        .catch(() => {});
    },
    */
    updateUserProfile() {
      axios
        .put("http://localhost:3000/user", {
          headers: { token: localStorage.getItem("userToken") },
          email: this.email,
          id: this.id,
          nom: this.nom,
          prenom: this.prenom,
          bio: this.bio,
          password: this.password,
        })
        .then((res) => {
          console.log(res.email);
          console.log(res.data);
        })
        .catch(() => {});
    },
    UpdatePhoto(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function() {
        //console.log("RESULT", reader.result);
        this.bio = reader.result;
        console.log(this.bio);
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>
