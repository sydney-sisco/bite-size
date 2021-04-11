<script>
  import { afterUpdate } from 'svelte'
  import fetch from 'cross-fetch';
  import {
    Headline,
    Button ,
    TextField,
    FormField,
    Switch,
    Tabs,
    FileDropzone,
    Pagination,
    StarRating,
    // ThumbsUpIcon
  } from 'attractions';

  let selectedTab = 'Beginner';
  let happy = false;
  let recipeTitle = '';
  let imageUrl = null;
  let difficulty = 2;

  const difficultyNames = {
    1: 'Beginner',
    2: 'Intermediate',
    3: 'Advanced'
  }

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
      
    // console.log(file.secure_url)
  }

  const changePhoto = () => {
    imageUrl = null
  }

  afterUpdate(() => {
    console.log(recipeTitle);
	});
</script>

<Headline>Create a New Recipe</Headline>
<FormField
  name="Recipe Title"
  required
  >
  <TextField
    bind:value={recipeTitle}
  />
</FormField>

<FormField
  name="Secondary field"
  optional
>
  <TextField />
</FormField>

<!-- <FormField
  name="Happiness"
  errors={[happy && 'Not happy enough']}
>
  <Switch bind:value={happy} />
  
</FormField> -->

<!-- <Tabs
  name="difficulty"
  items={['Beginner', 'Intermediate', 'Advanced']}
  bind:value={selectedTab}
/> -->

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

<!-- <Pagination pages={3} /> -->

<!-- <StarRating name="difficulty" max={3}>
  <span slot="icon"><i class="fas fa-cookie-bite"></i></span>
</StarRating> -->

<!-- <input type="range" min="1" max="3" bind:value={difficulty} class="slider">
<label>{difficultyNames[difficulty]}</label> -->

<input type="range" min="1" max="3" bind:value={difficulty} class="slider" name="difficulty-slider">
<output for="difficulty-slider">{difficultyNames[difficulty]}</output>

<!-- create a "instruction step" component, then import it in to newRecipe -->