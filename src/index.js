import './css/style.css';
import regeneratorRuntime from "regenerator-runtime";
import LeagueData from './js/models/LeagueData';
import ChooseTeamData from './js/models/ChooseTeamData';
import * as chooseView from  './js/views/chooseView';
import {elements,fans} from './js/views/base';
// GLOBAL VARIABLES
const data = {};
const state = {};
window.s = state;
window.i = data;

// CONTROLLERS
const logicController = async () =>{
    // Get data from API
    data.league = new LeagueData ('PL')
    await data.league.getTeamData();
    state.myteam = new ChooseTeamData();
    state.myteam.readStorage();
};
const viewController = async ()=>{
await logicController();
if(state.myteam.favouriteTeam){
// render html on team 
}else{
    await chooseView.renderHTML();
    loadChooseView();
    document.querySelector('.select__button').addEventListener('click',()=>{
        state.myteam.chooseTeam();
        console.log('a');
    })
}

}
viewController();

const loadChooseView =()=>{
    data.league.teams.forEach(el => chooseView.renderTeams(el));
    chooseView.initSlider();
// EVENT LISTENERS
    document.querySelector('.swiper-container').addEventListener('transitionend', ()=>{
        const el = document.querySelector('.swiper-slide-active');
        const teamAtt = el.getAttribute('data-team');
        document.querySelector('.select__button').setAttribute("data-team", teamAtt)
        document.querySelector('.select__button').textContent = fans[teamAtt];
    })
    chooseView.hideNav();
    window.addEventListener('resize',chooseView.hideNav);
}

