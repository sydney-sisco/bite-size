<script context="module">
  //page preload with login redirect if no token present.
  export async function preload(page, session) {
    const { token, user, server } = session;
    if (!token) {
      return this.redirect(302, "login");
    }
    return session;
  }
</script>

<script>
  import fetch from "cross-fetch";
  import { goto, stores } from "@sapper/app";
  import RecipeForm from "../../../components/RecipeForm.svelte";

  const { session } = stores(); // session data is stored here

  let loadingState = false;

  const handleSubmit = async (recipeObject) => {
    //Create an if statement to make sure we have everything to make a recipe...
    loadingState = true;

    let {
      title,
      difficulty_id,
      items,
      hours,
      minutes,
      image_url,
      servings,
      description,
      instructionSteps,
      ingredientList,
    } = recipeObject;

    //variables we will be altering after form submit (duration, user_id, and tags)

    let duration;

    if (hours && minutes) {
      duration = hours * 60 + minutes;
    } else if (!minutes && hours) {
      duration = hours * 60;
    } else if (!hours && minutes) {
      duration = minutes;
    } else {
      duration;
    }

    let user_id = $session.user.id;

    let tags = items
      .filter(({ checked }) => checked)
      .map(({ value, label }) => ({ id: value, name: label }));


    //after all is updated, 
    try {
      const res = await fetch(`${$session.server}/recipes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          title,
          difficulty_id,
          duration,
          tags,
          image_url,
          servings,
          description,
          instructionSteps,
          ingredientList,
        }),
      });
      loadingState = false;
      const {
        recipe: { id },
      } = await res.json();

      goto(`/recipes/${id}`);
    } catch (error) {
      console.error(error);
    }
  };
</script>

<RecipeForm {handleSubmit} />
