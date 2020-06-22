// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyCo-cBiuxP8b51DfUrnZ6nhh5GnEmTTfOU',
  authDomain: 'recipe-flavors.firebaseapp.com',
  databaseURL: 'https://recipe-flavors.firebaseio.com',
  projectId: 'recipe-flavors',
  storageBucket: 'recipe-flavors.appspot.com',
  messagingSenderId: '189830846641',
  appId: '1:189830846641:web:9fa159586edcb08eb5aa90',
  measurementId: 'G-GZN3FXHXLG',
};

// Initialize Firebase
export const initializeFirebase = () => {
  firebase.initializeApp(firebaseConfig);
};

export const currentUser = () => {
  const user = firebase.auth().currentUser;
  return user;
};

// Sign in User
export const signIn = (emailA, passwordA, onSuccess, onErrorMessage) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(emailA, passwordA)
    .then((result) => {
      onSuccess(result);
    })
    .catch((error) => {
      onErrorMessage(error);
    });
};

// Email verification
const emailVerification = () => {
  const user = firebase.auth().currentUser;
  user.sendEmailVerification()
    .then(() => {
      alert('hemos enviado un correo de confirmacion a su correo electronico');
    })
    .catch(() => {
      alert('verifique su correo electronico para verificar el registro');
    });
};

// Create user with firebase
export const createUserWithFirebase = (email, pass, onSuccess, onError) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, pass)
    .then((result) => {
      emailVerification();
      onSuccess(result);
    })
    .catch((error) => {
      onError(error);
    });
};

// Login with Google
export const googleLogin = (onSuccess, onError) => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      onSuccess(result);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorMessage = error.message;
      console.log('error', errorMessage);
      onError(error);
    });
};

// Edit profile
export const updateProfile = (username, specialty, onSuccess, onError) => {
  const user = firebase.auth().currentUser;
  user.updateProfile({
    displayName: username,
    specialty,
  })
    .then((result) => {
      onSuccess(result);
    })
    .catch((error) => {
      onError(error);
    });
};

// Sign Out
export const userSignOut = (callback) => {
  firebase.auth().signOut()
    .then((result) => {
      console.log('signOut success');
      callback(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

initializeFirebase();

export const db = firebase.firestore();
/* Descripcion: Funcion generica que guarda un objeto en una coleccion de firebase,
                si no existe colection, crea una nueva
Parametros:
      collection: coleccion almacenada firebase
      object: objeto para guardar en firebase
      onSuccess: lo que sucede si el evento es correcto
      onError: Errores
*/
const post = (collection, object, onSuccess, onError) => {
  db.collection(collection).add(object)

    .then((docRef) => {
      onSuccess(docRef);
    })
    .catch((error) => {
      onError(error);
    });
};

// Guarda la coleccion con sus reespectivos parametros en firebase, luego se llama en createPost.js
const date = new Date();

export const postRecipe = (name, recipeName, ingredients, content, photo, onSuccess, onError) => {
  const recipe = {
    date: date.toLocaleString(),
    uid: currentUser().uid,
    userName: name,
    recipeName,
    recipeIngredients: ingredients,
    recipeContent: content,
    photoURL: photo,
  };

  post('recipeList', recipe, onSuccess, onError);
};

// Función borrar post
export const deletePost = (id) => {
  db.collection('recipeList').doc(id).delete()
    .then((recipeList) => {
      console.log('Document successfully deleted!', recipeList);
    })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
};
