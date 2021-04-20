<style>
  .our-main {
    display: flex;
    flex-direction: row;
    /* width: 100vh; */
    height: 100vh;
    justify-content: space-between;
  }

  .left {
    width: 70%;
    /* max-width: 1000px; */
    ;
  }

  .right {
    width: 30%;
    margin-top: 3em;
    max-width: 336px;
    height: 0%;
    text-align: center;
    display: flex;
    flex-direction: column;

    /* keep the sidebar on screen when scrolling down */
    /* position: sticky;
    top: 80px; */
  }

  .right h2 {
    color: #000;
  }

  /* .right ul {
    background-color: grey;
  } */

  .recipe-container {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-basis: 30%;



    /* background-color: #FFF0E5; */
  }

</style>

<script context="module">

  import RecipeCard from "../../components/RecipecCard.svelte";
  import { onMount, afterUpdate } from 'svelte';
  import { CheckboxChipGroup, Button } from 'attractions';
  import { fly } from 'svelte/transition';

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

	export let recipeList;

  import SearchBar from '../../components/searchBar.svelte';

  //declare empty variables for functions to use below.
  let items;
  let filter = true;
  let filteredRecipes = [];
  
  let searchTerm = '';
  if ($page.query.search) {
     searchTerm = $page.query.search;
     filter = true;
  }
  let searchResults = recipeList;
  let filteredResults = searchResults;

  $: {
    filteredResults = searchResults;
  }

  //fetch all of the tags and map them into the correct format for CheckboxChipGroup.
  onMount(async () => {
    const res = await fetch(`http://localhost:5001/preload/search`);
    const { tags } = await res.json();
    items = tags.map(({ id, name }) => {
      return ({ value: id, label: name, checked: false })
    })
  })

  //shows or hides the filters on the page.
  const showFilters = () => {
    filter ? filter = false : filter = true
  }

  //filters the recipes by checking if items have been checked. 
  //if so, compares it to the tag of the recipes being shown, and shows that recipe.
  const filterResults = (e) => {
    filteredRecipes = []
    const tempItems = items
    .filter(item => item.checked)
    .map(item => item.value)

    // if no filters are selected, show all results
    if (tempItems.length === 0) {
      filteredResults = searchResults;
      return;
    }
    
    for (const recipe of searchResults) {
      for (const tag of recipe.tag) {
        if (tempItems.includes(tag.id)) {
          filteredRecipes.push(recipe)
        } else if (!tempItems.includes(tag.id) && filteredRecipes.includes(recipe)) {
          filteredRecipes = filteredRecipes.filter(element => element === recipe)
        }
      }
    }

    // display the filtered results
    filteredResults = filteredRecipes;
  }

</script>

<svelte:head>
	<title>Bite Size</title>
</svelte:head>

<div class="our-main">
  <div class="left" transition:fly="{{ y: -1000, duration: 800 }}">
    <h1>Recipes</h1>
      {#if filter === false}
        <Button on:click={showFilters}>Show Filters</Button>
      {:else}
        <Button on:click={showFilters}>Hide Filters</Button>
      {/if}
    <div class="recipe-container">
      <div class="row row-cols-1 row-cols-md-3 g-4">
        {#each filteredResults as recipe}
        <div class="col">
          <RecipeCard recipe={recipe} />
        </div>
      {/each}
    </div>
  </div>
</div>

  {#if filter }
  <div class="right" transition:fly="{{ y: -500, duration: 800 }}">
    <h2>Filters</h2>
    Search: <SearchBar {recipeList} bind:searchResults={searchResults} bind:searchTerm={searchTerm}/>
    <ul>
     {#if items}
      <CheckboxChipGroup {items} on:change={filterResults} name="group1"  />
      {/if}
    </ul>  
  </div>
  {/if}
</div>
