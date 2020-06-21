import { postRecipe, currentUser } from '../controllers/firebase.js';
import { recipeListView } from './templateRecipeList.js';

export const createPost = () => {
  const createPostSection = document.createElement('section');
  createPostSection.className = 'create-post';

  const createPostView = `<header>
                          <h1>¡Bienvenido al mundo flavors!<h1>
                          <h4>Multitud de sabores para ti</h4>
                          </header>
                          <div class="create-post-div">
                          <div class="textarea-div">
                          <input type="text" placeholder="Nombre de la receta" id="nameUserPost" class="userName"/>
                          <textarea placeholder="Ingredientes" id="ingredients" class="writeIngredients" cols="30" rows="6"></textarea>
                          <input type="text" placeholder="Escribe tu receta aqui" cols="30" rows="6" id="recipe" class="writeRecipe" />
                          </div>
                          <div class="create-post-options">                        
                          <button class="recipePost" type="submit" id="recipeToPost">Publicar</button>
                          </div>
                          </div>
                          </div>
                          <h1 class="titlePost">Recetario</h1>`;

  createPostSection.innerHTML = createPostView;

  // Se muestra en pantalla la lista de recetas almacenadas en firebase
  createPostSection.appendChild(recipeListView());
  // Nueva coleccion para guardar los datos del post
  createPostSection.querySelector('#recipeToPost').addEventListener('click', () => {
    const namePost = document.querySelector('#nameUserPost').value;
    const recipeIngredients = document.querySelector('#ingredients').value;
    const recipePost = document.querySelector('#recipe').value;
    const photoURL = '';

    const onSuccess = () => {
      document.querySelector('#nameUserPost').value = '';
      document.querySelector('#recipe').value = '';
      document.querySelector('#ingredients').value = '';
      console.log('soy el console de create');
      // Limpiar la lista
      // Section guarda el array obtenido de recipeList
      const section = document.getElementsByClassName('recipe-list')[0];
      section.parentNode.removeChild(section);
      // Cargar lista con nuevo post
      createPostSection.appendChild(recipeListView());
    };
    const onError = (error) => {
      console.error('Error adding document: ', error);
    };
    // Crea la nueva coleccion, donde se agrega la nueva receta
    postRecipe(
      currentUser().displayName,
      namePost,
      recipeIngredients,
      recipePost,
      photoURL,
      onSuccess,
      onError,
    );
  });

  return createPostSection;
};
