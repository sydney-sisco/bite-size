<script context="module">
  export async function preload(page, session) {
    const { token, user, server } = session;

    if (!token) {
      return this.redirect(302, "login");
    }

    const response = await this.fetch(`${server}/users/${user.id}/recipes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const parsed = await response.json();

    if (parsed.error) {
      return this.error(response.status, parsed.error);
    }

    return { recipes: parsed.recipes };
  }
</script>

<script>
  import { stores } from "@sapper/app";
  
  import RecipeCard from "../../components/RecipecCard.svelte";
  
  const { session } = stores();
  console.log($session);
  export let recipes = [];
</script>

<style>
  .recipe-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>

<div class="recipe-container">
  {#each recipes as recipe, id}
    <RecipeCard recipe={recipe} />
  {/each}
</div>
