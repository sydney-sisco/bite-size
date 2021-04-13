<script context="module">
  export async function preload(page, session) {
    const { id } = page.params;
    
		const res = await this.fetch(`http://localhost:5001/recipes/${id}`);
		const recipeDetails = await res.json();
    
		return { recipeDetails, id };
	}
</script>

<script>
  import { Button } from 'attractions';
  import { goto, stores } from '@sapper/app';
  import fetch from "cross-fetch";

  const { session } = stores(); // session data is stored here

  // console.log('the session is:', $session); // access it like this 

  // // user info, including id, is stored in a user object in the session
  // console.log('the session is:', $session);
  // console.log('the user ID is:', $session.user.id);
  // console.log('the user email is:', $session.user.email_address);

  export let recipeDetails;
  export let id;
  
  async function deleteRecipe() {
    console.log('the deleted recipe id is: ', id)
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

  let favState = false;

  async function favouriteRecipe() {
   console.log("fav recipe id is:", id)
    try {
      await fetch(`http://localhost:5001/users/${$session.user.id}/favourites`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        recipe_id: id
        }),
      });
      favState = true
      // goto('/') //redirect to user's recipes (once built)
    }
    catch (error) {
      console.error(error)
    }
  };

  async function unfavouriteRecipe() {
   console.log("the unfav id is:", id)
    try {
      await fetch(`http://localhost:5001/users/${$session.user.id}/favourites/${id}`,
      {
        method: "DELETE",
  
      });
      favState = false
      // goto('/') //redirect to user's recipes (once built)
    }
    catch (error) {
      console.error(error)
    }
  };

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

{#if favState === false}
<Button on:click={() => favouriteRecipe()}>Favourite Recipe</Button>
{:else}
<Button on:click={() => unfavouriteRecipe()}>Unfavourite Recipe</Button>
{/if}

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

