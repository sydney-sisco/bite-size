<script>
  import { afterUpdate } from 'svelte'
  import fetch from 'cross-fetch';
  import {
    Headline,
    Button ,
    TextField,
    FormField,
    FileDropzone,
    TimePicker,
  } from 'attractions';

  
  let difficulty = 2;
  const difficultyNames = ['Beginner', 'Intermediate', 'Advanced']
  
  let recipeTitle = '';
  let duration;
  let servings = 1;
  let imageUrl = null;

  const uploadImage = async e => {
    const uploadedImage = e.detail.files[0];
    const data = new FormData()

    data.append('file', uploadedImage)
    data.append('upload_preset', 'nau31oag')

    const res = await fetch(
      '	https://api.cloudinary.com/v1_1/bitesizerecipes/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const { secure_url } = await res.json()
    imageUrl = secure_url
  }

  const changePhoto = () => {
    imageUrl = null
  }

  const convertDuration = () => {
    const minutes = duration.getMinutes()
    const hoursInMinutes = duration.getHours() * 60
    return `minutes ${minutes + hoursInMinutes}`
  }

  afterUpdate(() => {
    if (duration) {
      console.log(convertDuration());
    }
	});
</script>

<Headline>Create a New Recipe</Headline>
<FormField name="Recipe Title" required>
  <TextField bind:value={recipeTitle} />
</FormField>
<FormField name="Duration">
  <TimePicker right bind:value={duration} class="time-picker">
    <span slot="now-label"></span>
  </TimePicker>
</FormField>
<FormField name="Servings">
  <input type="number" bind:value={servings} id="servings" name="servings" min="1" max="50">
</FormField>

<input type="range" min="1" max="3" bind:value={difficulty} class="slider" name="difficulty-slider">
<output for="difficulty-slider">{difficultyNames[difficulty - 1]}</output>

{#if !imageUrl}
<FileDropzone
  accept="image/*"
  max={1}
  on:change={uploadImage}
/>
{:else}
  <img src="{imageUrl}" alt="recipe">
  <Button on:click={changePhoto}>Pick a different photo</Button>
{/if}
