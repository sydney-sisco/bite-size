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
  
  //grabs tags on mount, map through to convert tags from DB to checkbox params'
  // from edit:
  // <RecipeForm {...recipeDetails} {handleCancel} {handleSubmit}/>
  
  // from create:
  // <RecipeForm {handleSubmit}/> 
  onMount(async () => {
    const res = await fetch(`http://localhost:5001/preload/search`);
    const { tags } = await res.json();
    items = tags.map(({ id, name }) => {
      if (tagProps) {
        for (const tag of tagProps) {
          if (name === tag.name) {
            return ({ value: id, label: name, checked: true })
          }
        }
      }
      return ({ value: id, label: name, checked: false })
    })
    console.log(items);
  })
  
 

  
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

<style>

  
  .rf-header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* color: black; */
  }

  .form {
    /* border: 3px solid black; */
    display: flex;
    flex-direction: row;
    margin-top: 15px;
  }
  .text-fields {
    /* border: 2px solid red; */
    margin-right: 5px;
    width: 50%;
  }

  .recipe-title {
    margin: 15px;
  }

  .description {
    margin: 15px;
  }

  .ingredients {
    margin: 15px;
  }

  .instructions {
    margin: 15px;
  }

  .difficulty {
    margin: 15px;
  }

  .duration {
    margin: 15px;
  }

  .servings {
    margin: 15px;
  }

  .tags-photo {
    /* border: 2px solid blue; */
    margin-left: 5px;
    width: 50%;
  }


  .tags {
    /* border: 2px solid yellow; */
    margin: 15px;
  }

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    object-fit: contain;
  }

  .photo {
    margin-top: 23px;
    padding-left: 120px;
    padding-right: 120px;
  }

  .select-photo-button {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  
  }

  .change-photo-button {
    display: block;
    /* margin-left: auto;
    margin-right: auto; */
    width: 50%;
    margin-top: 15px;
    margin-left: 10px;
  
  
  }

  .rf-buttons {
    /* border: 2px solid green; */
    display: flex;
    justify-content: center;
    margin: 15px;
  }

  .cancel {
    margin-right: 5px;
  }

  .submit {
    margin-left: 5px;
  }
/* 
  @media only screen and (max-width: 1230) {
    
    .form {
      display: flex;
      flex-direction: column;
    }
  } */
  
</style>

<main class="recipe-form">
  <div class="rf-header">
    {#if recipe[0].id}
    <Headline>Edit Recipe</Headline>
    {:else}
    <Headline>Create a New Recipe</Headline>
    {/if}
  </div>

  <div class="form">
    <div class="text-fields">
      <div class="recipe-title">
        <FormField name="Recipe Title" required>
          <!-- <TextField bind:value={title} /> -->
          <textarea 
          rows="1" 
          cols="50" 
          name="Recipe Title" 
          bind:value={title}></textarea> 
        </FormField>
      </div>

      <div class="description">
        <FormField name="Description">
          <!-- <TextField bind:value={description} /> -->
          <textarea 
          rows="2" 
          cols="50" 
          name="Description" 
          bind:value={description}></textarea> 
        </FormField>
      </div>

      <div class="ingredients">
        <FormField name="Ingredients" required>
          <textarea 
          rows="8" 
          cols="50" 
          name="Ingredients" 
          bind:value={ingredientList} 
          placeholder="Put each ingredient on its own line."></textarea>
        </FormField>
      </div>

      <div class="instructions">
        <FormField name="Instructions" required>
          <textarea 
          rows="8" 
          cols="50" 
          name="Instructions" 
          bind:value={instructionSteps} 
          placeholder="Put each instruction on its own line."></textarea>
        </FormField>
      </div>
        
    </div>

    <div class="tags-photo">
      <div class="difficulty">
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
      </div>

      <div class="duration">
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
      </div>  

      <div class="servings">
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
      </div>
        
        <div class="tags">  
          {#if items}
          <CheckboxChipGroup {items} on:change={onCheckTag} name="group1" />
          {/if}
        </div>
      
        <div class="photo">
          {#if !image_url}
          <div class="select-photo-button">
            <FileDropzone accept="image/*" max={1} on:change={uploadImage}>
              <span type=text slot='empty-layer'>Choose an Image</span>
            </FileDropzone>
          </div>
          {:else}
          <img src={image_url} alt="recipe" />
          <div class="change-photo-button">
            <Button outline on:click={changePhoto}>Pick a different photo</Button>
          </div>
            {/if}
        </div>
    
      <div class="rf-buttons">
        <div class="cancel">
          <Button outline on:click={() => handleCancel()}>Cancel</Button>
        </div>
        <div class="submit"> 
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
        </div>
      </div>    
    </div>
  </div>
</main>