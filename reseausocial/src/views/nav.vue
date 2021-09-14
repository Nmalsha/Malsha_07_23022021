<template>
  <nav class="navbar navbar-expand-md navbar_dark nev_height">
    <div class="container">
      <div class="logo-wrappe col-md-3">
        <span class="p2 title title__style h6 align-self-center">
          <router-link to="/">
            <img
              src="../assets/icon-left-font-monochrome-black.png"
              width="400"
              height="300"
              @click="redirect"
            />
          </router-link>
        </span>
      </div>
      <div class=" navbar-collapse  col-md-9">
        <ul class="navbar-nav ml-auto mb-2 mb-lg-0 col-md-11 list_item">
          <li class="nav-item col-md-8">
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
export default {
  name: "nav",
  method: {
    redirect() {
      this.$router.push("/home");
    },
  },
};
</script>

<style>
.color {
  color: black;
}
img {
  cursor: pointer;
}
.navbar_dark {
  margin-top: 0;
  height: 100px;
  background-color: #ffb3b3;
}
.title _2 {
  height: 100px;
}

@media (min-width: 768px) and (max-width: 1028px) {
  .list_item {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  img {
    height: 150px;
    width: 300px;
  }
}
</style>
