<script>
	import successkid from 'images/successkid.jpg';
  import fetch from 'cross-fetch';

  async function fetchUsers() {
    try {
      const response = await fetch(`http://localhost:5001/users`);
      return response.json();
      
    } catch (error) {
      throw new Error(error);
    }
	}

</script>

<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Bite Size</title>
</svelte:head>

<h1>Great success!</h1>

{#await fetchUsers()}
	<p>...waiting</p>
{:then users}
  <ul>
    {#each users as { username, email_address, user_id }}
      <li>
        {username}: {email_address}
      </li>
    {/each}
  </ul>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<figure>
	<img alt="Success Kid" src="{successkid}">
	<figcaption>Have fun with Sapper!</figcaption>
</figure>

<p><strong>Try  this file (src/routes/index.svelte) TESTINGZ</strong></p>