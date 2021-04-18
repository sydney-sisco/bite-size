<script>
  import { onMount } from 'svelte'
  import Fuse from 'fuse.js'

	export let recipeList = [];

  onMount(async () => {
    await getAllResults()
    // console.log('all data from server', allData);
    console.log('all recipe data', recipeList);
		
		if (searchTerm) {
			search(searchTerm);	
		}
  })

	// https://fusejs.io/api/options.html for more information about these options
	const options = {
		// isCaseSensitive: false,
		// includeScore: false,
		// shouldSort: true,
		// includeMatches: false,
		// findAllMatches: false,
		// minMatchCharLength: 1,
		// location: 0,
		threshold: 0.4,
		// distance: 100,
		// useExtendedSearch: false,
		// ignoreLocation: false,
		// ignoreFieldNorm: false,
		keys: [
			"title",
			"ingredients"
			// "author.firstName"
		]
	};
	
  export let searchResults = [];
  export let searchTerm = '';
	console.log('search term:', searchTerm)

  const search = searchTerm => {
    console.log('searching for:', searchTerm, '??');

		if (!searchTerm) {
			console.log('no search term, returning all');
			searchResults = recipeList;
			return;
		}
  
    const fuse = new Fuse(recipeList, options);

    searchResults = fuse.search(searchTerm)
		.map(recipe => recipe.item);
    console.log('search results:', searchResults);
  }
</script>

<input type="text" name="search" autocomplete="off" bind:value={searchTerm} on:change="{() => search(searchTerm)}">
