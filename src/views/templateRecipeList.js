import { getRecipeList, deletePost } from "../controllers/firebase.js";

export const recipeList = () => {

    const allRecipeInList = document.createElement("section");
    allRecipeInList.innerHTML = '';
    allRecipeInList.className = "recipe-list";

    const onSuccess = (recipeLista) => {
        console.log('voy a mostrar la', recipeLista)
        recipeLista.forEach(recipe => {
                const recipeHTML =
                 ` <div class="newPost">
                     <tr>
                        <th scope="row">
                            <span class="userName">${recipe.data().userName}</span>
                            <span class="dateNewPost">${recipe.data().date}</span>
                            <span class="userName">${recipe.data().recipeName}</span>
                            <label for="recipeIngredients" class="labelNewPost">Ingredientes</label>
                            <span class="showRecipe">${recipe.data().recipeIngredients}</span>
                            <br>
                            <label for="userRecipe" class="labelNewPost">Preparación</label>
                            <span id="userRecipe" class="showRecipe">${recipe.data().recipeContent}</span>
                            <div class="likeComent">
                            <i id="delete" class="fas fa-trash-alt fa-2x"></i>
                                <a href="#"><img src="./img/orange.png" class="like"></a>
                                <a href="#"><i class="fas fa-comment fa-2x" class="coment"></i></a>      
                            </div>
                        </th>
                    </div>`;
                
                allRecipeInList.innerHTML += recipeHTML;

                document.getElementById('delete').addEventListener('click', () => {
                    const onSuccess = (docRef) => {
                        // Limpiar la lista
                        // Section guarda el array obtenido de recipeList
                        let section = document.getElementsByClassName('recipe-list')[0];
                        let padre = section.parentNode;

                        // Cargar lista con nuevo post
                        padre.appendChild(recipeList());

                    }
                    deletePost(recipe.id, onSuccess, ()=>{})
                    
                })
        });  
    }

    // Llamo a la funcion que obtiene la coleccion a traves de firebase
    getRecipeList(onSuccess);

    return allRecipeInList;
}

