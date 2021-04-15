<script context="module">

  import RecipeCard from "../components/RecipecCard.svelte";
  
  export async function preload(page, session) {
		const res = await this.fetch(`${session.server}`, 
			{
				method: "GET",
			}
		);
		const recipeList = await res.json();
	
		return { recipeList };
	}
	
</script>

<script>
  import { Button } from 'attractions';
  import SearchBar from '../components/searchBar.svelte';
  
  export let recipeList;

  
  let featuredRecipes = false;
  const showFeatured = async () => {
	featuredRecipes ? featuredRecipes = false : featuredRecipes = true; {
	  }	
  }
</script>

<style>
	h1, p, h5, .home-buttons {
    align-items: center;
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

  h5 {
    padding-bottom: 60px
  }

  .home-buttons {
    flex: auto;
    flex-direction: row;

  }

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>


<svelte:head>
	<title>Bite Size</title>
</svelte:head>

<h1>Bite Size</h1>
<h5>a more digestible recipe site</h5>

<p><strong>What do you want to eat?</strong></p>

<SearchBar />

<div class="home-buttons">
  <Button outline> Search Recipes</Button>
  <a href="recipes"><Button outline>Browse Recipes</Button></a>
  <Button outline on:click={showFeatured}>Featured Recipes</Button>
    {#if featuredRecipes}
      <div class='featured-recipes'>
        {#each recipeList as recipe}
          <RecipeCard recipe={recipe}/>
        {/each}
      </div>
    {/if}
</div>


