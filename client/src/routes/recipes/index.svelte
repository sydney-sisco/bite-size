<script context="module">

  import RecipeCard from "../../components/RecipecCard.svelte";

  export async function preload(page, session) {
		const { id } = page.params;

		const res = await this.fetch(`http://localhost:5001/recipes`);
		const recipeList = await res.json();

		return { recipeList };
	}

</script>

<script>
	export let recipeList;
</script>

<svelte:head>
	<title>Bite Size</title>
</svelte:head>

<!-- {#each recipeList as { title, description, image_url, username }, id} -->
{#each recipeList as recipe, id}
  <!-- <p>{title}</p> -->
  <RecipeCard recipe={recipe} />
{/each}

<!-- <h3>{recipeDetails.recipe[0].title}</h3>
<p>{recipeDetails.recipe[0].description}</p>
<img style="width: 30%" src="{recipeDetails.recipe[0].image_url}" alt="recipe">

<p>Difficulty: {recipeDetails.recipe[0].difficulty}</p>
<p>Duration: {recipeDetails.recipe[0].duration} minutes</p>
<p>Servings: {recipeDetails.recipe[0].servings}</p>

<h3>Ingredients:</h3>
<ul>
  {#each recipeDetails.ingredients as { name, unit, quantity }, id}
    <li>
      {quantity} x {unit} of {name} 
    </li>
  {/each}
</ul>

<h3>Instructions:</h3>
<ul>
  {#each recipeDetails.instructions as { instruction }}
    <li>
      {instruction}
    </li>
  {/each}
</ul> -->


<!-- {#await fetchRecipe()}
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
{/await} -->
