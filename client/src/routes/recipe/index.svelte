<script>
  import fetch from 'cross-fetch';

  async function fetchRecipe() {
    try {
      const response = await fetch(`http://localhost:5001/recipes/1`);
      return response.json();
      
    } catch (error) {
      throw new Error(error);
    }
	}

</script>

<svelte:head>
	<title>Bite Size</title>
</svelte:head>

<h1>Great success!</h1>

{#await fetchRecipe()}
	<p>...waiting</p>
{:then instructions}
  <ul>
    {#each instructions as { instruction }}
      <li>
        {instruction}
      </li>
    {/each}
  </ul>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
<!-- 
<figure>
	<img alt="Success Kid" src="{successkid}">
	<figcaption>Have fun with Sapper!</figcaption>
</figure> -->

<!-- <p><strong>Try  this file (src/routes/index.svelte) TESTINGZ</strong></p> -->