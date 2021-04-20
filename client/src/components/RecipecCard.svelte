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
	display: flex;
	align-items: flex-end;
	transition: 0.4s ease-out;
	box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.5);
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

.card .info {
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;
  position: relative;
	z-index: 3;
	color: white;
	opacity: 0;
	transform: translateY(30px);
	transition: 0.5s;
}

.card .info h5 {
	margin: 0px;
}

.card .info p {
	letter-spacing: 1px;
	font-size: 15px;
	margin-top: 8px;
}
.card .list-group-item {
  color: #fff;
  background-color: transparent;
}
</style>


<script>
  export let recipe;
  let tags = recipe.tag;

  const difficultyNames = ["Beginner", "Intermediate", "Advanced"];
</script>

<!-- <div class="recipe-card">
  <a href="/recipes/{recipe.id}"><h3>{recipe.title}</h3>
    <main>
      <div class="info-line">
        <span>&#9734;{recipe.favourites}</span>
      </div>
      <div class="content">
        <div class="text">
          {#if recipe.description}
            <p>{recipe.description}</p>
          {/if}

          {#if tags}
            <ul class="tag-list">
              {#each tags as tag}
                <li>{tag.name}</li>
              {/each}
            </ul>
          {/if}
          <div class="below">
            <a class="user-link" href="/users/{recipe.user_id}"><span>@{recipe.username}</span></a>
            {#if recipe.difficulty_id > 2}
            <span class="difficulty-tag">{difficultyNames[recipe.difficulty_id - 1]}</span>
            {/if}
          </div>
        </div>
        {#if recipe.image_url}
        <img style="width: 50%" src="{recipe.image_url}" alt="recipe">
        {:else}
        <img style="width: 50%" src="https://res.cloudinary.com/bitesizerecipes/image/upload/v1618603057/Bite-Size-Images/qo70e0mj3vobsoznw9yn.jpg" alt="Bite Size logo">
        {/if}
      </div>
    </main>
  </a>
</div> -->

<!-- <div class="card mb-3">
  <a href="/recipes/{recipe.id}">
    <div class="row g-0">
    <div class="col-md-4">
      {#if recipe.image_url}
        <img style="width: 100%" src="{recipe.image_url}" alt="recipe">
      {:else}
        <img style="width: 100%" src="https://res.cloudinary.com/bitesizerecipes/image/upload/v1618603057/Bite-Size-Images/qo70e0mj3vobsoznw9yn.jpg" alt="Bite Size logo">
      {/if}
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{recipe.title}</h5>
        <p class="favourites">&#9734; &nbsp; {recipe.favourites}</p>
        <p class="card-text">
          {#if recipe.description}
            <p>{recipe.description}</p>
          {/if}
        </p>
        {#if tags}
          <ul class="tag-list">
          {#each tags as tag}
            <li>{tag.name}</li>
          {/each}
          </ul>
        {/if}
      </div>
      <div class="card-footer text-muted">
        <p class="card-text"><small class="text-muted"><a class="user-link" href="/users/{recipe.user_id}"><span>@{recipe.username}</span></a></small></p>
      </div>
    </div>
    </div>
  </a>
</div> -->

<!-- <div class="card text-center">

  <div class="card-body">
    <h5 class="card-title">{recipe.title}</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
  <div class="card-footer text-muted">
    <p class="card-text"><small class="text-muted"><a class="user-link" href="/users/{recipe.user_id}"><span>@{recipe.username}</span></a></small></p>
  </div>
</div> -->



	
  <div class='card'>
    <a href="/recipes/{recipe.id}">
    {#if recipe.image_url}
    <img style="width: 100%" src="{recipe.image_url}" alt="recipe">
  {:else}
    <img style="width: 100%" src="https://res.cloudinary.com/bitesizerecipes/image/upload/v1618603057/Bite-Size-Images/qo70e0mj3vobsoznw9yn.jpg" alt="Bite Size logo">
  {/if}
    <div class="info" style="width: 100%">
      <div class="card-header">
        <h5 class="card-title">{recipe.title}</h5>
        <p class="card-text">{recipe.description}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">&#9734; &nbsp; {recipe.favourites}</li>
        <!-- <li class="list-group-item">A second item</li> -->
        {#if tags.length > 0}
          <!-- <ul class="tag-list"> -->
          {#each tags as tag}
            <li class="list-group-item">{tag.name}</li>
          {/each}
          <!-- </ul> -->
        {/if}
        <!-- <li class="list-group-item">A third item</li> -->
      </ul>
      <a href="/users/{recipe.user_id}" class="card-link">@{recipe.username}</a>
    </div>
    </a>
  </div>

