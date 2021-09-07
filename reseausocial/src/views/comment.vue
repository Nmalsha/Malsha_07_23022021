<template>
  <div>
    <p>
      <button class="btn_color">Postid: {{ postId }}</button>
    </p>

    <p>
      <label for="text">Comment</label
      ><textarea
        name="text"
        id="text"
        v-model="comment"
        placeholder="Enter comment"
      ></textarea>
    </p>

    <p>
      <label for="submit"></label
      ><button @click="postComment" id="submit" class="btn btn-primary">
        Submit
      </button>
    </p>
  </div>
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
      console.log(commentData);

      //   const formData = new FormData();
      //   formData.append("commentData", JSON.stringify(commentData));
      //   console.log(formData);
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
      /*


      var comment = { name: this.name, text: this.text };

      // POST /someUrl
      this.$http.post("/api/comments", comment).then(
        () => {
          this.$parent.comments.push(comment);
        },
        (response) => {
          console.log(response);
        }
      );
      */
    },
  },
};
</script>
