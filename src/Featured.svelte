<script>
	let name = 'world';
	import Recipe from './Recipe.svelte';

  let recipes = [
    {title: 'Recipe 1', summary: 'yummy time'},
    {title: 'Recipe 2', summary: 'This is a recipe. It can contain anything.'},
    {title: 'Recipe 3', summary: 'yummy time'},
  ]
</script>

<style>
  .featured {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
</style>

<div class="featured">
  <!-- <Recipe>
    <h2>Hi!</h2>
    <p>This is another box.</p>
  </Recipe>
  
  <Recipe>
    <h2>Hello!</h2>
    <p>This is a box. It can contain anything.</p>
  </Recipe>
  
  <Recipe>
    <h2>Hello!</h2>
    <p>This is a box. It can contain anything.</p>
  </Recipe> -->

  {#each recipes as { title, summary }, i}
    <Recipe>
      <h2>{title}</h2>
      <p>{summary}</p>
    </Recipe>
  {/each}
</div>
