import { elements } from './base';
import { Swiper, Navigation, Keyboard } from 'swiper';

// Render choose html
export const renderHTML = () => {
  const markup = `
  <div class="container select__favourite-team">
  <div class="select__heading">
      <h1>Choose your favourite Premier League club</h1>
  </div>
   <!-- SLIDER -->
   <div class="swiper-container">
       <div class="swiper-wrapper">
       </div>
       <div class="swiper-button-next"></div>
       <div class="swiper-button-prev"></div>
   </div>
   <div class="select__container">
       <button class="select__button" data-id="57" data-team="ARS" data-teamFullName="Arsenal FC">I'am a Gooner</button>
   </div>
</div>`;
  elements.root.innerHTML = markup;
};
// Render teams to choose
export const renderTeams = (team, place) => {
  const markup = `
<div class="swiper-slide" style="background-color:#36003C" data-id="${team.id}" data-team="${team.tla}" data-teamFullName="${team.name}">
    <div class="slide-link">
        <img src="img/${team.id}.svg" style ="width:auto; height:20vw;">
        <h2>${team.name}</h2>
    </div>
</div>`;
  document.querySelector(place).insertAdjacentHTML('beforeend', markup);
};
// Initialize slider
export const initSlider = () => {
  Swiper.use([Navigation, Keyboard]);
  const swiper = new Swiper('.swiper-container', {
    keyboard: {
      enabled: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
};
