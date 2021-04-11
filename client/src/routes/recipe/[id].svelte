<script context="module">

  export async function preload(page, session) {
		const { id } = page.params;

		const res = await this.fetch(`http://localhost:5001/recipes/${id}`);
		const recipeDetails = await res.json();

		return { recipeDetails };
	}

</script>

<script>
	export let recipeDetails;
</script>

<!-- <h1>{recipeDetails.recipe[0].title}</h1> -->

<svelte:head>
	<title>Bite Size</title>
</svelte:head>

<!-- {#await fetchRecipe()} -->
	<!-- <p>...waiting</p> -->
<!-- {:then recipeDetails} -->
  <h3>{recipeDetails.recipe[0].title}</h3>
  <p>{recipeDetails.recipe[0].description}</p>
  <img style="width: 30%" src="{recipeDetails.recipe[0].image_url}" alt="recipe">
  <h3>Instructions:</h3>
  <ul>
    {#each recipeDetails.instructions as { instruction }}
      <li>
        {instruction}
      </li>
    {/each}
  </ul>
<!-- {:catch error} -->
	<!-- <p style="color: red">This is the error:{error.message}</p> -->
<!-- {/await} -->
