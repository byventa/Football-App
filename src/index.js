import './css/style.css';
import regeneratorRuntime from "regenerator-runtime";
import LeagueData from './js/models/LeagueData';
import * as chooseView from  './js/views/chooseView';
import * as teamView from  './js/views/teamView';
import * as searchView from  './js/views/searchView';
import {fans, cleanHTML, elements} from './js/views/base';
// GLOBAL VARIABLES
const data = {};
window.i = data;

// CONTROLLERS
const logicController = async () =>{
    // Get data from API
    data.league = new LeagueData ('PL')
    await data.league.getLeagueData();
    data.league.readStorage();
    await data.league.getLeagueStandings();
    data.league.getTopScorers();
};

const viewController = async ()=>{
    await logicController();
    if(data.league.teamID){
        await data.league.getMatchesData();
        teamView.renderTeamView(data.league);
        data.league.table.forEach(el => teamView.renderStandings(el,data.league.teamID));
        
        let timeout = null;
        document.querySelector('.search-bar').addEventListener('keyup',e=>{
            let value = document.querySelector('.search-bar').value
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                cleanHTML(document.querySelector('.search-dynamic-results'));;
                searchView.renderSearch(value,data.league);
            }, 700);
        })
        teamView.nextMatch(data.league);

    }else if(!data.league.teamID){
        await chooseView.renderHTML();
        loadChooseView();
        document.querySelector('.select__button').addEventListener('click',()=>{
            data.league.chooseTeam();
            data.league.getMatchesData();
            cleanHTML(document.getElementById('root'));
            teamView.renderTeamView(data.league);
            data.league.table.forEach(el => teamView.renderStandings(el));
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
        const teamFullNameAtt = el.getAttribute('data-teamfullname');
        document.querySelector('.select__button').setAttribute("data-team", teamAtt)
        document.querySelector('.select__button').setAttribute("data-teamfullname", teamFullNameAtt)
        document.querySelector('.select__button').textContent = fans[teamAtt];
    })
    chooseView.hideNav();
    window.addEventListener('resize',chooseView.hideNav);
}