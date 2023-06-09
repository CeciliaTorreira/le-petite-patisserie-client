# La Petite Patisserie

## [See the app](https://lapetitepatisserie.netlify.app/)

## Description

Last project developed during Ironhack web development bootcamp.
La Petite Patisserie is a really simple app where people can check pastry related recipes or create and account and upload their own recipes.

#### [APP CLIENT](https://github.com/CeciliaTorreira/la-petite-patisserie-client)
#### [SAPP SERVER](https://github.com/CeciliaTorreira/la-petite-patisserie-server)

## Backlog Functionalities
Apart from the simple functionalities the app already has, I would like to add a "copy recipe" functionality so users can copy and adapt a specific recipe to their liking.
A friend system. Users would be able to search for friends and add them to a list so they can easily check what their friends are uploading or commenting.

## Technologies used

HTML, CSS, JavaScript, Express, React, React Context, Axios


# Client Structure

## User actions

- **404** - User will see an error message depending on the situation.
- **500** -User will see an error message depending on the situation.
- **homepage** - User will be able to see the homepage and choose what to do from here: create an account, log in, check recipes, etc.
- **sign up** - The user will be able to create an account to use all the functionalities on the website.
- **login** - Users can log in into their accounts to check their private information or changes they do like uploading recipes or editing them.
- **logout** - Users are able to log out to keep their account safe.
- **Profile** - Users are able to check their private page and info like their created o favourite recipes.
- **Recipe list** - Users can check all existing recipes on the website
- **Create recipes** - Logged in users will be able to create recipes.
- **Edit recipes** - Logged in users will be able to edit recipes that were uploaded by them
- **Delete recipes** - Logged in users will be able to delete a recipe if it belongs to them or if they're an admin
- **Comment** - Logged in users will be able to comment any recipe they like
- **Delete comment** - Admins will be able to delete comments that may not be appropiate
- **Favourite recipes** - Users can add any recipe they like to their favourite list.
- **Created recipes** - Recipes created by an user will be automatically added to this list

## Client routes

(PENDING)
## React Router Routes (React App)
| Path                         | Page            | Components        | Permissions              | Behavior                                                      |
| -------------------------    | ----------------| ----------------  | ------------------------ | ------------------------------------------------------------  |
| `/`                          | Home            |                   | public                   | Home page                                                     |
| `/signup`                    | Signup          |                   | anon only `<IsAnon>`     | Signup form, link to login, navigate to homepage after signup |
| `/login`                     | Login           |                   | anon only `<IsAnon>`     | Login form, link to signup, navigate to homepage after login  |
| `/profile`                   | Profile         |                   | user only `<IsPrivate>`  | Navigate to homepage after logout, expire session             |
| `/recipes`                   | RecipesList     | RecipeCard        | any user                 | Shows all recipes in the database                             |
| `/recipes/:recipeId`         | RecipesDetails  |                   | any user                 | Shows a specific recipe                                       |
| `/recipes/:recipeId/edit`    | EditRecipe      |                   | creator user             | Allows the user to edit their own recipes                     |
| `/recipes/add`               | NewRecipe       |                   | logged in user           | Allows the user to create and upload a recipe                 |
| `/recipes/:recipeId/delete`  | RecipeDetials   |                   | admin or creater         | Allows the user or admin to delete a recipe                   |
| `/recipes/:recipeId/comments`| CommentList     | CommentCard       | any user                 | Allows the user to see all the comments made on a recipe      |

## Services 
 - Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.verify()
 
 -Profile Service
  - Load Profile
  - Get favourite recipes
  - Get created recipes


- Recipe Service
  - recipe.filter(name, picture)
  - recipe.detail(id)
  - recipe.create(id)
  - recipe.delete(id)
  - recipe.update(id)
  - Add recipe to favourite list(id)
  - Delete recipe from favourite list(id)
  - Get all recipe's comments
  - Create a new comment on that recipe(id)
  - Deletes a comment from a recipe(id)
  
## Other Components
- Navbar
- TopBar
- Comment Card
- Recipe Card






