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
  import { Button } from 'attractions';
  import { goto, stores } from '@sapper/app';
  import fetch from "cross-fetch";
  import Emoji from '../../components/Emoji.svelte';

  const { session } = stores(); // session data is stored here

  // console.log('the session is:', $session); // access it like this 

  // // user info, including id, is stored in a user object in the session
  // console.log('the session is:', $session);
  // console.log('the user ID is:', $session.user.id);
  // console.log('the user email is:', $session.user.email_address);

  export let recipeDetails;
  export let id;

  const {
    recipe: [{ title, description, image_url, difficulty, favourite_count, duration, servings }],
    emojiReactions,
    ingredients,
    instructions
 } = recipeDetails
  
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
      recipeDetails.recipe[0].userFavourite = true
      recipeDetails.recipe[0].favourite_count++;
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
      recipeDetails.recipe[0].userFavourite = false
      recipeDetails.recipe[0].favourite_count--;
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

<h3>{title}</h3>
<p>{description}</p>
{#each emojiReactions as {name, emoji, count}}
  <div>{emoji}x{count}</div>
{/each}
{#if image_url}
  <img style="width: 30%" src="{image_url}" alt="recipe">
{/if}

{#if recipeDetails.recipe[0].userFavourite}
<Button  on:click={() => unfavouriteRecipe()} filled>Unfavourite Recipe</Button>
{:else}
<Button  on:click={() => favouriteRecipe()} outline>Favourite Recipe</Button>
{/if}

<p>Difficulty: {difficulty}</p>
<p>Favs: {favourite_count}</p>
<p>Duration: {duration} minutes</p>
<p>Servings: {servings}</p>

<h3>Ingredients:</h3>
<ul>
  {#each ingredients as { name, unit, quantity }, id}
    <li>
      {quantity} x {unit} of {name} 
    </li>
  {/each}
</ul>

<h3>Instructions:</h3>
<ul>
  {#each instructions as { instruction }}
    <li>
      {instruction}
    </li>
  {/each}
</ul>
<Button on:click={() => deleteRecipe()}>Delete a Recipe</Button>

