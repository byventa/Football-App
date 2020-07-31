import './css/style.css';
import regeneratorRuntime from 'regenerator-runtime';
import LeagueData from './js/models/LeagueData';
import * as chooseView from './js/views/chooseView';
import * as teamView from './js/views/teamView';
import * as searchView from './js/views/searchView';
import { fans, elements, cleanHTML } from './js/views/base';
// GLOBAL VARIABLES
const data = {};
window.i = data;

// CONTROLLERS
const logicController = async () => {
  // Get data from API
  data.league = new LeagueData('PL');
  data.league.readStorage();

  if (data.league.teamID) {
    if (data.league.teams && data.league.scorers) {
      teamView.renderTeamView(data.league);
      data.league.table.forEach((standing) => teamView.renderStandings(standing, data.league.teamID));
      loadSearch();
      teamView.nextMatch(data.league);
      fixtures(data.league);
      data.league.scorers.scorers.slice(0, 10).forEach((scorer, i) => teamView.topScorers(scorer, i, data.league.teamID));
      teamView.loadTwitter(data.league.teamID);
    } else {
      await data.league.getLeagueData();
      // LOAD BASIC HTML
      teamView.renderTeamView(data.league);
      //
      await data.league.getLeagueStandings();
      // LOAD STANDING RENDER
      data.league.table.forEach((standing) => teamView.renderStandings(standing, data.league.teamID));
      //
      await data.league.getMatchesData();
      // LOAD SEARCH
      loadSearch();
      //
      // LOAD NEXT MATCH
      teamView.nextMatch(data.league);
      //
      //lOAD RENDER FIXTURES
      fixtures(data.league);
      //
      await data.league.getTopScorers();
      // LOAD SCORERS
      data.league.scorers.scorers.slice(0, 10).forEach((scorer, i) => teamView.topScorers(scorer, i, data.league.teamID));
      //
      // LOAD TWITTER
      teamView.loadTwitter(data.league.teamID);
    }
  } else {
    await data.league.getLeagueData();
    chooseView.renderHTML();
    loadChooseView();
  }
};
logicController();
function loadSearch() {
  let timeout = null;
  document.querySelector('.search-bar').addEventListener('keyup', (e) => {
    let value = document.querySelector('.search-bar').value;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cleanHTML(document.querySelector('.search-dynamic-results'));
      searchView.renderSearch(value, data.league);
    }, 700);
  });
}
function loadChooseView() {
  // LOAD CONTENT
  data.league.teams.forEach((el) => chooseView.renderTeams(el));
  chooseView.initSlider();
  // EVENT LISTENERS
  document.querySelector('.swiper-container').addEventListener('transitionend', () => {
    const el = document.querySelector('.swiper-slide-active');
    const teamAtt = el.getAttribute('data-team');
    const teamFullNameAtt = el.getAttribute('data-teamfullname');
    document.querySelector('.select__button').setAttribute('data-team', teamAtt);
    document.querySelector('.select__button').setAttribute('data-teamfullname', teamFullNameAtt);
    document.querySelector('.select__button').textContent = fans[teamAtt];
  });
  chooseView.hideNav();
  window.addEventListener('resize', chooseView.hideNav);

  document.querySelector('.select__button').addEventListener('click', () => {
    data.league.chooseTeam();
    cleanHTML(document.getElementById('root'));
    logicController();
  });
}

function fixtures(el) {
  let valueSelect = document.getElementById('target').value;

  let fixturesTypes = [[], [], []];

  el.allMatches.forEach((el) => {
    if (el.status !== '') {
      fixturesTypes[0].push(el);
    }
    if (el.status === 'FINISHED') {
      fixturesTypes[1].push(el);
    }
    if (el.status === 'SCHEDULED') {
      fixturesTypes[2].push(el);
    }
  });
  fixturesTypes[valueSelect].forEach((el) => {
    teamView.renderFixtures(el);
  });

  document.getElementById('target').addEventListener('change', () => {
    valueSelect = document.getElementById('target').value;
    document.querySelector('.fixtures').innerHTML = '';
    fixturesTypes[valueSelect].forEach((el) => {
      teamView.renderFixtures(el);
    });
  });
}
