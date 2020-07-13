import './css/style.css';
import regeneratorRuntime from "regenerator-runtime";
import LeagueData from './js/models/LeagueData';
import * as chooseView from  './js/views/chooseView';
import * as teamView from  './js/views/teamView';
import {fans, cleanHTML} from './js/views/base';
// GLOBAL VARIABLES
const data = {};
window.i = data;

// CONTROLLERS
const logicController = async () =>{
    // Get data from API
    data.league = new LeagueData ('PL')
    await data.league.getLeagueData();
    data.league.readStorage();
};

const viewController = async ()=>{
await logicController();
if(data.league.favouriteTeam){
    data.league.getData();
teamView.renderTeamView(data.league.teams);
}else if(!data.league.favouriteTeam){
    await chooseView.renderHTML();
    loadChooseView();
    document.querySelector('.select__button').addEventListener('click',()=>{
    data.league.chooseTeam();
    data.league.getData();
    cleanHTML(document.getElementById('root'));
    teamView.renderTeamView(data.league.teams[1]);
    })
}
}
viewController();

const loadChooseView = ()=>{
// LOAD CONTENT
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

