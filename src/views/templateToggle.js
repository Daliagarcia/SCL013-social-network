import { userSignOut } from '../controllers/firebase.js';

const goLogin = () => {
  window.location.href = './index.html#/login';
};

export const menuToggle = () => {
  const divToggle = document.createElement('div');
  const viewMenuToggle = `<div id="sidebar">
                            <div class="toggle-btn">
                              <span>&#9776</span>
                            </div>
                            <ul>
                              <li>
                                <img src="img/logo.png" alt="flavors" class="logoToggle">
                              </li>
                              <li class="listMenu"><a href="#/profile">Mi Perfil</a></li>
                              <li class="listMenu"><a href="#/home" id="home">Recetario</a></li>
                              <li class="logOut""><a href="#/login" id="out">Cerrar Sesión <i class="fas fa-sign-out-alt"></i> </a></li>
                            </ul>
                          </div>
                          `;
  divToggle.innerHTML = viewMenuToggle;
  const btnToggle = divToggle.querySelector('.toggle-btn');
  btnToggle.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('active');
  });

  divToggle.querySelector('#out').addEventListener('click', () => {
    userSignOut(goLogin);
  });

  divToggle.querySelector('#home').addEventListener('click', () => {
    window.location.href = './index.html#/home';
  });

  return divToggle;
};
