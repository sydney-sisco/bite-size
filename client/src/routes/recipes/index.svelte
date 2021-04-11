<script>
  import fetch from 'cross-fetch';

  async function fetchRecipe() {
    try {
      const response = await fetch(`http://localhost:5001/recipes/1`);
      return response.json();
      
    } catch (error) {
      throw new Error(error);
    }
	}

</script>

<svelte:head>
	<title>Bite Size</title>
</svelte:head>

{#await fetchRecipe()}
	<p>...waiting</p>
{:then recipeData}
  <h3>{recipeData.recipe[0].title}</h3>
  <p>{recipeData.recipe[0].description}</p>
  <img style="width: 30%" src="{recipeData.recipe[0].image_url}" alt="recipe">
  <h3>Instructions:</h3>
  <ul>
    {#each recipeData.instructions as { instruction }}
      <li>
        {instruction}
      </li>
    {/each}
  </ul>
{:catch error}
	<p style="color: red">This is the error:{error.message}</p>
{/await}
