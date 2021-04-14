<script>
	export let segment;
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
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
		background-color: rgb(255,62,0);
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
		<li><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">Home</a></li>
		
		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
			the blog data when we hover over the link or tap it on a touchscreen -->
			<li><a rel=prefetch aria-current="{segment === 'browse' ? 'page' : undefined}" href="recipes">Browse Recipes</a></li>
			<li><a rel=prefetch aria-current="{segment === 'my-recipes' ? 'page' : undefined}" href="my-recipes">My Recipes</a></li>
			<li><a rel=prefetch aria-current="{segment === 'favourites' ? 'page' : undefined}" href="favourites">My Favourites</a></li>
			<li><a rel=prefetch aria-current="{segment === 'new recipe' ? 'page' : undefined}" href="recipes/new">New Recipe</a></li>
	</ul>
</nav>
