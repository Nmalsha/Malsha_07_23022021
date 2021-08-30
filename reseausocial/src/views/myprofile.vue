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
    <div>
      <div class="card" style="width: 25rem;">
        <form class="image_form" enctype="multipart/form-data">
          <div class="roundContainer">
            <img
              src="../assets/icon.png"
              alt="profile photo"
              width="50px"
              height="50px"
            />
          </div>
          <label for="file">select a photo</label>
          <input type="file" @change="UpdatePhoto" />
        </form>
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
            @click="updateUserProfile"
            class="btn btn-primary btn-block "
            type="submit"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "myprofile",
  image: "toto",
  data() {
    return {
      id: "",
      email: "",
      nom: "",
      prenom: "",
      bio: this.bio,
      password: "",
      //image: this.image,
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
    UpdatePhoto(e) {
      const file = e.target.files[0];

      this.bio = file;
    },
    updateUserProfile() {
      const imageUrl = this.bio.name;
      // fd.append("image", file);
      console.log(imageUrl);

      axios
        .put("http://localhost:3000/user", {
          headers: { token: localStorage.getItem("userToken") },
          email: this.email,
          id: this.id,
          nom: this.nom,
          prenom: this.prenom,
          bio: imageUrl,
          password: this.password,
        })
        .then((res) => {
          console.log(res.email);
          console.log(res.data);
        })
        .catch(() => {});
    },
  },
};
</script>
<style scoped>
.form {
  margin-top: 100px;
}
.roundContainer {
  border-radius: 80%;
  height: 70px;
  border: 1px solid black;
  width: 70px;
}
</style>
