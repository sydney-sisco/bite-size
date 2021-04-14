<script>
	// export let segment;
	import { stores } from '@sapper/app';
  const { page } = stores();
  $: console.log($page.path);
</script>

<style>
	nav {
		/* border-bottom: 1px solid rgba(255,62,0,0.1); */
		border-bottom: 1px solid #000;
		font-weight: 400;
		padding: 0 1em;
		position: fixed; /* Set the navbar to fixed position */
		top: 0; /* Position the navbar at the top of the page */
		width: 100%; /* Full width */
    background-color: #FFF0E5;
		z-index: 999;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: #000;
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<nav>
	<ul>
		<li><a aria-current="{$page.path === '/' ? 'page' : undefined}" href=".">Home</a></li>
		
		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
			the blog data when we hover over the link or tap it on a touchscreen -->
			<li><a rel=prefetch aria-current="{$page.path === '/recipes' ? 'page' : undefined}" href="recipes">Browse Recipes</a></li>
			<li><a rel=prefetch aria-current="{$page.path === '/my-recipes' ? 'page' : undefined}" href="my-recipes">My Recipes</a></li>
			<li><a rel=prefetch aria-current="{$page.path === '/favourites' ? 'page' : undefined}" href="favourites">My Favourites</a></li>
			<li><a rel=prefetch aria-current="{$page.path === '/recipes/new' ? 'page' : undefined}" href="recipes/new">New Recipe</a></li>
	</ul>
</nav>
