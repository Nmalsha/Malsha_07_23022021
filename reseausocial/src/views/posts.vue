<template>
  <div class="wrappe">
    <div class="postowner_details">
      <div class="userPicContainer">
        <img src="{{profileimage}}" />
      </div>

      <div class="authorAndDate">
        <p>{{ nom }}</p>
        <p>{{ prenom }}</p>
        <p>{{ postCreatedDate }}</p>
      </div>
    </div>

    <div class="post_details">
      <div class="postContent__image">
        <img src="{{attachement}}" />
      </div>
      <div class="postContent">
        <p class="postContent__text">{{ content }}</p>
      </div>
    </div>

    <div class="postactions">
      <div class="comments">
        <p class="">
          <fas class="icon" icon="thumbs-up"></fas>
        </p>
        <p>comments</p>
      </div>
      <div class="likes">
        <p>Like</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
//import { defineComponent } from '@vue/composition-api'

export default {
  name: "Posts",
  data() {
    return {
      nom: "",
      prenom: "",
      profileimage: "",
      postCreatedDate: "",
      content: "",
      attachement: "",
      likes: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/post", {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then((Post) => {
        console.log("toto");
        console.log(Post.data.Post);
        console.log(Post.data.Post[0]);
        console.log(Post.data.Post[0].userId);
        // this.nom = res.dataValues.Post.nom;
        // this.prenom = res.dataValues.Post.prenom;
        // this.profileimage = res.dataValues.Post.profileimage;
        // this.postCreatedDate = res.dataValues.Post.createdAt;
        // this.content = res.dataValues.Post.content;
        // this.attachement = res.dataValues.Post.attachement;
      })
      .catch(() => {});
  },
};
</script>

<style scoped>
.wrappe {
  display: grid;
  align-content: center;
  justify-items: center;
}
.postowner_details {
  display: flex;
  width: 40%;
  justify-content: space-around;
  align-items: center;
  background-color: #ffb3b3;
  height: 50px;
  border-radius: 0 40px 0 40px;
}
.authorAndDate {
  display: flex;
}
.userPicContainer {
  width: 10%;
  height: 40px;
  border: 0.5px solid;
  border-radius: 40%;
}
.post_details {
  width: 40%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  background-color: blanchedalmond;
  margin-top: 10px;
}
.postContent__image {
  width: 10%;
  height: 40px;
  border: 0.5px solid;
  margin-top: 20px;
}
.postContent {
  width: 90%;
}
</style>
