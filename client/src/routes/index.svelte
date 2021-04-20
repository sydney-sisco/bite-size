<script context="module">

  import RecipeCard from "../components/RecipecCard.svelte";

	import logo from "../../static/logo.png";
  
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
  import { fly } from 'svelte/transition';
  
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

	main {
		background-color: #ebebeb;
  	background-image: url("https://www.transparenttextures.com/patterns/exclusive-paper.png");
	}

	img {
		display: block;
		margin-left: auto;
		margin-right: auto;
		width: 30%;
	}

	p, .home-buttons {
    align-items: center;
		text-align: center;
		margin: 0 auto;
	}

	p {
		margin: 1em auto;
		font-size: 16pt;
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
		margin-top: 15px;
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
	
	input {
    width: 600px;
    text-align: center;
    border-radius: 15px;
		padding: .375rem .75rem;
  }

	a {
		text-decoration: none;
	}
	
</style>

<svelte:head>
	<title>Bite Size</title>
</svelte:head>

<main class="main">
	<img src="{logo}" alt="bite size logo">

	<p>a more digestible recipe site</p>

	
	<div class="home-buttons">
		<form on:submit|preventDefault="{submitSearch(searchTerm)}">
			<input class="form-control" type="text" name="search" autocomplete="off" placeholder="What do you want to eat?" bind:value={searchTerm}>
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
    <div transition:fly="{{ y: 200, duration: 750 }}">
			<RecipeCard recipe={recipe}/>
    </div>
			{/each}
			{/if}
		</div>
	</div>
</main>
	
	