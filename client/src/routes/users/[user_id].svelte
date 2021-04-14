<script context="module">

  export async function preload(page, session) {
		
		const res = await this.fetch(`http://localhost:5001/users/${user_id}/recipes`, 
			{
				method: "GET",
			}
		);
		const recipeDetails = await res.json();
	
    console.log('[user_id] recipe details:', recipeDetails)
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
  {#each recipeDetails as recipe}
    <RecipeCard recipe={recipe} />
  {/each}
</div>