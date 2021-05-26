<script>

  import { stores } from "@sapper/app";
  const { session } = stores();

  import { Button } from 'attractions';

  export let recipeId;
  export let emojiReaction;

  const removeReaction = async emojiId => {
    try {
      await fetch(
        `${$session.server}/recipes/${recipeId}/emojis/${emojiId}`,
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

  const addReaction = async emojiId => {
    try {
      await fetch(
        `${$session.server}/recipes/${recipeId}/emojis`,
        {
          method: 'POST',
          body: JSON.stringify({
            emojiId,
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
  <Button on:click={handleClick} filled>{emojiReaction.emoji} &nbsp; {emojiReaction.count}</Button>
{:else}
  <Button on:click={handleClick} outline>{emojiReaction.emoji} &nbsp; {emojiReaction.count}</Button>
{/if}
