<script context="module">
  export async function preload(page, session) {
   const { user, token, key, site } = session;
   return session;
  }
</script>

<script>
  // export let token;
  // export let user;
  // export let site;
  // export let key;
  // import { afterUpdate } from "svelte";

  import fetch from "cross-fetch";
  import { goto, stores } from '@sapper/app';
  const { session } = stores(); // session data is stored here
  import {
    CheckboxChipGroup,
    Headline,
    Button,
    TextField,
    FormField,
    FileDropzone,
  } from "attractions";

  let hours = 0;
  let minutes = 0;
  let title = null;
  let difficulty = 2;
  let duration = 0;
  let imageUrl = null;
  let servings = null;
  let description = null;
  let instructionSteps = ["", "", ""];
  let ingredientList = [""];
  let unitOfMeasure = 1;
  let quantity = 1;

  let loadingState = false
  const difficultyNames = ["Beginner", "Intermediate", "Advanced"];

  const handleSubmit = async () => {
    console.log('the user ID is:', $session.user.id);

    if (hours && minutes) {
      duration = (hours * 60) + minutes
    } else if (!minutes && hours) {
      duration = hours * 60
    } else if (!hours && minutes) {
      duration = minutes
    } else {
      duration
    }

    //Create an if statement to make sure we have everything to make a recipe...
    loadingState = true
      try {
        const res = await fetch("http://localhost:5001/recipes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: $session.user.id,
            title,
            difficulty,
            duration,
            imageUrl,
            servings,
            description,
            instructionSteps,
            ingredientList,
            unitOfMeasure,
            quantity
          }),
        });
        loadingState = false
        const { recipe: { id } } = await res.json()

        goto(`/recipes/${id}`)
      }
      catch (error) {
        console.error(error)
      }
    };

  const uploadImage = async (e) => {
    const uploadedImage = e.detail.files[0];
    const data = new FormData();
    data.append("file", uploadedImage);
    data.append("upload_preset", 'nau31oag');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/bitesizerecipes/upload',

      {
        method: "POST",
        body: data,
      }
      );
      const { secure_url } = await res.json();
      imageUrl = secure_url;
    };
    
    const changePhoto = () => {
      imageUrl = null;
    };
    
    const addStep = () => {
      instructionSteps.push("");
      instructionSteps = instructionSteps;
      console.log(instructionSteps);
    };
    
    const removeStep = () => {
      instructionSteps.pop("");
      instructionSteps = instructionSteps;
    };
    
    const addIngredient = () => {
      ingredientList.push("");
      ingredientList = ingredientList;
      console.log(ingredientList);
    };

  const removeIngredient = () => {
    ingredientList.pop("");
    ingredientList = ingredientList;
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

<Headline>Create a New Recipe</Headline>
  <FormField name="Recipe Title" required>
    <TextField bind:value={title} />
  </FormField>
  <FormField name="Description">
    <TextField bind:value={description} />
  </FormField>
  <FormField name="Total Duration">
    Hours: <input
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
      bind:value={difficulty}
      class="slider"
      name="difficulty-slider"
    />
    <output for="difficulty-slider">{difficultyNames[difficulty - 1]}</output>
  </FormField>

  <!-- {#each ingredientList as ingredient, index} -->
    <FormField name="Ingredients" required>
      <!-- <TextField bind:value={ingredientList[index]} /> -->

      <textarea rows="8" cols="50" name="Ingredients" bind:value={ingredientList} placeholder="Put each ingredient on its own line."></textarea>

    </FormField>
  <!-- {/each} -->

  <!-- <Button on:click={addIngredient}>Add Ingredient</Button> -->
  <!-- <Button on:click={removeIngredient}>Remove</Button> -->

  {#if !imageUrl}
    <FileDropzone accept="image/*" max={1} on:change={uploadImage}>
      <span slot='empty-layer'>Choose an Image</span>
    </FileDropzone>
  {:else}
    <img src={imageUrl} alt="recipe" />
    <Button on:click={changePhoto}>Pick a different photo</Button>
  {/if}

  <CheckboxChipGroup {items} name="tags" outline />

  {#each instructionSteps as step, index}
    <FormField name="Instructions" required>
      <TextField bind:value={instructionSteps[index]} />
    </FormField>
  {/each}

  <Button on:click={addStep}>Add Another Step</Button>
  {#if ingredientList.length > 0}
  <Button on:click={removeStep}>Remove Step</Button>
  {/if}
  <Button filled class="btn" on:click={handleSubmit}>{!loadingState ? 'Submit Recipe' : 'Loading...'}</Button>