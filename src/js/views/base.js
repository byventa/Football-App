// REUSABLE CONTENT
export const elements = {
  slidesContainer: document.querySelector('.swiper-wrapper'),
  selectTeam: document.querySelector('.select__button'),
  swiperContainer: document.querySelector('.swiper-container'),
  root: document.getElementById('root'),
};
export const cleanHTML = (el) => {
  el.innerHTML = '';
};
export const colors = {
  red: '#36003C',
  claret: '#36003C',
  royalblue: '#36003C',
  blue: '#36003C',
  skyblue: '#36003C',
  black: '#36003C',
  navyblue: '#FE015B',
  yellow: '#36003C',
};
export const fans = {
  ARS: "I'am a Gooner",
  AST: "I'am a Villan",
  CHE: "I'am a Blue",
  EVE: "I'am a Toffe",
  LIV: "I'am a Red",
  MCI: "I'am a Citizen",
  MUN: "I'am a Red Devil",
  NEW: "I'am a Geordie",
  NOR: "I'am a Canary",
  TOT: "I'am a Spur",
  WOL: "I'am a Wanderer",
  BUR: "I'am a Claret",
  LEI: "I'am a Fox",
  SOU: "I'am a Saint",
  WAT: "I'am a Hornet",
  CRY: "I'am an Eagle",
  SHE: "I'am a Blade",
  BHA: "I'am a Seagull",
  WHU: "I'am a Hammer",
  BOU: "I'am a Cherrie",
  LEE: "I'am a White",
  WBA: "I'am a Baggie",
  FUL: "I'am a Cottager",
};
export const loaders = (el) => {
  const loaderSections = ['League Standings', 'Next Match', 'Fixtures', 'Top Scorers', 'Twitter'];
  el.forEach((el2, i) => {
    const markup = `<div class="loader"><div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    <h2>Loading ${loaderSections[i]}</h2></div>
    `;
    document.querySelector(`.${el2}`).insertAdjacentHTML('beforeend', markup);
  });
};
