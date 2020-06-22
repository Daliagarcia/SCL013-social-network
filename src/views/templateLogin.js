import { signIn, googleLogin } from '../controllers/firebase.js';

export const login = () => {
  const divLogin = document.createElement('div');

  const viewLogin = `
                        <section id="loginPage" class="containerPage">
                        <div class="containerLeft">
                        <img class="logo" src="./img/logo.png">
                        </div>
                        <div class="containerRight">  
                        <div class="containerMobile">
                        <img class="logoMobile" src="./img/logo.png">
                        <div class="containerColor">
                        <div class="title">
                        <h1 class="firstTitle">¡Bienvenido!</h1>
                        <h2 class="subtitle">Comparte tu receta con nosotros</h2>
                        </div>
                        <div class="form">
                        <input type="email" placeholder="Correo electrónico" id="emailA" class="loginInput" required /> 
                        <input type="password" placeholder="Contraseña" id="passwordA" class="loginInput"/>
                        <button id="loginBtn" class="btnStart" type="submit">Iniciar sesión</button>
                        <button id="loginGoogleBtn" class="btnGoogle"><img src="./img/logoGoogle.png" class="btnGoogleMobile">Iniciar sesión</button>
                        </div>
                        <div>
                        <hr size="3px" />
                        <p class="titleRegister">¿No tienes cuenta? Regístrate<a href="#/register" id="newAccount" class="signUp"> AQUÍ </a></p>
                        </div>
                        </div>
                        </div>
                        </div>
                        </section>`;

  divLogin.innerHTML = viewLogin;

  // Firebase callback
  const onSuccess = (result) => {
    if (result.user.emailVerified === true) {
      window.location.href = './index.html#/home';
    } else {
      alert('verifique su correo electronico para verificar el registro');
    }
  };

  const onError = (error) => {
    const errorMessage = error.message;
    alert(errorMessage);
  };
  // Login with access
  divLogin.querySelector('#loginBtn').addEventListener('click', () => {
    const emailA = document.getElementById('emailA').value;
    const passwordA = document.getElementById('passwordA').value;
    signIn(emailA, passwordA, onSuccess, onError);
  });
  // Login with google
  divLogin.querySelector('#loginGoogleBtn').addEventListener('click', () => {
    googleLogin(onSuccess, onError);
  });

  return divLogin;
};
