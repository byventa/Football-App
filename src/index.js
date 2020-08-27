import './css/style.css';
import regeneratorRuntime from 'regenerator-runtime';
import LeagueData from './js/models/LeagueData';
import * as chooseView from './js/views/chooseView';
import * as teamView from './js/views/teamView';
import * as searchView from './js/views/searchView';
import { loaders, fans, cleanHTML } from './js/views/base';
// GLOBAL VARIABLES
const data = {};
window.i = data;

// CONTROLLERS
const logicController = async () => {
  // Get data from API
  data.league = new LeagueData('PL');
  data.league.readStorage();

  if (data.league.teamID) {
    if (data.league.teams !== null && data.league.allMatches !== null && data.league.table !== null) {
      if (data.league.scorers) teamView.renderTeamView(data.league);
      data.league.table.forEach((standing) => teamView.renderStandings(standing, data.league.teamID));
      loadSearch();
      teamView.nextMatch(data.league, teamView.nextMatchId(data.league));
      fixtures(data.league);
      loadEventListeners();
      if (data.league.scorers === null || data.league.scorers.count < 1) {
        const markup = `
        <div class="no-results">Information that you are trying to get access to is not available at this moment.</div>
      `;
        cleanHTML(document.querySelector('.top-scorers'));
        document.querySelector('.top-scorers').insertAdjacentHTML('beforeend', markup);
      } else {
        data.league.scorers.scorers.slice(0, 7).forEach((scorer, i) => teamView.topScorers(scorer, i, data.league.teamID));
      }
      teamView.loadTwitter(data.league.teamID);
    } else {
      await data.league.getLeagueData();
      // LOAD BASIC HTML
      teamView.renderTeamView(data.league);
      loaders(['league-standings', 'next-match', 'fixtures', 'top-scorers']);
      //
      await data.league.getLeagueStandings();
      // LOAD STANDING RENDER
      cleanHTML(document.querySelector('.league-standings'));
      data.league.table.forEach((standing) => teamView.renderStandings(standing, data.league.teamID));
      //
      await data.league.getMatchesData();
      // LOAD SEARCH
      loadSearch();
      //
      // LOAD NEXT MATCH
      cleanHTML(document.querySelector('.next-match'));
      teamView.nextMatch(data.league, teamView.nextMatchId(data.league));
      //
      //lOAD RENDER FIXTURES
      cleanHTML(document.querySelector('.fixtures'));
      fixtures(data.league);
      loadEventListeners();
      //
      await data.league.getTopScorers();
      // LOAD SCORERS
      if (data.league.scorers.count < 1) {
        const markup = `
        <div class="no-results">Information that you are trying to get access to is not available at this moment.</div>
      `;
        cleanHTML(document.querySelector('.top-scorers'));
        document.querySelector('.top-scorers').insertAdjacentHTML('beforeend', markup);
      } else {
        cleanHTML(document.querySelector('.top-scorers'));
        data.league.scorers.scorers.slice(0, 7).forEach((scorer, i) => teamView.topScorers(scorer, i, data.league.teamID));
      }
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
  data.league.teams.forEach((el) => chooseView.renderTeams(el, '.swiper-wrapper'));
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

  let fixturesTypes = [[], [], [], []];

  el.allMatches.forEach((el) => {
    if (el.status !== '') {
      fixturesTypes[0].push(el);
    }
    if (el.status === 'FINISHED') {
      fixturesTypes[2].push(el);
    }
    if (el.status === 'SCHEDULED') {
      fixturesTypes[1].push(el);
    }
    if (el.status === 'POSTPONED') {
      fixturesTypes[3].push(el);
    }
  });
  fixturesTypes[valueSelect].forEach((el) => {
    teamView.renderFixtures(el);
  });

  document.querySelector('.sd-button').classList.toggle('sd-active');

  document.querySelector('.select-desktop').addEventListener('click', (e) => {
    if (e.target.value !== undefined) {
      const sdButton = document.querySelectorAll('.sd-button');
      sdButton.forEach((el) => {
        el.classList.remove('sd-active');
      });
      if (!e.target.classList.contains('sd-active') && fixturesTypes[e.target.value].length > 0) {
        e.target.classList.toggle('sd-active');
        document.querySelector('.fixtures').innerHTML = '';
        fixturesTypes[e.target.value].forEach((el) => {
          teamView.renderFixtures(el);
        });
        document.getElementById('target').selectedIndex = e.target.value;
      } else {
        e.target.classList.toggle('sd-active');
        document.querySelector('.fixtures').innerHTML = '';
        const markup = `
        <div class="no-results">Information that you are trying to get access to is not available at the moment.</div>
      `;
        document.querySelector('.fixtures').insertAdjacentHTML('beforeend', markup);
      }
    }
  });
  document.getElementById('target').addEventListener('change', () => {
    valueSelect = document.getElementById('target').value;
    if (fixturesTypes[valueSelect].length < 1) {
      document.querySelector('.fixtures').innerHTML = '';
      const markup = `
      <div class="no-results">Information that you are trying to get access to is not available at the moment.</div>
    `;
      document.querySelector('.fixtures').insertAdjacentHTML('beforeend', markup);
    } else {
      document.querySelector('.fixtures').innerHTML = '';
      fixturesTypes[valueSelect].forEach((el) => {
        teamView.renderFixtures(el);
      });
    }
  });
}
function loadEventListeners() {
  document.querySelector('.fixtures').addEventListener('click', (e) => {
    const id = e.target.closest('.fixture');
    const id2 = parseInt(id.getAttribute('data-matchid'));
    teamView.nextMatch(data.league, id2);
  });
  document.querySelector('.search-dynamic-results').addEventListener('click', (e) => {
    const id = e.target.closest('.fixture');
    const id2 = parseInt(id.getAttribute('data-matchid'));
    teamView.nextMatch(data.league, id2);
  });

  document.querySelector('.circle').addEventListener('click', () => {
    document.querySelector('.change-team-modal').style.display = 'flex';
    document.querySelector('.change-team-modal').addEventListener('click', (e) => {
      if (e.target.classList.contains('change-team-modal') || e.target.classList.contains('close-modal')) {
        document.querySelector('.change-team-modal').style.display = 'none';
      }
    });
    document.addEventListener('keyup', function (e) {
      if (e.which == 27) {
        document.querySelector('.change-team-modal').style.display = 'none';
      }
    });
    document.getElementById('modalbutton').addEventListener('click', () => {
      chooseView.renderHTML();
      localStorage.clear();
      sessionStorage.clear();
      loadChooseView();
    });
  });
}
