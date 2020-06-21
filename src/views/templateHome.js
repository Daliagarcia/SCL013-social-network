import { menuToggle } from './templateToggle.js';

export const home = (contentView) => {
  const divTimeline = document.createElement('div');
  divTimeline.innerHTML = `
  `;
  divTimeline.appendChild(menuToggle());
  divTimeline.appendChild(contentView);

  return divTimeline;
};
