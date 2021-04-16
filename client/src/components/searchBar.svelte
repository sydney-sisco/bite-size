<!-- <script context="module">
  export async function preload(page, session) {
		const res = await this.fetch(`http://localhost:5001/preload/search`);
		const allResults = await res.json();
		return { allResults };
	}
</script> -->

<script>
  import { onMount } from 'svelte'
  import Fuse from 'fuse.js'

  let allData;

  async function getAllResults() {
		const res = await fetch(`http://localhost:5001/preload/search`);
		allData = await res.json();
    // allData = queryResults
	}

  onMount(async () => {
    await getAllResults()
    console.log('all data from server', allData);
  })

	const options = {
		// isCaseSensitive: false,
		// includeScore: false,
		// shouldSort: true,
		// includeMatches: false,
		// findAllMatches: false,
		// minMatchCharLength: 1,
		// location: 0,
		// threshold: 0.6,
		// distance: 100,
		// useExtendedSearch: false,
		// ignoreLocation: false,
		// ignoreFieldNorm: false,
		keys: [
			"title",
			// "author.firstName"
		]
	};
	
  export let searchResults = [];
  let searchTerm;

  const search = searchTerm => {
    console.log('searching for:', searchTerm);

    const fuse = new Fuse(allData.recipes, options);

    searchResults = fuse.search(searchTerm);
    console.log('search results:', searchResults);
  }
</script>

<input type="text" name="search" autocomplete="off" bind:value={searchTerm} on:change="{() => search(searchTerm)}">
