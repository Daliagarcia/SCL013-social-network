import { db, deletePost } from '../controllers/firebase.js';

const editPost = () => {
  const editPostButton = document.querySelectorAll('#btnEdit');
  editPostButton.forEach((editBtn) => {
    editBtn.addEventListener('click', (e) => {
      const postId = e.target.parentElement.parentElement.getAttribute('data-id');
      // Obtengo el post completo a traves de:
      const postHTMLElement = e.target.parentElement.parentElement;

      const recipeName = postHTMLElement.querySelector('#recipeName');
      const recipeIngredients = postHTMLElement.querySelector('#recipeIngredients');
      const recipeContent = postHTMLElement.querySelector('#userRecipe');
      const deleteBtn = postHTMLElement.querySelector('#deleteBtn');
      const ingredientsLabel = postHTMLElement.querySelector('#ingredientsLabel');
      const recipeLabel = postHTMLElement.querySelector('#recipeLabel');
      const editButton = postHTMLElement.querySelector('#btnEdit');

      recipeName.style.display = 'none';
      recipeIngredients.style.display = 'none';
      recipeContent.style.display = 'none';
      deleteBtn.style.display = 'none';
      ingredientsLabel.style.display = 'none';
      recipeLabel.style.display = 'none';
      editButton.style.display = 'none';

      const editPostView = postHTMLElement.querySelector('#edit-post');

      editPostView.style.display = 'block';

      editPostView.innerHTML = `<div id="edit-post" class="textarea-div" data-edit-id="${recipe.id}">
                                      <input type="text" placeholder="Nombre de la receta" id="nameUserPost" class="userName" value="${recipeName.innerHTML}"/>
                                      <br>
                                      <label for="ingredients"  class="labelNewPost">Ingredientes</label>
                                      <textarea placeholder="Ingredientes" id="ingredients" class="writeIngredients" cols="30" rows="6">${recipeIngredients.innerHTML}</textarea>
                                      <label for="recipe" id="recipeLabel" class="labelNewPost">Preparación</label>
                                      <textarea placeholder="Escribe tu receta aqui" cols="30" rows="6" id="recipe" class="writeRecipe">${recipeContent.innerHTML}</textarea>
                                      <div class="saveCancel">
                                      <i id ="btnSave" class="fas fa-save"></i>
                                      <i id="btnCancel" class="fas fa-window-close"></i>
                                      </div>
                                  </div>`;

      const buttonSave = editPostView.querySelector('#btnSave');
      const buttonCancel = editPostView.querySelector('#btnCancel');

      buttonCancel.addEventListener('click', () => {
        editPostView.innerHTML = '';
        recipeName.style.display = 'block';
        recipeIngredients.style.display = 'block';
        recipeContent.style.display = 'block';
        deleteBtn.style.display = 'block';
        ingredientsLabel.style.display = 'block';
        recipeLabel.style.display = 'block';
        editButton.style.display = 'block';
      });

      buttonSave.addEventListener('click', () => {
        const namePost = editPostView.querySelector('#nameUserPost').value;
        const recipeIngredientEdit = editPostView.querySelector('#ingredients').value;
        const recipePost = editPostView.querySelector('#recipe').value;

        db.collection('recipeList').doc(postId).update({
          recipeName: namePost,
          recipeIngredientEdit,
          recipeContent: recipePost,
        })
          .then(() => {
            editPostView.style.display = 'none';
            console.log('Document successfully updated!');
          })
          .catch((error) => {
            console.error('Error updating document: ', error);
          });
      });
    });
  });
};

export const recipeListView = () => {
  const allRecipeInList = document.createElement('section');
  allRecipeInList.innerHTML = '';
  allRecipeInList.className = 'recipe-list';
  db.collection('recipeList').orderBy('date', 'desc').onSnapshot((recipeList) => {
    allRecipeInList.innerHTML = '';

    recipeList.docs.forEach((recipe) => {
      const recipeHTML = ` 
                          <div class="newPost" data-id="${recipe.id}">
                             <tr>
                                <th scope="row">
                                    <span class="userName">${recipe.data().userName}</span>
                                    <span class="userName">${recipe.data().date}</span>
                                    <div id="edit-post" style="display: none";>
                                    </div>
                                    <hr size="3px" />
                                        <span id="recipeName" class="userName">${recipe.data().recipeName}</span>
                                        <label for="recipeIngredients" id="ingredientsLabel" class="labelNewPost">Ingredientes</label>
                                        <span id="recipeIngredients" class="showRecipe">${recipe.data().recipeIngredients}</span>
                                        <br>
                                        <hr size="3px" />
                                        <label for="userRecipe" id="recipeLabel" class="labelNewPost">Preparación</label>
                                        <span id="userRecipe" class="showRecipe">${recipe.data().recipeContent}</span>
                                    <div class="editDelete">
                                        <i id="btnEdit" class="fas fa-edit"></i>
                                        <i id="deleteBtn" class="fas fa-trash-alt fa-2x"></i>
                                    </div>
                              </th>
                          </div>`;

      allRecipeInList.innerHTML += recipeHTML;
    });

    editPost('uid');

    const deleteButton = document.querySelectorAll('#deleteBtn');

    deleteButton.forEach((deleteBtn) => {
      deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Target retorna el elemento que dispara el evento, en este caso el data-id
        const postId = e.target.parentElement.parentElement.getAttribute('data-id');
        deletePost(postId);
      });
    });
  });
  return allRecipeInList;
};
