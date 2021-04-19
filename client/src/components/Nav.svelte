<script>
	import { stores } from '@sapper/app';
  const { session, page } = stores();

	import logo from 'images/logo.png';
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
		margin-top: 1em;
		margin-right: 5px;
    margin-left: 5px;
	}

	li.logo {
		margin-top: 0em;
		padding: 0;
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

	a.logo {
		padding: .5em 0.5em;
	}

	img {
		width: 7em;
	}

	.nav-bar-tabs {
		display: flex;
    justify-content: space-between;
	}

	.nav-right {
		margin-right: 25px;
	}
	</style>

<nav>
	<ul>
		<!-- <li></li> -->
		<li class="logo" ><a class="logo" aria-current="{$page.path === '/' ? 'page' : undefined}" href="/"><img src="{logo}" alt="logo"></a></li>
		
		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
			the blog data when we hover over the link or tap it on a touchscreen -->
			<div class="nav-bar-tabs">
				<div class="nav-left">
					<li><a rel=prefetch aria-current="{$page.path === '/recipes' ? 'page' : undefined}" href="recipes">Browse Recipes</a></li>
					<li><a rel=prefetch aria-current="{$page.path === '/my-recipes' ? 'page' : undefined}" href="my-recipes">My Recipes</a></li>
					<li><a rel=prefetch aria-current="{$page.path === '/favourites' ? 'page' : undefined}" href="favourites">My Favourites</a></li>
					<li><a rel=prefetch aria-current="{$page.path === '/recipes/new' ? 'page' : undefined}" href="recipes/new">New Recipe</a></li>
				</div>
				<div class="nav-right">
					{#if $session.user}
					<li><a>Logged in as {$session.user.username}</a></li>
					{:else}
					<li><a rel=prefetch aria-current="{$page.path === '/login' ? 'page' : undefined}" href="login">Login</a></li>
					{/if}
				</div>
			</div>
	</ul>
</nav>
