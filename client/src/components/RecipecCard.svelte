<style>
	.recipe-card {
		width: 300px;
		border: 1px solid #aaa;
		border-radius: 2px;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
		padding: 1em;
		margin: 0 0 1em 0;
	}

  .recipe-card:hover {
    box-shadow: 0 0 11px rgba(33,33,33,.2); 
  }
</style>

<script>

  export let recipe;

</script>

<div class="recipe-card">
  <a href="/recipes/{recipe.id}"><h3>{recipe.title}</h3></a>
  <p>favs: {recipe.favourites}</p>
  <p>{recipe.description}</p>
  <p>created by: {recipe.username}</p>
</div>
