<style>

</style>

<script>

  import { stores } from "@sapper/app";
  const { session } = stores();
  console.log('session:', $session);

  import { Button } from 'attractions';

  export let recipeID;
  export let emojiReaction;

  console.log('data from button:', emojiReaction);

  const removeReaction = async emoji_id => {
    try {
      const res = await fetch(
        `http://localhost:5001/recipes/${recipeID}/emojis/${emoji_id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: $session.token? `Bearer ${$session.token}` : null,
          }
        }
      )
    } catch (error) {
      console.error(error)
    }
  }

  const addReaction = async emoji_id => {
    try {
      const res = await fetch(
        `http://localhost:5001/recipes/${recipeID}/emojis`,
        {
          method: 'POST',
          body: JSON.stringify({
            emoji_id,
          }),
          headers: {
            Authorization: $session.token? `Bearer ${$session.token}` : null,
          }
        }
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleClick = e => {
    console.log('clicked!');

    if (emojiReaction.selected) {
      emojiReaction.count--;
      removeReaction(emojiReaction.id);
    } else {
      emojiReaction.count++;
      addReaction(emojiReaction.id);
    }
    emojiReaction.selected = !emojiReaction.selected;
  };

</script>

{#if emojiReaction.selected}
  <Button on:click={handleClick} filled>{emojiReaction.emoji} x {emojiReaction.count}</Button>
{:else}
  <Button on:click={handleClick} outline>{emojiReaction.emoji} x {emojiReaction.count}</Button>
{/if}
