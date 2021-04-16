<style>
	.recipe-card {
    width: 45%;
		border: 1px solid #000;
		padding: 0em 1em 1em 1em;
		margin: 1em 0 1em 0;
    font-weight: 400;

    transition: transform .1s, box-shadow .1s;
    transition-timing-function: ease-out;

    display: flex;
    flex-direction: column;
    background-color: #FFF;
	}

  .recipe-card:hover {
    box-shadow: -5px 5px #000;
    transform: translate(5px, -5px);
  }

  a {
    text-decoration: none;
  }

  h3 {
    font-size: 36px;
    margin: 0;
  }

  .info-line {
    display: flex;
    justify-content: left;
  }

  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 45%;
  }

  .below {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    width: 100%;
  }

  img {
    margin-top: 1em;
    border: 1px solid #000;
    /* height: auto; */
  }

  .difficulty-tag {
    background-color: #000;
    color: #FFF;
    font-weight: 800;
    margin-right: .5em;
    padding: 0rem .15rem;
  }

</style>


<script>

  export let recipe;

  const difficultyNames = ["Beginner", "Intermediate", "Advanced"];

</script>

<div class="recipe-card">
  <a href="/recipes/{recipe.id}"><h3>{recipe.title}</h3></a>
  <main>
    <div class="info-line">
      <span>&#9734;{recipe.favourites}</span>
    </div>
    <div class="content">
      <div class="text">
        <p>{recipe.description}</p>
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
</div>
