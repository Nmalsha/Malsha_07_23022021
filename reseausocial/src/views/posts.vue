<template>
  <div class="wrappe">
    <Post></Post>

    <div class="form_wrappe">
      <form
        class="DetailsOfPostOwnerForm "
        enctype="multipart/form-data"
        v-for="userAndPostDetail in userAndPostDetails"
        v-bind:key="userAndPostDetail.id"
      >
        <div id="userinfo" class="postowner_details">
          <div class="userPicContainer">
            <img
              class="userprofileimage"
              :src="userAndPostDetail.User.profileimage"
              @click="relatedProfilePage"
            />
          </div>

          <div class="authorAndDate">
            <h6>{{ userAndPostDetail.User.nom }}</h6>
            <h6>{{ userAndPostDetail.User.prenom }}</h6>
          </div>
        </div>

        <div id="postinfo" class="post_details">
          <div class="postContent__image">
            <img class="postimage" :src="userAndPostDetail.attachement" />
          </div>
          <div class="postContent_wrappe">
            <p class="postContent__text">{{ userAndPostDetail.createdAt }}</p>
            <h5 class="postContent__text">{{ userAndPostDetail.content }}</h5>
            <p class="postContent__text">postid:{{ userAndPostDetail.id }}</p>
          </div>
          <!--------popup----------->
          <div class="button_wrappe">
            <button
              class="btn btn-outline-primary my-2 my-sm-0 color "
              v-if="userId === userAndPostDetail.User.id"
              @click="
                editPost(
                  userAndPostDetail.id,
                  userAndPostDetail.content,
                  userAndPostDetail.attachement
                )
              "
            >
              Edit post
            </button>

            <button
              class="btn btn-outline-primary my-2 my-sm-0 color "
              v-if="userId === userAndPostDetail.User.id"
              @click="deletePost"
            >
              Delete post
            </button>
          </div>
        </div>

        <div class="postactions comment_div">
          <button @click="sendcomment(userAndPostDetail.id)">
            add comment
          </button>
        </div>
        <!-------------------dicplay comment --------->
        <div v-if="userAndPostDetail.id" class="postactions comment_div">
          <p>
            User
          </p>
          <p @click="sendcomment(userAndPostDetail.id)">
            comment here
          </p>
        </div>
        <!-------------------dicplay comment --------->
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Post from "./post.vue";
import { ref } from "vue";
import Popup from "./popup.vue";
//import { defineComponent } from '@vue/composition-api'

export default {
  // props: ["TogglePopup"],

  setup() {
    const popupTriggers = ref({
      buttonTrigger: true,
    });
    const TogglePopup = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger];
    };
    return {
      Popup,
      popupTriggers,
      TogglePopup,
    };
  },

  name: "Posts",
  components: {
    Post,

    // Popup,
  },
  // new Vue({
  //   el: '#editpost',
  //   data: {
  //     show: true
  //   }
  // }),
  data() {
    return {
      userAndPostDetails: [],
      toggle: true,
      postImage: "",
      content: "",
      commentDetails: [],
      userId: "",
      show: true,
      postId: "",
    };
  },
  mounted() {
    //get all post
    axios
      .get("http://localhost:3000/post", {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then((Post) => {
        const dataarrays = Post.data.Post;
        console.log(dataarrays);
        this.userAndPostDetails = dataarrays;
      })
      .catch(() => {});
    //get current user id
    axios
      .get("http://localhost:3000/user", {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then((res) => {
        this.userId = res.data.findUser.id;
        //console.log(res.data.findUser.id);
      });

    //get all comments

    axios
      .get("http://localhost:3000/comment", {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then((Comment) => {
        console.log(Comment.data.Comment);
        const commentArrays = Comment.data.Comment;
        this.commentDetails = commentArrays;
        //this.postId = userAndPostDetail.id ;
        //console.log(dataarrays);
        //const datafirstarrayObject = dataarrays[0];
        //console.log(dataarrays[0].User);
      })
      .catch(() => {});
  },
  created() {},

  methods: {
    //send post id to comment.vue
    sendcomment(id) {
      this.$router.push({
        path: `/comment/${id}`,
      });
    },

    editPost(id, content, attachement) {
      this.$router.push({
        path: `/popupe/${id}`,
        params: { id, content, attachement },
      });
      console.log(id);
      console.log(content);
      console.log(attachement);
    },
    deletePost() {
      axios
        .delete("http://localhost:3000/post", {
          headers: { token: localStorage.getItem("userToken") },
        })
        .then((res) => {
          alert("post is been deleted");
          this.$router.push("/posts");
          console.log(res);
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
.wrappe {
  display: grid;
  align-content: center;
  justify-items: center;
}
.form_wrappe {
  display: grid;
  width: 40%;
}
.postowner_details {
  display: flex;

  justify-content: space-around;
  align-items: center;
  background-color: #ffb3b3;
  height: 50px;
  border-radius: 40px 40px 40px 40px;
  margin-top: 25px;
}
.authorAndDate {
  display: flex;
  justify-content: space-around;
  width: 40%;
}

.userprofileimage {
  width: 78px;
  height: 40px;
  cursor: pointer;
}
.post_details {
  height: 200px;
  display: flex;
  justify-content: space-between;
  background-color: blanchedalmond;
  border-radius: 40px 40px 40px 40px;
}
.postContent__image {
  height: 40px;

  margin-top: 20px;
  width: 40%;
}

.postContent_wrappe {
  width: 50%;
  display: grid;
}
.postimage {
  width: 200px;
  height: 120px;
  cursor: pointer;
}
.postactions {
  display: flex;

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
.DetailsOfPostOwnerForm {
  width: 100%;

  justify-content: space-around;
  align-items: center;
}
.DetailsOfPostForm {
  height: 150px;
  display: flex;
  justify-content: space-between;
  background-color: blanchedalmond;
  border-radius: 40px 40px 40px 40px;
}
.button_wrappe {
  display: grid;
  justify-content: center;
  margin: 20px;
}
.button_wrappe button {
  height: 51px;
  font-size: 15px;
}

p {
  font-size: 12px;
}
</style>
