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
    display: flex;
    flex-direction: column;
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
  // console.log('page:', $page);
  // console.log('page:', $page.query.search);


	export let recipeList;

  import SearchBar from '../../components/searchBar.svelte';

  //declare empty variables for functions to use below.
  let items;
  let filter = false;
  let filteredRecipes = [];
  
  let searchTerm = '';
  if ($page.query.search) {
     searchTerm = $page.query.search;
     filter = true;
  }
  let searchResults = recipeList;

  
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
    const tempItems = items.map(item => {
      if (item.checked) {
        return item.value
      }
    })
    
    for (const recipe of recipeList) {
      for (const tag of recipe.tag) {
        if (tempItems.includes(tag.id)) {
          filteredRecipes.push(recipe)
        } else if (!tempItems.includes(tag.id) && filteredRecipes.includes(recipe)) {
          filteredRecipes = filteredRecipes.filter(element => element === recipe)
        }
      }
    }

  //redeclare the value for auto-updating
    filteredRecipes = filteredRecipes
  }

</script>

<svelte:head>
	<title>Bite Size</title>
</svelte:head>

<main>
  <div class="left">
    <h1>Recipes</h1>
      {#if filter === false}
        <Button on:click={showFilters}>Show Filters</Button>
      {:else}
        <Button on:click={showFilters}>Hide Filters</Button>
      {/if}
    <div class="recipe-container">
      <!-- {#if filteredRecipes.length > 0} -->
        {#each searchResults as recipe}
          <RecipeCard recipe={recipe} />
        {/each}
      <!-- {:else} -->
        <!-- {#each recipeList as recipe} -->
          <!-- <RecipeCard recipe={recipe} /> -->
        <!-- {/each} -->
      <!-- {/if} -->
    </div>
  </div>
  {#if filter }
  <div class="right" transition:fly="{{ y: -300, duration: 500 }}">
    <h2>Filters</h2>
    Search: <SearchBar bind:searchResults={searchResults} bind:searchTerm={searchTerm}/>
    <ul>
     {#if items}
      <CheckboxChipGroup {items} on:change={filterResults} name="group1"  />
      {/if}
    </ul>  
  </div>
  {/if}
</main>
