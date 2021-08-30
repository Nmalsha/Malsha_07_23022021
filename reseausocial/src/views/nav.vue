<template>
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
              to="/login"
            >
              login</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="btn btn-outline-primary my-2 my-sm-0 color"
              to="/signup"
            >
              signup</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
//import { defineComponent } from '@vue/composition-api'

export default {
  name: "nav",
};
</script>

<style>
.color {
  color: black;
}
.navbar_dark {
  margin-top: 0;
  height: 100px;
  background-color: #ffb3b3;
}
.title _2 {
  height: 100px;
}
</style>
