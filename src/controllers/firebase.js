'use strict';
// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCo-cBiuxP8b51DfUrnZ6nhh5GnEmTTfOU",
  authDomain: "recipe-flavors.firebaseapp.com",
  databaseURL: "https://recipe-flavors.firebaseio.com",
  projectId: "recipe-flavors",
  storageBucket: "recipe-flavors.appspot.com",
  messagingSenderId: "189830846641",
  appId: "1:189830846641:web:9fa159586edcb08eb5aa90",
  measurementId: "G-GZN3FXHXLG",
};

// Initialize Firebase
export const initializeFirebase = () => {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  firebaseAuthentication();
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

// Observer
export const firebaseAuthentication = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      console.log("user", user);
      const displayName = user.displayName;
      const email = user.email;
      const emailVerified = user.emailVerified;
      const photoURL = user.photoURL;
      const isAnonymous = user.isAnonymous;
      const uid = user.uid;
      const providerData = user.providerData;
      const verifiedText = "";
    } else {
    }
  });
};

// Create user with firebase
export const createUserWithFirebase = (email, pass, onSuccess, onError) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, pass)
    .then((result) => {
      emailVerification();
      onSuccess(result)
    })
    .catch((error) => {
      onError(error);
    });
};

// Email verification
const emailVerification = () => {
  const user = firebase.auth().currentUser;
    user.sendEmailVerification()
  .then(() => {
    alert('hemos enviado un correo de confirmacion a su correo electronico');
  })
  .catch((error) => {
  alert('verifique su correo electronico para verificar el registro');  
  });
}
 

// Login with Google
export const googleLogin = (onSuccess, onError) => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("user", user);
      // ...
      onSuccess(result)
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      console.log("error", errorMessage);
      // ...
      onError(error)
    });
};
// Edit profile
export const updateProfile = (username, specialty, onSuccess, onError) => {
  
  const user = firebase.auth().currentUser;
  
  user.updateProfile({
    displayName: username,
    specialty: specialty
  })
  .then((result) => {
    onSuccess(result)
  }).catch((error) => {
    onError(error);
  });
}

// Sign Out
export const userSignOut = (callback) => {
  firebase.auth().signOut()
  .then((result) => {
    console.log('signOut success');
    callback(result)
  })
  .catch((error) => {
    console.log(error);
  })
};

initializeFirebase();

const db = firebase.firestore();

/* 
Descripcion: Funcion generica que guarda un objeto en una coleccion de firebase, si no existe colection, crea una nueva
Parametros: 
      collection: coleccion almacenada firebase 
      object: objeto para guardar en firebase
      onSuccess: lo que sucede si el evento es correcto
      onError: Errores
*/

const post = (collection, object, onSuccess, onError) => {

  db.collection(collection).add(object)
  .then((docRef) => {
    onSuccess(docRef)
  })
  .catch((error) => {
    onError(error)
  });
}

// Funcion que crea guarda la coleccion con sus reespectivos parametros en firebase, luego se utiliza en createPost.js
const date = new Date ()
export const postRecipe = (displayName, recipeName, ingredients, content, photoURL, onSuccess, onError) => {

  const recipe = {
      date: date.toLocaleString(),
      userName: displayName,
      recipeName: recipeName,
      recipeIngredients: ingredients,
      recipeContent: content,
      photoURL: photoURL
  }

    post('recipeList', recipe, onSuccess, onError)
}

/* Funcion que trae la coleccion de firebase para luego imprimirla en pantalla al crear post 
    onSuccess: Muestra la lista completa de los post
    onError: Error
*/

export const getRecipeList = (onSuccess) => {
  console.log('esto es un console');
  db.collection("recipeList").orderBy('date','desc').onSnapshot((recipeList) => {
    console.log("snapshot");    
    onSuccess(recipeList);
  });
}

export const currentUser = () => {
  const user = firebase.auth().currentUser;
  return user
}

//Función borrar post
export const deletePost = (id, onSuccess, onError) =>{ 

  db.collection("recipeList").doc(id).delete()
  .then((doc) => {
   onSuccess(doc);
   console.log("Document successfully deleted!");
 }).catch((error) => {
   onError(error);
   console.error("Error removing document: ", error);
 });
 
}