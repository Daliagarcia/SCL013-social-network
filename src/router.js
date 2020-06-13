import { login } from './views/templateLogin.js';
import { menu } from './views/templateMenu.js';
import { register } from './views/templateRegister.js';
import { timeline } from './views/templateTimeline.js';
import { editProfile } from './views/templateEditProfile.js';
import { home } from './views/templateHome.js';

const showTemplate = (hash) => {
  const containerRoot = document.getElementById('root');
  containerRoot.innerHTML = menu();
  switch (hash) {
    case '':
      containerRoot.appendChild(login());
      break;
    case '#/login':
      containerRoot.appendChild(login());
      break;
    case '#/register':
      containerRoot.appendChild(register());
      break;
    case '#/home':
      containerRoot.appendChild(home(timeline()));
    break;
    case '#/profile':
      containerRoot.appendChild(home(editProfile()));
    break;
    default:
      containerRoot.innerHTML = `<h2>No existe :c</h2>`;
  }
};

export const changeRoute = (hash) => {
  if (hash === '#/login') {
    return showTemplate(hash);
  } else if (hash === '#/register') {
    return showTemplate(hash);
  } else if (hash === '#/home') {
    return showTemplate(hash);
  } else if (hash === '#/profile') {
    return showTemplate(hash);
  } else {
    return showTemplate(hash);
  }
};
