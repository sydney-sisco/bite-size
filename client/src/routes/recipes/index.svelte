<style>
  .our-main {
    display: flex;
    flex-direction: column;
    height: 100vh;
    /* position: relative */
  }
    
  .filter-container {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: sticky;
    top: 85px;
    left: 0;
    width: 100%;
    z-index: 50;
    background-color: #FFF;
    padding: 2em;
  }

  .filter-container .tags-container {
    margin: 2em 2em 2em 0;
  }
  :global(.check-tags) {
    justify-content: center;
  }

  .recipe-container {
    display: flex;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }

</style>

<script context="module">

  import RecipeCard from "../../components/RecipecCard.svelte";
  import { onMount } from 'svelte';
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
  <div class="filter-container" transition:fly="{{ y: -500, duration: 800 }}">
    {#if filter }
    <!-- <h2>Filters</h2> -->
    <SearchBar {recipeList} bind:searchResults={searchResults} bind:searchTerm={searchTerm}/>
    <div class='tags-container'>
     {#if items}
      <CheckboxChipGroup {items} on:change={filterResults} name="group1" class="check-tags" />
      {/if}
    </div>  
    {/if}
    <Button class='filter-button' on:click={showFilters}>{filter ? 'Hide Filter' : 'Show Filters'}</Button>
  </div>
  <!-- <div class="recipes" > -->
    <!-- <h1>Recipes</h1> -->
    <div class="recipe-container" transition:fly="{{ y: -1000, duration: 800 }}">
      {#each filteredResults as recipe}
        <RecipeCard recipe={recipe} />
      {/each}
  </div>
<!-- </div> -->
</div>
