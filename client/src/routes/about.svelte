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

	p {
    align-items: center;
		text-align: center;
		margin: 0 auto;
	}

	p {
		margin: 1em auto;
		font-size: 16pt;
	}

	
</style>

<svelte:head>
	<title>Bite Size</title>
</svelte:head>

<main class="main">
	<img src="{logo}" alt="bite size logo">

	<p>a more digestible recipe site</p>

</main>
	
	