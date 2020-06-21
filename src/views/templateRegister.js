import { createUserWithFirebase, updateProfile } from '../controllers/firebase.js';

const onSuccess = (result) => {
  const name = document.getElementById('name').value;
  updateProfile(name, '', () => {}, () => {});
  window.location.href = './index.html#/login';
  console.log(result.user);
};

const onError = (error) => {
  const errorCode = error.code;
  alert(errorCode);
};

export const register = () => {
  const divRegister = document.createElement('div');

  const viewRegister = `
                          <section id="userRegisterPage" class="containerPage">
                          <div class="containerLeft">
                          <img class="logo" src="./img/logo.png">
                          </div>
                          <div class="containerRight">
                          <img class="logoUserMobile" src="./img/logo.png">
                          <div class="userRegisterform">
                          <div class="title">
                          <h1 class="userRegisterTitle">¡Regístrate!</h1>
                          </div>
                          <p id="email-error" class="email-error"></p>
                          <p id="pwd-error" class="pwd-error"></p>
                          <i class="fas fa-user"><input type="text" placeholder="Nombre" id="name" class="userRegisterInput"/></i>
                          <i class="fas fa-envelope"><input type="email" placeholder="Correo electrónico" id="email" class="userRegisterInput"/></i> 
                          <i class="fas fa-unlock"><input type="password" placeholder="Contraseña" id="pass" class="userRegisterInput"/></i>
                          </div>
                          <div>
                          <button id="userRegisterBtn" class="Allbtn">Crear cuenta</button>
                          </div>
                          </div>
                          </section>`;

  divRegister.innerHTML = viewRegister;
  divRegister.querySelector('#userRegisterBtn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;
    createUserWithFirebase(email, pass, onSuccess, onError);
  });
  return divRegister;
};
