<script context="module">
  export async function preload(page, session) {
   return session;
  }
</script>

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

  // import RecipeForm from '/client/src/components/RecipeForm.svelte'
  import RecipeForm from "../../../components/RecipeForm.svelte"

  const { session } = stores(); // session data is stored here
  
  // let hours = 0;
  // let minutes = 0;
  // let title = null;
  // let difficulty = 2;
  // let duration = 0;
  // let imageUrl = null;
  // let servings = null;
  // let description = null;
  // let instructionSteps = ["", "", ""];
  // let ingredientList = [""];
  // let unitOfMeasure = 1;
  // let quantity = 1;

  let loadingState = false
  // const difficultyNames = ["Beginner", "Intermediate", "Advanced"];

  const handleSubmit = async recipeObject => {
    //Create an if statement to make sure we have everything to make a recipe...
    console.log('recipe??', recipeObject);

    let {
      userId,
      title,
      difficulty,
      // duration,
      hours,
      minutes,
      imageUrl,
      servings,
      description,
      instructionSteps,
      ingredientList,
      unitOfMeasure,
      quantity
    } = recipeObject;

    let duration;

    if (hours && minutes) {
      duration = (hours * 60) + minutes
    } else if (!minutes && hours) {
      duration = hours * 60
    } else if (!hours && minutes) {
      duration = minutes
    } else {
      duration
    }

    loadingState = true
      try {
        const res = await fetch(`${$session.server}/recipes`, {
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
    data.append("upload_preset", $session.key);
    const res = await fetch(
      $session.site,

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



<RecipeForm {handleSubmit}/> 

