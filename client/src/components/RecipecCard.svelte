<style>
	.recipe-card {
		width: 300px;
		border: 1px solid #000;
		/* border-radius: 2px; */
		/* box-shadow: 2px 2px 8px rgba(95, 81, 81, 0.1); */
		padding: 1em;
		margin: 0 0 1em 0;
    width: 25%;
    font-weight: 400;

    transition: transform .1s, box-shadow .1s;
    /* transition-timing-function: ease; */
    transition-timing-function: ease-out;
	}

  .recipe-card:hover {
    /* box-shadow: 0 0 11px rgba(33,33,33,.2);  */
    /* box-shadow: 0px 10px 10px 0px; */
    box-shadow: -5px 5px #000;
    transform: translate(5px, -5px);
  }

</style>

<script>

  export let recipe;

</script>

<div class="recipe-card">
  <a href="/recipes/{recipe.id}"><h3>{recipe.title}</h3></a>
  <p>created by: {recipe.username}</p>
  <img style="width: 100%" src="{recipe.image_url}" alt="recipe">
  <p>favs: {recipe.favourites}</p>
  <p>{recipe.description}</p>
</div>
