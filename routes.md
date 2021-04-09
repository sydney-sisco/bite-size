## USERS
Read
GET /users/:id
Edit
PATCH /users/:id
Add
POST /users
Delete
DELETE /users/:id
 
## RECIPES
Browse
GET /recipes 
Read
GET /recipes/:id
Edit
PATCH /recipes/:id
Add
POST /recipes 
Delete
DELETE /recipes/:id
 
## FAVOURITES
Browse - view all favourite per user
GET /favourites/:user_id
Add - create fav connection
POST /favourites/:user_id/:recipe_id
Delete - remove fav connection
DELETE /favourites/:user_id/:recipe_id
 
## EMOJIS
Browse - needed if emojis are visible in search results
GET /recipe/:id/emojis/
Add - add emoji reaction
POST /recipe/:id/emojis/
Delete - remove emoji reaction
DELETE  /recipe/:id/emojis/

https://docs.github.com/en/rest/reference/reactions#create-reaction-for-a-commit-comment
