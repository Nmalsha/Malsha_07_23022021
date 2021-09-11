<template>
  <div>
    <Nav></Nav>
    <div>
      <img
        class="logo"
        src="../assets/icon-above-font.svg"
        alt="Girl in a jacket"
        width="400"
        height="300"
      />
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <form @submit.prevent="signup" class="form">
            <h3>Signup Form</h3>
            <div class="form-group">
              <label>Nom</label>
              <input
                v-model="nom"
                required
                type="text"
                class="form-control"
                placeholder="Nom"
              />
            </div>
            <div class="form-group">
              <label>Prenom</label>
              <input
                v-model="prenom"
                required
                type="text"
                class="form-control"
                placeholder="Prenom"
              />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input
                v-model="email"
                required
                type="email"
                class="form-control"
                placeholder="email"
              />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input
                v-model="password"
                type="password"
                autocomplete="new-password"
                class="form-control"
                required
                placeholder="password"
              />
              <div
                v-if="password.length > 1 && password.length < 6"
                class="text-danger"
              >
                password legnth should be grater than 6
              </div>
              <div v-html="error" />
              <br />
            </div>
            <button class="btn btn-primary btn-block w-25">Sign Up</button>
          </form>
        </div>
        <div class="col-md-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

//import apiservice from '../store/apiservice'
import Nav from "./nav.vue";
export default {
  name: "signup",
  components: {
    Nav,
  },
  data() {
    return {
      nom: "",
      prenom: "",
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    signup() {
      axios
        .post("http://localhost:3000/signup", {
          email: this.email,
          nom: this.nom,
          prenom: this.prenom,
          password: this.password,
        })
        .then(
          (response) => {
            console.log(response.data);
            this.$router.push("/login");
          },
          (error) => {
            console.log(error);
          }
        );
    },
  },
};
</script>

<style>
.form {
  border: 2px solid #ffb3b3;
  padding: 10px;
  background-color: #ffb3b3;
  display: grid;
  justify-content: center;
}
/*
form{
  width: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
}
*/
@media (min-width: 768px) and (max-width: 1028px) {
  .show-on-mobile {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .show-on-desktop {
    display: none !important;
  }

  img {
    height: 100px;
  }
  .logo {
    display: none;
  }
  form {
    margin-top: 30px;
  }
  label {
    display: none;
  }
  input {
    width: 0;
    height: 50px;
    padding: 0;
  }
  button {
    width: 150px;
  }
}
</style>
