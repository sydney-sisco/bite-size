<style>
	.recipe {
		width: 300px;
		border: 1px solid #aaa;
		border-radius: 2px;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
		padding: 1em;
		margin: 0 0 1em 0;
	}

  .recipe:hover {
    box-shadow: 0 0 11px rgba(33,33,33,.2); 
  }
</style>

<div class="recipe">
	<slot></slot>
</div>
