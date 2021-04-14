<!-- <script context="module">
  export async function preload(page, session) {
		const res = await this.fetch(`http://localhost:5001/preload/search`);
		const allResults = await res.json();
		return { allResults };
	}
</script> -->

<script>
  import { onMount } from 'svelte'
  import { Autocomplete } from 'attractions'
  let allResults;

  async function getAllResults() {
		const res = await fetch(`http://localhost:5001/preload/search`);
		const queryResults = await res.json();
    allResults = queryResults
	}
  
  async function* getOptions(text) {
    // console.log(allResults.recipes);
    // const recipeTitles = allResults.recipes.map(recipe => recipe.title);
    // const ingredientNames = allResults.ingredients.map(ingredient => ingredient.name);
    // allResults.tags.map(tag => tag.name);

    // join arrays together

    yield [
      { name: text, details: 'Optional' },
      { name: text, details: 'Optional' },
      { name: 'recipe.title that matches', details: 'recipe details' },

    ];
  }

  onMount(async () => {
    await getAllResults()
    console.log(allResults);
  })
</script>

<Autocomplete {getOptions}/>
