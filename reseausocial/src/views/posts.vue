<template>
  <div class="wrappe">
    <Post></Post>
    <div class="postowner_details">
      <div class="userPicContainer">
        <img src="" />
      </div>

      <div class="authorAndDate">
        <p>nom</p>
        <p>prenom</p>
        <p>createdate</p>
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

    <div class="postactions comment_div">
      <button @click="toggle = !toggle">click to comment</button>
      <textarea v-show="toggle" placeholder="add multiple lines"></textarea>
      <button>send comment</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Post from "./post.vue";
//import { defineComponent } from '@vue/composition-api'

export default {
  name: "Posts",
  components: {
    Post,
  },
  data() {
    return {
      user: [],
      post: [],
      toggle: true,
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
        console.log(Post.data.Post[0].attachement);
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
  border-radius: 40px 40px 40px 40px;
  margin-top: 25px;
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
  border-radius: 40px 40px 40px 40px;
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
.postactions {
  display: flex;
  width: 40%;
  justify-content: space-around;
  align-items: center;
  background-color: #ffb3b3;
  height: 50px;
  border-radius: 40px 40px 40px 40px;
}
.comment_div {
  display: flex;
  justify-content: space-evenly;
}
textarea {
  height: 40px;
  width: 50%;
}
</style>
