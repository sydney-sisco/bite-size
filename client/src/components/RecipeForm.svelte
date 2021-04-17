<!-- <script context="module">
  export async function preload(page, session) {
   return session;
  }
</script> -->

<script>
  import fetch from "cross-fetch";
  import { goto, stores } from '@sapper/app';
  import { onMount, afterUpdate } from 'svelte';
  import {
    CheckboxChipGroup,
    Headline,
    Button,
    TextField,
    FormField,
    FileDropzone,
  } from "attractions";
  import formatIngredients from '../helpers/helpers';

  const { session } = stores(); // session data is stored here

  
  export let recipe = [{}];
  let tagProps = $$props.tags
  // let items
  
  //grabs tags on mount, map through to convert tags from DB to checkbox params'
  onMount(async () => {
    const res = await fetch(`http://localhost:5001/preload/search`);
    const { tags } = await res.json();
    items = tags.map(({ id, name }) => {
      for (const tag of tagProps) {
        if (name === tag.name) {
          return ({ value: id, label: name, checked: true })
        }
      }
      return ({ value: id, label: name, checked: false })
    })
    console.log("RESULTS", items);   
  })
  // from edit:
  // <RecipeForm {...recipeDetails} {handleCancel} {handleSubmit}/>

  // from create:
  // <RecipeForm {handleSubmit}/> 
  
  let { 
    difficulty_id = 2,
    description = null,
    title = null,
    duration = 0,
    items = [],
    image_url = null,
    servings = null,
    // instructionSteps = ["", "", ""],
    unitOfMeasure = 1,
    quantity = 1,
  } = recipe[0];

  
  //built in checkbox callback - for each item in the checkbox list, updates state of checkbox to be passed to handleSubmit.
  function onCheckTag (e) {
    for (const item of items) {
      if (item.value === e.detail.value) {
        item.checked = e.detail.checked
      }
    }
  }

  // format instructions for the textarea
  export let instructions = [];
  let instructionSteps = ''

  for (let {instruction} of instructions) {
    instructionSteps += `${instruction}\n`;
  }

  
  // format ingredient list for the textarea
  export let ingredients = [];
  let ingredientList = '';

  for (let {quantity, unit, name} of ingredients) {
    ingredientList += `${formatIngredients(name, unit, quantity)}\n`
    // ingredientList += `${quantity} ${unit} of ${name}\n`
  }
  // removes new line at end 
  ingredientList = ingredientList.slice(0, -1) 

  // format duration into hours and minutes
  let hours = Math.floor(duration / 60);
  let minutes = duration % 60;


  let loadingState = false
  const difficultyNames = ["Beginner", "Intermediate", "Advanced"];

  // the new stuff goes here
  export let handleSubmit;
  export let handleCancel;

  const uploadImage = async (e) => {
    const uploadedImage = e.detail.files[0];
    const data = new FormData();
    data.append("file", uploadedImage);
    data.append("upload_preset", $session.key);
    const res = await fetch(
      $session.site,

      {
        method: "POST",
        body: data,
      }
      );
      const { secure_url } = await res.json();
      image_url = secure_url;
    };
    
    const changePhoto = () => {
      image_url = null;
    };

  
</script>

<main>
  {#if recipe[0].id}
  <Headline>Edit Recipe</Headline>
  {:else}
  <Headline>Create a New Recipe</Headline>
  {/if}

  <FormField name="Recipe Title" required>
    <TextField bind:value={title} />
  </FormField>

  <FormField name="Description">
    <TextField bind:value={description} />
  </FormField>

  <FormField name="Total Duration">
    Hours: 
      <input
        type="number"
        bind:value={hours}
        id="hours"
        name="hours"
        min="0"
        max="72"
      />
    Minutes: 
      <input
        type="number"
        bind:value={minutes}
        id="minutes"
        name="minutes"
        min="0"
        max="59"
      />
  </FormField>

  <FormField name="Servings">
    <input
      type="number"
      bind:value={servings}
      id="servings"
      name="servings"
      min="1"
      max="50"
    />
  </FormField>

  <FormField name="Difficulty">
    <input
      type="range"
      min="1"
      max="3"
      bind:value={difficulty_id}
      class="slider"
      name="difficulty-slider"
    />
    <output for="difficulty-slider">
      {difficultyNames[difficulty_id - 1]}
    </output>
  </FormField>

  <FormField name="Ingredients" required>
      <textarea 
        rows="8" 
        cols="50" 
        name="Ingredients" 
        bind:value={ingredientList} 
        placeholder="Put each ingredient on its own line."></textarea>
  </FormField>

  {#if !image_url}
    <FileDropzone accept="image/*" max={1} on:change={uploadImage}>
      <span slot='empty-layer'>Choose an Image</span>
    </FileDropzone>
  {:else}
    <img src={image_url} alt="recipe" />
    <Button on:click={changePhoto}>Pick a different photo</Button>
  {/if}

  {#if items}
  <CheckboxChipGroup {items} on:change={onCheckTag} name="group1" />
  {/if}

  <FormField name="Instructions" required>
    <textarea 
      rows="8" 
      cols="50" 
      name="Instructions" 
      bind:value={instructionSteps} 
      placeholder="Put each instruction on its own line."></textarea>
  </FormField>

  <!-- {#if recipe[0].id} -->
  <Button on:click={() => handleCancel()}>Cancel</Button>
  <!-- {/if} -->
  
  <Button filled class="btn" on:click={() => handleSubmit({
    userId: $session.user.id,
    title,
    difficulty_id,
    hours,
    minutes,
    image_url,
    servings,
    description,
    items,
    instructionSteps,
    ingredientList,
    unitOfMeasure,
    quantity
  }, recipe[0].id)}>{!loadingState ? 'Submit Recipe' : 'Loading...'}</Button>
</main>