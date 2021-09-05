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
            <p>{{ userAndPostDetail.User.nom }}</p>
            <p>{{ userAndPostDetail.User.prenom }}</p>
          </div>
        </div>

        <div id="postinfo" class="post_details">
          <div class="postContent__image">
            <input
              type="file"
              ref="image"
              accept=".jpg,.jpeg,.png"
              @change="editPostImage"
              style="display:'none'"
              v-if="userId === userAndPostDetail.User.id"
            />
            <img class="postimage" :src="userAndPostDetail.attachement" />
          </div>
          <div class="postContent">
            <input class="postContent__text" />{{ userAndPostDetail.content }}/>
            <p class="postContent__text">{{ userAndPostDetail.createdAt }}</p>
            <p class="postContent__text">postid:{{ userAndPostDetail.id }}</p>

            <!--------popup----------->
            <div>
              <button
                v-if="userId === userAndPostDetail.User.id"
                @click="() => TogglePopup('buttonTrigger')"
              >
                Edit post
              </button>
              <Popup
                v-if="popupTriggers.buttonTrigger"
                :TogglePopup="() => TogglePopup('buttonTrigger')"
              >
                <h3>my popup</h3>
              </Popup>
            </div>

            <!---------end popup---------->
            <button
              v-if="userId === userAndPostDetail.User.id"
              @click="editPost"
            >
              Delete post
            </button>
          </div>
        </div>

        <div class="postactions comment_div">
          <button @click="toggle = !toggle">click to comment</button>
          <input
            v-show="toggle"
            v-model="comment"
            placeholder="add multiple lines"
          />
          <button @click="sendcomment">send comment</button>
        </div>
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
  setup() {
    const popupTriggers = ref({
      buttonTrigger: false,
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
    Popup,
  },

  data() {
    return {
      userAndPostDetails: [],
      toggle: true,
      postImage: "",
      content: "",
      comment: "",
      userId: "",
    };
  },
  mounted() {
    //get all post
    axios
      .get("http://localhost:3000/post", {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then((Post) => {
        console.log(Post);
        const dataarrays = Post.data.Post;
        this.userAndPostDetails = dataarrays;
        console.log(dataarrays);
        //const datafirstarrayObject = dataarrays[0];
        console.log(dataarrays[0].User);
      })
      .catch(() => {});
    //get current user id
    axios
      .get("http://localhost:3000/user", {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then((res) => {
        this.userId = res.data.findUser.id;
        console.log(res.data.findUser.id);
      });
  },
  created() {},
  methods: {
    sendcomment() {
      axios
        .post("http://localhost:3000/comment", {
          headers: { token: localStorage.getItem("userToken") },
          comment: this.comment,
        })
        .then(
          (reponse) => {
            console.log("comenthere");
            console.log(reponse.data);
          },
          (error) => {
            console.log(error);
          }
        );
    },
    editPostImage(e) {
      const file = e.target.files[0];
      this.postImage = file;
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        this.postImage = fileReader.result;
        // this.avatar = e.target.result;
        console.log(this.image);
        //console.log(this.profileimage);
      };
    },
    editPost() {
      const dataPost = {
        headers: { token: localStorage.getItem("userToken") },

        content: this.content,
      };
      const formData = new FormData();
      formData.append("postImage", this.postImage);
      formData.append("user", JSON.stringify(dataPost));
      axios
        .put("http://localhost:3000/post", formData, {
          headers: { token: localStorage.getItem("userToken") },
        })
        .then((res) => {
          alert("your post is been updated");
          this.$router.push("/posts");
          //console.log(res.email);
          console.log(res.data);
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
.postContent {
  width: 50%;
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
</style>
