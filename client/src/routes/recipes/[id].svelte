<style>
  main {
    display: flex;
    width: 100%;
    justify-content: space-between
  }

  .left {
    width: 67%;
    max-width: 816px;
  }

  .right {
    background-color: #FFF;
    width: 30%;
    margin-top: 3em;
    max-width: 336px;
    height: 0%;
  }

  img {
    width: 100%;
  }

  h3 {
    font-size: 36px;
  }

  ul {
    background-color: #fff;
  }
  
  ul.instructions {
    list-style-type: none;
    
  }

  ul.instructions li {
    position: relative;

    margin: 0;
    padding-bottom: 1em;
    padding-left: 20px;
  }

  /* The actual line being placed before each list item, tweak width and color as appropriate */
  ul.instructions li:before {
    background-color: #000;
    width: 2px;
    content: '';
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 5px;
  }

  /* Start the line further down on the first list item */
  ul.instructions li:first-child:before { top: 10px; }

  /* Stop the line short on the final list item */
  ul.instructions li:last-child:before { height: 6px; }

  ul.instructions li::after {
    content: '';
    position: absolute;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' viewBox='0 0 32 32' focusable='false'%3E%3Ccircle stroke='none' fill='%23000' cx='16' cy='16' r='10'%3E%3C/circle%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: contain;
    left: 0;
    top: 2px;
    width: 12px;
    height: 12px;
  }

  .right h2 {
    background-color: #000;
    color: #FF0;
    padding-left: 1em;
    margin-bottom: 0;
  }

  .info {
    padding-left: 1em;
    padding-right: 1em;
  }
</style>

<script context="module">
  export async function preload(page, session) {
    const { id } = page.params;
    const { token, user, server } = session;
    
		const res = await this.fetch(
      `${server}/recipes/${id}`, 
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
  import { afterUpdate } from 'svelte'
  import { Button } from 'attractions';
  import { goto, stores } from '@sapper/app';
  import fetch from "cross-fetch";
  import Emoji from '../../components/Emoji.svelte';
  import RecipeForm from "../../components/RecipeForm.svelte"

  const { session } = stores(); // session data is stored here

  export let recipeDetails;
  export let id;

  const EDIT = "EDIT";
  const VIEW = "VIEW";
  let mode = VIEW;

  let {
    recipe: [{
      title,
      description,
      image_url,
      difficulty,
      userFavourite,
      favourite_count,
      duration,
      servings
    }],
    emojiReactions,
    ingredients,
    instructions
 } = recipeDetails

//  console.log('recipe deets:', recipeDetails);

  async function editRecipe() {
   mode = EDIT;
  }  

  const handleCancel = () => {
    mode = VIEW;
  } 

  let loadingState = false;
  
  const handleSubmit = async (recipeObject, recipeID) => {
    //Create an if statement to make sure we have everything to make a recipe...
    console.log('recipe object from edit form:', recipeObject);
    
    let {
      user_id,
      title,
      difficulty_id,
      hours,
      minutes,
      image_url,
      servings,
      description,
      instructionSteps,
      ingredientList,
      unitOfMeasure,
      quantity
    } = recipeObject;

    let duration;

    if (hours && minutes) {
      duration = (hours * 60) + minutes
    } else if (!minutes && hours) {
      duration = hours * 60
    } else if (!hours && minutes) {
      duration = minutes
    } else {
      duration
    }

    loadingState = true
      try {
        const res = await fetch(`${$session.server}/recipes/${recipeID}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: $session.user.id,
            title,
            difficulty_id,
            duration,
            image_url,
            servings,
            description,
            instructionSteps,
            ingredientList,
            unitOfMeasure,
            quantity
          }),
        });
        loadingState = false

        const recipeDetailsFromServer = await res.json()
        console.log('recipe details from server after patch:', recipeDetailsFromServer);
        
        recipeDetails = recipeDetailsFromServer;
        

        mode = VIEW; // hide the edit form and show the recipe
      }
      catch (error) {
        console.error(error)
      }
    };

  
  async function deleteRecipe() {

    try {
      const res = await fetch(
        `${$session.server}/recipes/${id}`,
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
      await fetch(`${$session.server}/users/${$session.user.id}/favourites`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        recipe_id: id
        }),
      });
      userFavourite = true
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
      await fetch(`${$session.server}/users/${$session.user.id}/favourites/${id}`,
      {
        method: "DELETE",
  
      });
      userFavourite = false
      recipeDetails.recipe[0].favourite_count--;
      // goto('/') //redirect to user's recipes (once built)
    }
    catch (error) {
      console.error(error)
    }
  };

  import formatIngredients from '../../helpers/helpers';

</script>

<svelte:head>
	<title>Bite Size</title>
</svelte:head>

{#if mode === VIEW}
<main>
  <div class="left">
    <h3>{recipeDetails.recipe[0].title}</h3>
    <p>{recipeDetails.recipe[0].description}</p>
    <h3>Ingredients</h3>
    <ul>
      {#each recipeDetails.ingredients as { name, unit, quantity }, id}
        <li>
          {formatIngredients(name, unit, quantity)}
        </li>
      {/each}
    </ul>
    <h3>Instructions</h3>
    <ul class="instructions">
      {#each recipeDetails.instructions as { instruction }}
        <li>
          {instruction}
        </li>
      {/each}
    </ul>
  </div>

  <div class="right">
    <h2>Recipe Info</h2>
    {#if recipeDetails.recipe[0].image_url}
    <img src="{recipeDetails.recipe[0].image_url}" alt="recipe">
    {:else}
    <img src="https://res.cloudinary.com/bitesizerecipes/image/upload/v1618603057/Bite-Size-Images/qo70e0mj3vobsoznw9yn.jpg" alt="Bite Size logo">
    {/if}
    <div class="info">
      <p>Difficulty: {recipeDetails.recipe[0].difficulty}</p>
      <p>&#9734;{recipeDetails.recipe[0].favourite_count}</p>
      {#each emojiReactions as emojiReaction }
        <Emoji recipeID={id} {emojiReaction} />
      {/each}
      <p>Duration: {recipeDetails.recipe[0].duration} minutes</p>
      <p>Servings: {recipeDetails.recipe[0].servings}</p>
      {#if userFavourite}
        <Button  on:click={() => unfavouriteRecipe()} filled>Unfavourite Recipe</Button>
      {:else}
        <Button  on:click={() => favouriteRecipe()} outline>Favourite Recipe</Button>
      {/if}
      {#if recipeDetails.recipe[0].user_id === $session.user.id}
      <Button on:click={() => editRecipe()}>Edit Recipe</Button>
      {/if}
      {#if recipeDetails.recipe[0].user_id === $session.user.id}
      <Button on:click={() => deleteRecipe()}>Delete Recipe</Button>
      {/if}
    </div>
  </div>
</main>
{:else if mode === EDIT}
  <RecipeForm {...recipeDetails} {handleCancel} {handleSubmit}/>
{/if}
