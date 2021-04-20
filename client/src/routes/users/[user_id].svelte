<script context="module">

  export async function preload(page, session) {
    const { user_id } = page.params;
		
		const res = await this.fetch(`${session.server}/users/${user_id}/recipes`,
			{
				method: "GET",
			}
		);
		const recipeDetails = await res.json();
	
		return { recipeDetails };
	}
	
</script>

<script>
  
  import RecipeCard from '../../components/RecipecCard.svelte';
  export let recipeDetails;
	
</script>

<svelte:head>
  <title>Bite Size</title>
</svelte:head>

<div class="recipe-container">
  {#each recipeDetails.recipes as recipe}
    <RecipeCard recipe={recipe} />
  {/each}
</div>