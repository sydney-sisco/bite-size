<script>
  import { onMount } from 'svelte'
  import Fuse from 'fuse.js'

	export let recipeList = [];

  onMount(async () => {
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

  const search = searchTerm => {

		if (!searchTerm) {
			searchResults = recipeList;
			return;
		}
  
    const fuse = new Fuse(recipeList, options);

    searchResults = fuse.search(searchTerm)
		.map(recipe => recipe.item);
  }
</script>

<input class="form-control" placeholder="Search for something yummy" type="text" name="search" autocomplete="off" bind:value={searchTerm} on:change="{() => search(searchTerm)}">
