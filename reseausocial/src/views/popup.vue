<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />
      <div class="post_wrapp">
        <div class="eddit_post col-md-4">
          <form class="image_form" enctype="multipart/form-data">
            <div class="roundContainer">
              <img :src="image" alt="" width="50px" height="50px" />
            </div>

            <input type="file" @change="updateImage" />
          </form>
          <div class="write_post com-md-9">
            <input
              class="form-control mr-sm-2 bg-light"
              v-model="content"
              maxlength="max"
              type="text"
              :placeholder="postDetails.content"
              aria-label="publication"
              id="publication"
            />
          </div>
        </div>
      </div>
      <button
        @click="updatePost"
        class="btn btn-outline-primary my-2 my-sm-0 color "
        type="submit"
      >
        Update Post
      </button>
      <router-link
        class="btn btn-outline-primary my-2 my-sm-0 color "
        to="/posts"
      >
        update later</router-link
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["TogglePopup"],
  watch: {
    " $route"(to, from) {
      alert(to.params.id);
      alert(from.params.id);
    },
  },
  data() {
    return {
      postDetails: [],
      postImage: "",
      attachement: this.attachement,
      content: "",
      postId: "",
      createdOn: "",
      id: this.$route.params.id,
      image: "",
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/postid/" + this.id, {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then((response) => {
        const postData = response.data.findPost;
        console.log(postData);
        this.postDetails = postData;
        this.image = response.data.findPost.attachement;
      })
      .catch(() => {});
  },
  created() {
    const getcontent = this.$route.params.content;
    this.content = getcontent;
    //console.log(this.$route.params.content);
    // alert(this.$route.params.id);
  },
  methods: {
    updateImage(e) {
      const file = e.target.files[0];
      this.attachement = file;
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        this.image = fileReader.result;
      };
      //fileReader.readAsDataURL(file[0]);
      //this.image = file[0];
    },
    updatePost() {
      const dataPost = {
        headers: { token: localStorage.getItem("userToken") },
        content: this.content,
        attachement: this.attachement,
        id: this.id,
      };
      // console.log(dataPost);

      const formData = new FormData();

      if (this.attachement) {
        formData.append("image", this.attachement);
      }
      formData.append("post", JSON.stringify(dataPost));
      axios
        .put("http://localhost:3000/post", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("userToken"),
          },
        })

        .then(() => {
          alert("post is been updated");
          this.$router.push("/posts");
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
.popup {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-inner {
  background: white;
  padding: 32px;
  height: 400px;
}
.eddit_post {
  align-items: center;
  justify-content: space-evenly;
  background-color: #ffb3b3;
  width: 98%;
  display: flex;
  justify-content: space-around;
  padding: 30px;
  height: 300px;
}
.image_form {
  width: 30%;
  height: 250px;
}
.write_post {
  width: 50%;
  height: 250px;
}
.write_post input {
  height: 200px;
}
.roundContainer img {
  height: 120px;
  width: 150px;
}

@media (min-width: 768px) and (max-width: 1028px) {
}

@media (max-width: 768px) {
  .eddit_post {
    display: grid;
  }
  .image_form {
    height: 130px;
  }
  .write_post {
    height: 60px;
  }
  .write_post input {
    height: 80px;
  }
}
</style>
