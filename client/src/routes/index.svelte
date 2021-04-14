<script context="module">

  import RecipeCard from "../components/RecipecCard.svelte";

  export async function preload(page, session) {
		const { id } = page.params;

		const res = await this.fetch(`http://localhost:5001/recipes`);
		const recipeList = await res.json();

		return { recipeList };
	}

</script>

<script>

import { Button } from 'attractions';

export let recipeList;

const difficultId = parseInt(recipeList.difficult_id)

let featuredRecipes = false;

const showFeatured = async () => {
	if (featuredRecipes === true) {
		featuredRecipes = false;
	} else {
		featuredRecipes = true;
	}
}
</script>

<style>
	h1, p {
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

<p><strong>What do you want to eat?</strong></p>

<Button outline> Search Recipes</Button>
<a href="recipes"><Button outline>Browse Recipes</Button></a>

<Button outline on:click={showFeatured}>Featured Recipes</Button>

{console.log('recipelist: ', recipeList)}

{#if featuredRecipes}
	<div class='featured-recipes'>
		{#each recipeList as recipe, id}
			{#if recipe[0].difficulty_id >= 2}
				<RecipeCard recipe={recipe} />
			{/if}
		{/each}
	</div>
{/if}




