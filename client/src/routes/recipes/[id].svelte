<script context="module">
  export async function preload(page, session) {
    const { id } = page.params;
    const { token, user } = session;
    
		const res = await this.fetch(
      `http://localhost:5001/recipes/${id}`, 
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token? `Bearer ${token}` : null,
        }
      });
		const recipeDetails = await res.json();
    
		return { recipeDetails, id };
	}
</script>

<script>
  import {Button } from 'attractions';
  import { goto } from '@sapper/app';

  
  export let recipeDetails;
  export let id;
  
  async function deleteRecipe() {
    console.log('the id is: ', id)
    // const { id } = page.params;

    try {
      const res = await fetch(
        `http://localhost:5001/recipes/${id}`,
        {
          method: 'DELETE',
        }
      )
      goto('/recipes') // redirect to recipes homepage 
    } catch (error) {
      console.error(error)
    }
  }  
</script>

<svelte:head>
	<title>Bite Size</title>
</svelte:head>

<h3>{recipeDetails.recipe[0].title}</h3>
<p>{recipeDetails.recipe[0].description}</p>
{#each recipeDetails.emojiReactions as {name, emoji, count}}
  <div>{emoji}x{count}</div>
{/each}
<img style="width: 30%" src="{recipeDetails.recipe[0].image_url}" alt="recipe">

<p>Difficulty: {recipeDetails.recipe[0].difficulty}</p>
<p>Favs: {recipeDetails.recipe[0].favourite_count}</p>
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
</ul>
<Button on:click={() => deleteRecipe()}>Delete a Recipe</Button>
