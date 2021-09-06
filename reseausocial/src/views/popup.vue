<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />
      <div class="post_wrapp">
        <div class="addpost_wrappe col-md-4">
          <form class="image_form" enctype="multipart/form-data">
            <div class="roundContainer">
              <img
                :src="postDetails.attachement"
                alt=""
                width="50px"
                height="50px"
              />
            </div>

            <input type="file" @change="UploadPhoto" />
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
            <p>this content:{{ postDetails.content }}</p>
          </div>
          <div class="write_post com-md-2">
            <div>
              <button class="btn_color">Post {{ id }}</button>
            </div>
          </div>
        </div>
      </div>
      <router-link to="/posts"> back</router-link>
      <button class="popup-close" @click="TogglePopup">close popup</button>
    </div>
  </div>
</template>

<script>
//import { defineComponent } from "@vue/composition-api";
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
      content: "",
      postId: "",
      createdOn: "",
      id: this.$route.params.id,
    };
  },
  mounted() {
    //displaing apropiate data in the post
    axios
      .get("http://localhost:3000/post", {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then((Post) => {
        console.log(Post);
        // const dataarrays = Post.data.Post;
        //this.postDetails = dataarrays;
        // console.log(dataarrays);
        //const datafirstarrayObject = dataarrays[0];
        //console.log(dataarrays[0].User);
      })
      .catch(() => {});
    //pasing selected post id to the back end
    axios
      .get("http://localhost:3000/postid/" + this.id, {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then((response) => {
        const postData = response.data.findPost;
        console.log(postData);
        this.postDetails = postData;
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
    getParams() {
      //   console.log(router.params);
      //   var routerParams = router.params;
      //   this.createdOn = routerParams.createdOn;
      //   console.log(routerParams);
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
}
</style>
