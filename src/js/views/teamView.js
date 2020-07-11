import {elements,colors} from './base';
import Swiper, { Navigation,Pagination,Scrollbar,EffectCoverflow, Keyboard } from 'swiper';
import 'swiper/swiper-bundle.css';


export const renderPickTeam = team =>{
let teamColor = team.clubColors.toLowerCase().split("/").join().replace(" ","").replace(" ","").split(',')[0];
const markup = `
<div class="swiper-slide" style="background-color:#1d1a51" data-team="${team.tla}">
    <div class="slide-link">
        <img src = "src/img/logos/${team.tla}.svg" style ="width:auto; height:20vw;">
        <h2>${team.name}</h2>
    </div>
</div>`;
elements.slidesContainer.insertAdjacentHTML('beforeend',markup);
};


export const initSlider = () =>{
    Swiper.use([Navigation, Keyboard]);
    const swiper = new Swiper('.swiper-container', {
        // preventClicks:true,
        keyboard: {
          enabled: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
}