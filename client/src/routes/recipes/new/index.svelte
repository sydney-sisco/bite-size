<script>
  import { afterUpdate } from "svelte";
  import fetch from "cross-fetch";
  import { goto } from '@sapper/app';
  import {
    CheckboxChipGroup,
    Headline,
    Button,
    TextField,
    FormField,
    FileDropzone,
  } from "attractions";

  let hours;
  let minutes;
  let title = null;
  let difficulty = 2;
  let duration = null;
  let image_url = null;
  let servings = null;
  let description = null;
  let instructionSteps = ["", "", ""];
  let loadingState = false

  const difficultyNames = ["Beginner", "Intermediate", "Advanced"];

  const handleSubmit = async () => {
   
    // console.log(
    //   title,
    //   difficulty,
    //   duration,
    //   image_url,
    //   servings,
    //   description,
    //   instructionSteps
    // );
    duration = (hours * 60) + minutes;
    
    //Create an if statement to make sure we have everything to make a recipe...
    loadingState = true
      try {
        await fetch("http://localhost:5001/recipes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            difficulty,
            duration,
            image_url,
            servings,
            description,
            instructionSteps,
          }),
        });
        loadingState = false
        goto('/recipes') //redirect to user's recipes (once built)
      }
      catch (error) {
        console.error(error)
      }
    };

  const uploadImage = async (e) => {
    const uploadedImage = e.detail.files[0];
    const data = new FormData();

    data.append("file", uploadedImage);
    data.append("upload_preset", "nau31oag");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/bitesizerecipes/upload",
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

  const addStep = () => {
    instructionSteps.push("");
    instructionSteps = instructionSteps;
    console.log(instructionSteps);
  };

  const removeStep = () => {
    instructionSteps.pop("");
    instructionSteps = instructionSteps;
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

  {#if !image_url}
    <FileDropzone accept="image/*" max={1} on:change={uploadImage}>
      <span slot='empty-layer'>Choose an Image</span>
    </FileDropzone>
  {:else}
    <img src={image_url} alt="recipe" />
    <Button on:click={changePhoto}>Pick a different photo</Button>
  {/if}

  <CheckboxChipGroup {items} name="tags" outline />

  {#each instructionSteps as step, index}
    <FormField name="Instructions" required>
      <TextField bind:value={instructionSteps[index]} />
    </FormField>
  {/each}

  <Button on:click={addStep}>Add Another Step</Button>
  <Button on:click={removeStep}>Remove Step</Button>

  <Button filled class="btn" on:click={handleSubmit}>{!loadingState ? 'Submit Recipe' : 'Loading...'}</Button>