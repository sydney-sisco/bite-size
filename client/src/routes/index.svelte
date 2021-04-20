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
	import { goto } from '@sapper/app';
  
  export let recipeList;

  
  let featuredRecipes = false;
  const showFeatured = async () => {
	featuredRecipes ? featuredRecipes = false : featuredRecipes = true; {
	  }	
  }

	let searchResults = [];

	let searchTerm = '';

	const submitSearch = searchTerm => {
		console.log('??', searchTerm);
		goto(`/recipes?search=${searchTerm}`);
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
		display: flex;
    flex: center;
    flex-direction: column;
	}

	.search-browse {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin: 10px;
	}
		
	.search-button {
		margin-right: 5px;
	}

	.browse-button {
		margin-right: 5px;
	}


	.fr-button {
		display: flex;
		flex: center;
		flex-direction: column;
		margin: 50px;
	}

	.fr-cards {
		display: flex;
		flex-direction: row;
		/* flex-wrap: wrap; */
		justify-content: space-around;
		width: 80vw;
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

<div class="home-buttons">
	<form on:submit|preventDefault="{submitSearch(searchTerm)}">
		<input type="text" name="search" autocomplete="off" bind:value={searchTerm}>
	</form>
  <div class="search-browse">
		<div class="search-button">
			<Button on:click="{submitSearch(searchTerm)}" outline> Search Recipes</Button>
		</div>
		<div class="browse-button">
			<a href="recipes"><Button outline>Browse Recipes</Button></a>
		</div>
	</div>
	<div class="featured-recipes">
		<div class="fr-button">
			<Button outline on:click={showFeatured}>Featured Recipes</Button>
		</div>
	</div>
	<div class="fr-cards">
		{#if featuredRecipes}
			{#each recipeList as recipe}
				<RecipeCard recipe={recipe}/>
			{/each}
		{/if}
	</div>
</div>

