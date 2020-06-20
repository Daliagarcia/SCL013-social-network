import { db, deletePost, currentUser } from "../controllers/firebase.js";


export const recipeList = () => {
    const allRecipeInList = document.createElement("section");
    allRecipeInList.innerHTML = '';
    allRecipeInList.className = "recipe-list";

    db.collection("recipeList").orderBy('date','desc').onSnapshot((recipeList) => {
        allRecipeInList.innerHTML = '';

        recipeList.docs.forEach((recipe) => {
            
            const recipeHTML =
             ` <div class="newPost" data-id="${recipe.id}">
                 <tr>
                    <th scope="row">
                        <span class="userName">${recipe.data().userName}</span>
                        <span class="userName">${recipe.data().date}</span>
                        <div id="edit-post" style="display: none";>
                        </div>
                            <span id="recipeName" class="userName">${recipe.data().recipeName}</span>
                            <label for="recipeIngredients" id="ingredientsLabel" class="labelNewPost">Ingredientes</label>
                            <span id="recipeIngredients" class="showRecipe">${recipe.data().recipeIngredients}</span>
                            <br>
                            <label for="userRecipe" id="recipeLabel" class="labelNewPost">Preparación</label>
                            <span id="userRecipe" class="showRecipe">${recipe.data().recipeContent}</span>
                        <div class="likeComent">
                            <button id="btnEdit">Editar</button>
                            <i id="deleteBtn" class="fas fa-trash-alt fa-2x"></i>     
                        </div>
                    </th>
                </div>`;
             
                allRecipeInList.innerHTML += recipeHTML

        })

        editPost("uid")

        let deleteButton = document.querySelectorAll('#deleteBtn')
        deleteButton.forEach((deleteBtn) => {
       
            deleteBtn.addEventListener('click', (e) => {

                e.preventDefault()
                
                // Target retorna el elemento que dispara el evento, en este caso el data-id
                let postId = e.target.parentElement.parentElement.getAttribute('data-id');

                deletePost(postId)
            })
        })
    })
    return allRecipeInList;
}



const editPost = (uid) => {

    const editPostButton = document.querySelectorAll('#btnEdit')

    editPostButton.forEach((editBtn) =>{ 
      
        editBtn.addEventListener('click', (e) => {
            let postId = e.target.parentElement.parentElement.getAttribute('data-id');
            // Obtengo el post completo a traves de:
            let postHTMLElement = e.target.parentElement.parentElement

            let recipeName = postHTMLElement.querySelector('#recipeName')
            let recipeIngredients = postHTMLElement.querySelector('#recipeIngredients')
            let recipeContent = postHTMLElement.querySelector('#userRecipe')
            let deleteBtn = postHTMLElement.querySelector('#deleteBtn')
            let ingredientsLabel = postHTMLElement.querySelector('#ingredientsLabel')
            let recipeLabel = postHTMLElement.querySelector('#recipeLabel')
            let editPostButton = postHTMLElement.querySelector('#btnEdit')

            recipeName.style.display = "none";
            recipeIngredients.style.display = "none";
            recipeContent.style.display = "none";
            deleteBtn.style.display = "none";
            ingredientsLabel.style.display = "none";
            recipeLabel.style.display = "none";
            editPostButton.style.display = "none";
            
            let editPost = postHTMLElement.querySelector('#edit-post')
    
            editPost.style.display = 'block'
            
            editPost.innerHTML = `  <div id="edit-post" class="textarea-div" data-edit-id="${recipe.id}" >
                                        <input type="text" placeholder="Nombre de la receta" id="nameUserPost" class="userName" value="${recipeName.innerHTML}"/>
                                        <br>
                                        <label for="ingredients"  class="labelNewPost">Ingredientes</label>
                                        <textarea placeholder="Ingredientes" id="ingredients" class="writeIngredients" cols="30" rows="6">${recipeIngredients.innerHTML}</textarea>
                                        <label for="recipe" id="recipeLabel" class="labelNewPost">Preparación</label>
                                        <textarea placeholder="Escribe tu receta aqui" cols="30" rows="6" id="recipe" class="writeRecipe">${recipeContent.innerHTML}</textarea>
                                        <button id="btnSave">Save</button>
                                        <button id="btnCancel">Cancelar</button>
                                    </div>`

            let buttonSave = editPost.querySelector("#btnSave");
            let buttonCancel = editPost.querySelector("#btnCancel");

            buttonCancel.addEventListener('click', (e) => {
    
                editPost.innerHTML = '';
                recipeName.style.display = "block";
                recipeIngredients.style.display = "block";
                recipeContent.style.display = "block";
                deleteBtn.style.display = "block";
                ingredientsLabel.style.display = "block";
                recipeLabel.style.display = "block";
            })
           
            buttonSave.addEventListener('click', (e) => {
                const namePost = editPost.querySelector('#nameUserPost').value;
                const recipeIngredients = editPost.querySelector('#ingredients').value;
                const recipePost = editPost.querySelector('#recipe').value;

                 db.collection("recipeList").doc(postId).update({
                      recipeName: namePost,
                      recipeIngredients: recipeIngredients, 
                      recipeContent: recipePost
                }).then(() => {
                    editPost.style.display = "none";
                    console.log('Document successfully updated!');
                }).catch((error) => {
                    console.error('Error updating document: ', error);
                  });
            })
        })
    })
}
