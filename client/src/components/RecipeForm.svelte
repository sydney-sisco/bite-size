<!-- <script context="module">
  export async function preload(page, session) {
   return session;
  }
</script> -->

<script>
  import fetch from "cross-fetch";
  import { goto, stores } from '@sapper/app';
  import {
    CheckboxChipGroup,
    Headline,
    Button,
    TextField,
    FormField,
    FileDropzone,
  } from "attractions";

  const { session } = stores(); // session data is stored here


  console.log('props??', $$props);

  export let recipe = [{}];
  console.log('recipe obj', recipe);

  // from edit:
  // <RecipeForm {...recipeDetails} {handleCancel} {handleSubmit}/>

  // from create:
  // <RecipeForm {handleSubmit}/> 
  
  let { 
    difficulty_id = 2,
    description = null,
    title = null,
    duration = 0,
    image_url = null,
    servings = null,
    // instructionSteps = ["", "", ""],
    unitOfMeasure = 1,
    quantity = 1,
  } = recipe[0];

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
    ingredientList += `${quantity} ${unit} of ${name}\n`
  }

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

  const items = [
    { value: 1, label: "Vegetarian" },
    { value: 2, label: "Vegan" },
    { value: 3, label: "Poultry" },
    { value: 4, label: "Seafood" },
    { value: 5, label: "Pork" },
    { value: 6, label: "Beef" },
    { value: 7, label: "Gluten-Free" },
    { value: 8, label: "Lactose-Free" },
    { value: 9, label: "Halal" },
    { value: 10, label: "Breakfast" },
    { value: 11, label: "Brunch" },
    { value: 12, label: "Lunch" },
    { value: 13, label: "Dinner" },
    { value: 14, label: "Dessert" }
  ];
</script>

<main>
  <Headline>Create a New Recipe</Headline>
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

    <CheckboxChipGroup {items} name="tags" outline />

    <FormField name="Instructions" required>
      <textarea 
        rows="8" 
        cols="50" 
        name="Instructions" 
        bind:value={instructionSteps} 
        placeholder="Put each instruction on its own line."></textarea>
    </FormField>

    <Button on:click={() => handleCancel()}>Cancel</Button>
    
    <Button filled class="btn" on:click={() => handleSubmit({
      userId: $session.user.id,
      title,
      difficulty_id,
      hours,
      minutes,
      image_url,
      servings,
      description,
      instructionSteps,
      ingredientList,
      unitOfMeasure,
      quantity
    }, recipe[0].id)}>{!loadingState ? 'Submit Recipe' : 'Loading...'}</Button>
</main>