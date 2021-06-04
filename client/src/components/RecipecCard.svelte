<style>
* {
	box-sizing: border-box;
}

.card {
	width: 360px;
	height: 360px;
	border-radius: 15px;
	padding: 1.5rem;
	background: white;
	position: relative;
	transition: 0.4s ease-out;
	box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.5);
  margin: 1em;
  
}

.card:hover {
	transform: translateY(20px);
}

.card:hover:before {
	opacity: 1;
}

.card:hover .info {
	opacity: 1;
	transform: translateY(0px);
}

.card:before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	display: block;
	width: 100%;
	height: 100%;
	border-radius: 15px;
	background: rgba(0, 0, 0, 0.6);
	z-index: 2;
	transition: 0.5s;
	opacity: 0;
}

.card img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	position: absolute;
	top: 0;
	left: 0;
	border-radius: 15px;
}

.card a {
  text-decoration: none;
  height: 100%
}

.card .favourite-star {
  display: relative;
  bottom: 0;
  right: 0;
}

.card .info {
  position: relative;
  display: grid;
	grid-template-rows: auto 1fr auto .75fr;
  grid-template-columns: auto auto;
  grid-template-areas:
    "header header"
    "desc desc"
    "tags tags"
    "user stars";
  width: 100%;
  height: 100%;
	z-index: 3;
	opacity: 0;
	transform: translateY(30px);
	transition: 0.5s;
  color: #EBEBEB;
}

.card .info h3 {
	margin: 0px;
  grid-area: header;
}

.card .info .card-text {
  grid-area: desc;
	letter-spacing: 1px;
	font-size: 15px;
	margin-top: 8px;
}

.card .tags {
  grid-area: tags;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 0;
}
.card .tags p {
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  background: #343A40;
}
.card .card-link {
  grid-area: user;
}
.card .favourite-star {
  grid-area: stars;
  text-align: right;
}
</style>


<script>
  export let recipe;
  let tags = recipe.tag;
</script>

  <div class='card'>
    <a href="/recipes/{recipe.id}">
    {#if recipe.imageUrl}
    <img style="width: 100%" src="{recipe.imageUrl}" alt="recipe">
  {:else}
    <img style="width: 100%" src="https://res.cloudinary.com/bitesizerecipes/image/upload/v1618603057/Bite-Size-Images/qo70e0mj3vobsoznw9yn.jpg" alt="Bite Size logo">
  {/if}
    <div class="info" style="width: 100%">
      <h3 class="card-title">{recipe.title}</h3>
      <p class="card-text">{recipe.description}</p>
      <div class="tags">
        {#if tags.length > 0}
        {#each tags as tag}
        <p>{tag.name}</p>
        {/each}
        {/if}
      </div>
      <p class="favourite-star">&#9734; &nbsp; {recipe.favourites}</p>
      <a href="/users/{recipe.userId}" class="card-link">@{recipe.username}</a>
    </div>
    </a>
  </div>

