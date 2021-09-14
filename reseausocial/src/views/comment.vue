<template>
  <main>
    <div class="comment_wrappe">
      <p class="p1">
        <button style="display:none" class="btn_color">
          Postid: {{ postId }}
        </button>
      </p>

      <p class="p2">
        <textarea
          name="text"
          id="text"
          v-model="comment"
          placeholder="Enter comment"
        ></textarea>
      </p>

      <p class="p3">
        <label for="submit"></label
        ><button
          @click="postComment"
          id="submit"
          class="btn btn-outline-primary my-2 my-sm-0 color"
        >
          Submit
        </button>
      </p>
    </div>
  </main>
</template>
<script>
import axios from "axios";
export default {
  data: function() {
    return {
      postId: this.$route.params.id,
      comment: "",
    };
  },
  methods: {
    postComment() {
      const commentData = {
        postId: this.postId,
        comment: this.comment,
      };

      axios
        .post("http://localhost:3000/comment", commentData, {
          headers: { token: localStorage.getItem("userToken") },
        })
        .then(
          (createComment) => {
            alert("your comment is successfully sent ");

            this.$router.push("/posts");
            createComment;
          },
          (error) => {
            console.log(error);
          }
        );
    },
  },
};
</script>
<style scoped>
.comment_wrappe {
  background-color: #ffb3b3;
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  box-shadow: 10px 5px 5px #3a1111;
  border-radius: 10px;
  margin-top: 100px;
}
main {
  display: flex;
  justify-content: center;
}
.p1 {
  width: 10%;
}
.p2 {
  width: 50%;
}
.p3 {
  width: 30%;
}
textarea {
  width: 100%;
}

@media (min-width: 768px) and (max-width: 1028px) {
}

@media (max-width: 768px) {
  .comment_wrappe {
    width: 90%;
  }
}
</style>
