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
    text-align: center;
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
  import { stores, goto } from '@sapper/app';
  const { page } = stores();
  console.log('page:', $page);
  console.log('page:', $page.query.search);


	export let recipeList;

  import SearchBar from '../../components/searchBar.svelte';
  
  let searchTerm = '';
  if ($page.query.search) {
     searchTerm = $page.query.search;
  }
  let searchResults = recipeList;
  
</script>

<svelte:head>
	<title>Bite Size</title>
</svelte:head>

<main>
  <div class="left">
    <h1>Recipes</h1>

    <div class="recipe-container">
      {#each searchResults as recipe, id}
        <RecipeCard recipe={recipe} />
      {/each}
    </div>
  </div>
  <div class="right">
    <h2>Filters</h2>
    Search: <SearchBar bind:searchResults={searchResults} bind:searchTerm={searchTerm}/>
  </div>
</main>
