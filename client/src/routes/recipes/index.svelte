<script context="module">

  import RecipeCard from "../../components/RecipecCard.svelte";

  export async function preload(page, session) {
		const { id } = page.params;

		const res = await this.fetch(`http://localhost:5001/recipes`);
		const recipeList = await res.json();

		return { recipeList };
	}

</script>

<script>
	export let recipeList;
</script>

<svelte:head>
	<title>Bite Size</title>
</svelte:head>

{#each recipeList as recipe, id}
  <RecipeCard recipe={recipe} />
{/each}
