<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>


	main {
		padding: 8em 6em 4em;
		width: 100%;
		max-width: 90%;
		margin: 0 auto;
		box-sizing: border-box;
		margin-top: 10px;
	}
</style>


	<Nav {segment}/>
	
	<main>
		<slot></slot>
	</main>

