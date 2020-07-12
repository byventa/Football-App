import './css/style.css';
import regeneratorRuntime from "regenerator-runtime";
import LeagueData from './js/models/LeagueData';
import * as teamView from  './js/views/teamView';
import {elements,fans,cleanHTML} from './js/views/base';


const data = {};
const state = {
    // team:'LIV'
};
// CONTROL APP
const AppController = async () =>{
    // GET DATA FROM API
    data.league = new LeagueData ('PL')
    await data.league.getTeamData();
    // RENDER HTML DEPENDING ON LOCAL STORAGE
    if(state.team){
        // IF FAVOURITE TEAM IS IN STORAGE RENDER APP UI
    } else{
    // IF THERES NOTHING IN STORAGE RENDER PICK TEAM AND THEN RENDER APP UI
    // RENDER HTML OF SLIDER
    cleanHTML();
    data.league.teams.forEach(el => teamView.renderPickTeam(el));
    // INITIALIZE SLIDER
    teamView.initSlider();    }
};
AppController();

window.i = data;

const getTeam = () =>{
    const el = document.querySelector('.swiper-slide-active')
    const teamAtt = el.getAttribute('data-team');
    console.log(teamAtt);
}
// elements.getTeam.addEventListener('click', getTeam);

// window.addEventListener('load',()=>{
// // Check if local storage has favourite club

// // Send data from local storage to state.team.
// });
document.querySelector('.swiper-container').addEventListener('transitionend', ()=>{
    const el = document.querySelector('.swiper-slide-active')
    const teamAtt = el.getAttribute('data-team');
    console.log(teamAtt);
    document.querySelector('.select__button').textContent = fans[teamAtt];
})
teamView.hideNav();
window.addEventListener('resize',teamView.hideNav);