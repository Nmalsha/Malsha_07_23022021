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
                to="/posts"
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
    <div class="profile_wrapp">
      <div class="card">
        <form class="image_form" enctype="multipart/form-data">
          <a href="#">
            <div class="roundContainer">
              <img
                class="profile_image"
                alt="profile photo"
                :src="userInfors.profileimage"
                width="50px"
                height="50px"
              />
            </div>
          </a>
        </form>
        <div class="text-center align-baseline my-2">
          <p>Nom : {{ userInfors.nom }}</p>
          <p>prenom : {{ userInfors.prenom }}</p>
          <p>email : {{ userInfors.email }}</p>
        </div>
      </div>
    </div>
    <!----Display Posts---->
    <form enctype="multipart/form-data">
      <div class="post_wrappe">
        <div
          id="postinfo"
          class="post_details"
          v-for="postsforOneUser in postsforOneUsers"
          v-bind:key="postsforOneUser.id"
        >
          <div class="postContent__image">
            <img class="postimage" :src="postsforOneUser.attachement" />
          </div>
          <div class="postContent">
            <p class="postContent__text">{{ postsforOneUser.content }}</p>
            <p class="postContent__text">{{ postsforOneUser.createdAt }}</p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
//import imagefile from "...";
//import { defineComponent } from "vue";

export default {
  name: "userprofile",

  data() {
    return {
      profileimage: null,
      id: this.$route.params.id,
      image: "",
      userInfors: [],
      postsforOneUsers: [],
    };
  },
  created() {},
  mounted() {
    axios.get("http://localhost:3000/user/" + this.id).then((res) => {
      console.log(res.data.gotUser);
      const userData = res.data.gotUser;
      this.userInfors = userData;
    });

    axios.get("http://localhost:3000/userspost/" + this.id).then((res) => {
      console.log(res.data.gotUserPost);
      this.postsforOneUsers = res.data.gotUserPost;
      //console.log(postsforOneUser.data.postsforOneUser);
      //console.log(postsforOneUser.data.postsforOneUser.attachement);
      //this.post = Post.data;
    });
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
    onpick() {
      this.$refs.fileInput.click();
    },
    UpdatePhoto(e) {
      const file = e.target.files[0];
      this.profileimage = file;
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        this.image = fileReader.result;

        // this.avatar = e.target.result;
        console.log(this.image);
        console.log(this.profileimage);
      };
      //fileReader.readAsDataURL(file[0]);
      //this.image = file[0];
    },
  },
};
</script>
<style scoped>
.profile_wrapp {
  display: grid;
  justify-content: center;
}
.card {
  margin-top: 100px;
  background-color: #ffb3b3;
  padding: 30px;
  width: 30rem;
}
.card-body {
  display: flex;
  justify-content: space-around;
}
.form {
  margin-top: 100px;
}
.roundContainer {
  border-radius: 80%;
  height: 100px;
  border: 1px solid black;
  width: 100px;
}
.profile_image {
  border-radius: 80%;
  height: 100px;
  border: 1px solid black;
  width: 100px;
}

.post_details {
  width: 30%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  background-color: blanchedalmond;
  border-radius: 40px 0px 40px 0px;
  margin-top: 25px;
}
.postContent {
  width: 75%;
}
.postContent__image {
  width: 25%;
}
.post_wrappe {
  display: grid;
  justify-items: center;
}
.postimage {
  width: 70px;
  height: 75px;
}
</style>
