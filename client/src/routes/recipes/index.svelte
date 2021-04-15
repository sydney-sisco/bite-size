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

  .right h2 {
    background-color: #000;
    color: #FF0;
    padding-left: 1em;
  }

  .recipe-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;

    background-color: #FFF0E5;
  }
</style>

<script context="module">

  import RecipeCard from "../../components/RecipecCard.svelte";

  export async function preload(page, session) {
		const { id } = page.params;

		const res = await this.fetch(`${session.server}/recipes`);
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

<main>
  <div class="left">
    <h1>Recipes</h1>

    <div class="recipe-container">
      {#each recipeList as recipe, id}
        <RecipeCard recipe={recipe} />
      {/each}
    </div>
  </div>
  <div class="right">
    <h2>Filters</h2>
    <ul>
      {#each [...Array(10).keys()] as i}
        <li>placeholder</li>
      {/each}
    </ul>  
  </div>
</main>
