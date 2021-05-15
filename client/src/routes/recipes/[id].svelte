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

  ul, ol {
    background-color: #fff;
    padding-top: 25px;
    padding-right: 40px;
    padding-bottom: 25px;
    border-radius: 13%;
    font-size: 17px;
  }
  
  .right h2 {
    background-color: #343A40;
    color:  #FFF;
    padding-left: 1em;
    margin-bottom: 0;
  }

  .info {
    padding-left: 1em;
    padding-right: 1em;
  }

  .favourites {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 16px;
  }

  .emojis {
    display: flex;
    justify-content: space-evenly;
    margin-top: 15px;
    margin-bottom: 15px;

  }

  .buttons {
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
    justify-content: space-evenly;
  }

  .description {
    font-size: 19px;
  }

  p, li {
    font-size: 17px;
  }

  .instructions {
    padding-left: 68px;
  }

  .ingredients {
    padding-left: 68px;
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
  import { Button } from 'attractions';
  import { goto, stores } from '@sapper/app';
  import { fly } from 'svelte/transition'
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
      imageUrl,
      difficulty,
      userFavourite,
      favouriteCount,
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
  
  const handleSubmit = async (recipeObject, recipeId) => {
    //Create an if statement to make sure we have everything to make a recipe...
    console.log('recipe object from edit form:', recipeObject);
    
    loadingState = true

    let {
      title,
      difficultyId,
      items,
      hours,
      minutes,
      imageUrl,
      servings,
      description,
      instructionSteps,
      ingredientList,
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

    let userId = $session.user.id;

    let tags = items
      .filter(({ checked }) => checked)
      .map(({ value, label }) => ({ id: value, name: label }));

      try {
        const res = await fetch(`${$session.server}/recipes/${recipeId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            title,
            difficultyId,
            duration,
            tags,
            imageUrl,
            servings,
            description,
            instructionSteps,
            ingredientList
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
        recipeId: id
        }),
      });
      userFavourite = true
      recipeDetails.recipe[0].favouriteCount++;
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
      recipeDetails.recipe[0].favouriteCount--;
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
    <p class="description">{recipeDetails.recipe[0].description}</p>
    <h3>Ingredients</h3>
    <ul class="ingredients">
      {#each recipeDetails.ingredients as { name, unit, quantity }, id}
        <li>
          {formatIngredients(name, unit, quantity)}
        </li>
      {/each}
    </ul>
    <h3>Instructions</h3>
    <ol class="instructions">
      {#each recipeDetails.instructions as { instruction }}
        <li>
          {instruction}
        </li>
      {/each}
    </ol>
  </div>

  <div class="right">
    <h2>Recipe Info</h2>
    {#if recipeDetails.recipe[0].imageUrl}
    <img src="{recipeDetails.recipe[0].imageUrl}" alt="recipe">
    {:else}
    <img src="https://res.cloudinary.com/bitesizerecipes/image/upload/v1618603057/Bite-Size-Images/qo70e0mj3vobsoznw9yn.jpg" alt="Bite Size logo">
    {/if}
    <div class="info">
      <p>Difficulty: {recipeDetails.recipe[0].difficulty}</p>
      <p>Duration: {recipeDetails.recipe[0].duration} minutes</p>
      <p>Servings: {recipeDetails.recipe[0].servings}</p>
      {#each recipeDetails.tags as { name }}
      <li>{name}</li>
      {/each}
      <div class="favourites">
        <p>&#9734;{recipeDetails.recipe[0].favouriteCount}</p>
        {#if userFavourite}
          <Button  on:click={() => unfavouriteRecipe()} filled>Unfavourite Recipe</Button>
        {:else}
          <Button  on:click={() => favouriteRecipe()} outline>Favourite Recipe</Button>
        {/if}
      </div>
      <div class="emojis">
        {#each emojiReactions as emojiReaction }
        <Emoji recipeId={id} {emojiReaction} />
        {/each}
      </div>
      <div class="buttons">
        {#if recipeDetails.recipe[0].userId === $session.user.id}
        <Button outline on:click={() => editRecipe()}>Edit Recipe</Button>
        {/if}
        {#if recipeDetails.recipe[0].userId === $session.user.id}
        <Button outline on:click={() => deleteRecipe()}>Delete Recipe</Button>
        {/if}
      </div>
    </div>
  </div>
</main>
{:else if mode === EDIT}
  <RecipeForm {...recipeDetails} {handleCancel} {handleSubmit}/>
{/if}
