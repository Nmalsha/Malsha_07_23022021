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
          <form @submit.prevent="login" class="form">
            <h3>Login Form</h3>

            <div class="form-group">
              <label>Email</label>
              <input
                v-model="email"
                type="email"
                class="loginform-control "
                required
                placeholder="email"
              />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input
                v-model="password"
                type="password"
                class="loginform-control  "
                required
                placeholder="password"
              />
              <div
                v-if="password.length > 1 && password.length < 6"
                class="text-danger"
              >
                password legnth should be grater than 6
              </div>
            </div>
            <button class="btn btn-primary btn-block w-25">Login</button>
          </form>
        </div>
        <div class="col-md-3"></div>
      </div>
    </div>

    <!------------------Footer------------------->
    <footer class="navbar navbar-expand-md navbar_dark">
      <div class="container height">
        <span class="p2 title title__style h6 align-self-center">
          <img
            class="footer_logo"
            src="../assets/icon-left-font-monochrome-black.png"
            width="400"
          />
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
//import apiservice from '../store/apiservice'
import Nav from "./nav.vue";
//import {mapMutations} from 'vuex'

export default {
  name: "login",
  components: {
    Nav,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:3000/login", {
          email: this.email,

          password: this.password,
        })
        .then(
          (response) => {
            //console.log(response.data);
            //console.log(  response.data.token);
            localStorage.setItem("userToken", response.data.token);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + response.data.token;
            // this.setUser (user);
            // this.setToken (token);
            this.$router.push("/myprofile");
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
.loginform-control {
  width: 400px;
  height: 100px;
  margin-right: 20px;
  display: block;
}
.footer_logo {
  height: 100px;
}
.navbar_dark {
  margin-top: 100px;
}
@media (min-width: 768px) and (max-width: 1028px) {
}

@media (max-width: 768px) {
  .footer_logo {
    height: 100px;
  }
  .width {
    width: 300px;
    height: 60px;
  }
  .form-group {
    margin-top: 10px;
  }
  .loginform-control {
    width: 250px;
    height: 60px;
    margin-right: 20px;
  }
}
</style>
