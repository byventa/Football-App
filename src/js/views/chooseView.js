import {elements} from './base';
import Swiper, { Navigation, Keyboard } from 'swiper';
import 'swiper/swiper-bundle.css';

// Render choose html
export const renderHTML = ()=>{
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
       <button class="select__button" data-id="57" data-team="ARS">I'am a Gooner</button>
   </div>
</div>`;
elements.root.innerHTML = markup;
}
// Render teams to choose
export const renderTeams = team =>{
let teamColor = team.clubColors.toLowerCase().split("/").join().replace(" ","").replace(" ","").split(',')[0];
const markup = `
<div class="swiper-slide" style="background-color:#36003C" data-id="${team.id}" data-team="${team.tla}" data-teamFullName="${team.name}">
    <div class="slide-link">
        <img src="src/img/logos/${team.id}.svg" style ="width:auto; height:20vw;">
        <h2>${team.name}</h2>
    </div>
</div>`;
document.querySelector('.swiper-wrapper').insertAdjacentHTML('beforeend',markup);
};
// Initialize slider
export const initSlider = () =>{
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
}

// Hide arrows in swiper
export const hideNav = ()=>{
  if(window.innerWidth<900){
      document.querySelector('.swiper-button-next').style.display = 'none';
      document.querySelector('.swiper-button-prev').style.display = 'none';

  }else if(window.innerWidth>900){
      document.querySelector('.swiper-button-next').style.display = 'flex';
      document.querySelector('.swiper-button-prev').style.display = 'flex';

  }
}

