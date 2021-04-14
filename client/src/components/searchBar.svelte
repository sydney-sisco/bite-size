<script context="module">
  export async function preload(page, session) {
		const res = await this.fetch(`http://localhost:5001/search`);
		const recipeList = await res.json();

		return {  };
	}
</script>

<script>
  import { Autocomplete } from 'attractions'

  async function* getOptions(text) {
    await sleep(1000);
    yield [
      { name: text, details: 'Optional' },
      { name: `it highlights the match: ${text}` },
      { name: `show me ${text}` }
    ];
  }
</script>

<Autocomplete {getOptions}/>