import { changeRoute } from './router.js';

// Observer
export const firebaseAuthentication = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      if (user.emailVerified) {
        changeRoute('#/home');
      }
    } else {
      changeRoute('#/login');
    }
  });
};

firebaseAuthentication();

const init = () => {
  window.addEventListener('hashchange', () => {
    changeRoute(window.location.hash);
  });
};

window.addEventListener('load', init);
