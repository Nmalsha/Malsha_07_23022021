<template>
<nav class = "navbar navbar-expand-md navbar_dark">
    <div class="container">
      <div class="logo-wrappe col-md-3">
      <span class="p2 title title__style h6 align-self-center">
        <img src="../assets/icon-left-font-monochrome-black.png" width="400" height="300"/>
         </span></div><div class="collapse navbar-collapse  col-md-9">
        <ul class="navbar-nav ml-auto mb-2 mb-lg-0 col-md-9">
        <li class="nav-item col-md-12"><a href ="#">Profile</a></li>
        <li class="nav-item"><a href ="#">Deconnection</a></li>
		</ul>
      </div>
	</div>
</nav>
<div class="post-wrapp col-md-6">
	<h6>HI {{}}WHAT IS IN YOUR MOND TODAY ? LET OTHERS KNOW</h6>
</div>

	<div class="addpost_wrappe">
		<div class="add_img com-md-1">Insérer une image</div>
		<div class="write_post com-md-9"><input
              class="form-control mr-sm-2 bg-light"
              v-model="postContent"
              :maxlength="max"
              type="text"
              placeholder="Publier ici..."
              aria-label="publication"
              id="publication"
            /></div>
		<div class="write_post com-md-2">
			<div><button>Envoyer</button></div>
			<div><button>Annuler</button></div>
			</div>
	</div>

 
</template>

<script>
import axios from 'axios'

export default {
    name:'Post',
methods:{
		async getCurrentUser(data) {
			console.log(data)
		const response = await axios.get('user',{
			headers : {
				Authorization : 'Bearer'+ localStorage.getItem('userToken')
			}
		})
  console.log(response);
           


}
}

}
</script>

<style>
.post-wrapp{
margin-top: 100px;
height: 100px;
width: 40%;
display: inline-block

}
.addpost_wrappe{
display: flex;
justify-content: space-around;

}
.card-header {
  padding: 0 0 0 0;
  margin-bottom: 0;
  background-color: #00000000;
 
}
.card {
  box-shadow: 0 0 10px 0 rgba(183, 192, 206, 0.2);
  width: 75%;
  display: grid;
  
}
</style>
