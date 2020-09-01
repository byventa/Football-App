import './css/style.css';
import '../node_modules/swiper/swiper-bundle.css';
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
    if (!data.league.teams || !data.league.season || !data.league.competition) {
      await data.league.getLeagueData();
    }
    // LOAD BASIC HTML
    teamView.renderTeamView(data.league);
    if (data.league.teams !== null || data.league.season !== null || data.league.competition !== null) {
      loaders(['league-standings', 'next-match', 'fixtures', 'top-scorers', 'twitter-feed']);

      //
      if (!data.league.table) {
        await data.league.getLeagueStandings();
      }
      // LOAD STANDING RENDER
      cleanHTML(document.querySelector('.league-standings'));
      data.league.table.forEach((standing) => teamView.renderStandings(standing, data.league.teamID));
      //

      if (!data.league.allMatches || !data.league.favTeamMatches) {
        await data.league.getMatchesData();
      }
      // LOAD SEARCH
      if (data.league.allMatches[0] !== -1) {
        loadSearch();
      } else {
        document.querySelector('.search-bar').placeholder = 'Too many request wait couple of seconds and then refresh the page.';
      }
      // LOAD NEXT MATCH
      cleanHTML(document.querySelector('.next-match'));
      teamView.nextMatch(data.league, teamView.nextMatchId(data.league));
      //
      //lOAD RENDER FIXTURES
      cleanHTML(document.querySelector('.fixtures'));
      fixtures(data.league);
      loadEventListeners();
      //

      // LOAD SCORERS

      if (!data.league.scorers || data.league.scorers.scorers[0] === -1) {
        await data.league.getTopScorers();
      }
      cleanHTML(document.querySelector('.top-scorers'));
      data.league.scorers.scorers.slice(0, 7).forEach((scorer, i) => teamView.topScorers(scorer, i, data.league.teamID));

      // LOAD TWITTER

      cleanHTML(document.querySelector('.twitter-feed'));

      teamView.loadTwitter(data.league.teamID);
    }
  } else {
    await data.league.getLeagueData();
    chooseView.renderHTML();
    loadChooseView();
  }
};
logicController();
``;
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

  document.querySelector('.select__button').addEventListener('click', () => {
    data.league.chooseTeam();
    cleanHTML(document.getElementById('root'));
    logicController();
  });
}

function fixtures(el) {
  let valueSelect = document.getElementById('target').value;

  let fixturesTypes = [[], [], [], [], []];
  if (el.allMatches.length > 2) {
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
    fixturesTypes[4] = data.league.favTeamMatches;
    fixturesTypes[valueSelect].forEach((el) => {
      teamView.renderFixtures(el);
    });
  } else if (el.allMatches[0] === -1) {
    fixturesTypes[0].push(-1);
    fixturesTypes[1].push(-1);
    fixturesTypes[2].push(-1);
    fixturesTypes[3].push(-1);
    fixturesTypes[4].push(-1);

    const markup = `
        <div class="no-results">Too many request wait couple of seconds and then refresh the page.</div>
      `;
    document.querySelector('.fixtures').insertAdjacentHTML('beforeend', markup);
  } else {
    const markup = `
    <div class="no-results">Information that you are trying to get access to is not available at this moment.</div>
  `;
    document.querySelector('.fixtures').insertAdjacentHTML('beforeend', markup);
  }

  document.querySelector('.sd-button').classList.toggle('sd-active');
  document.querySelector('.select-desktop').addEventListener('click', (e) => {
    if (e.target.value != undefined) {
      const sdButton = document.querySelectorAll('.sd-button');
      sdButton.forEach((el) => {
        el.classList.remove('sd-active');
      });
      if (!e.target.classList.contains('sd-active') && fixturesTypes[e.target.value].length > 0 && fixturesTypes[e.target.value][0] !== -1) {
        e.target.classList.toggle('sd-active');
        document.querySelector('.fixtures').innerHTML = '';
        fixturesTypes[e.target.value].forEach((el) => {
          teamView.renderFixtures(el);
        });
        document.getElementById('target').selectedIndex = e.target.value;
      } else if (fixturesTypes[e.target.value][0] === -1) {
        e.target.classList.toggle('sd-active');
        document.querySelector('.fixtures').innerHTML = '';
        const markup = `
        <div class="no-results">Too many request wait couple of seconds and then refresh the page.</div>
      `;
        document.querySelector('.fixtures').insertAdjacentHTML('beforeend', markup);
      } else {
        e.target.classList.toggle('sd-active');
        document.querySelector('.fixtures').innerHTML = '';
        const markup = `
        <div class="no-results">Information that you are trying to get access to is not available at this moment.</div>
      `;
        document.querySelector('.fixtures').insertAdjacentHTML('beforeend', markup);
      }
    }
  });
  document.getElementById('target').addEventListener('change', () => {
    valueSelect = document.getElementById('target').value;
    if (fixturesTypes[valueSelect][0] === -1) {
      document.querySelector('.fixtures').innerHTML = '';
      const markup = `
      <div class="no-results">Too many request wait couple of seconds and then refresh the page.</div>
      `;
      document.querySelector('.fixtures').insertAdjacentHTML('beforeend', markup);
    } else if (fixturesTypes[valueSelect].length < 2) {
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
    if (id !== null) {
      const id2 = parseInt(id.getAttribute('data-matchid'));
      teamView.nextMatch(data.league, id2);
    }
  });
  document.querySelector('.search-dynamic-results').addEventListener('click', (e) => {
    const id = e.target.closest('.fixture');
    if (id !== null) {
      const id2 = parseInt(id.getAttribute('data-matchid'));
      teamView.nextMatch(data.league, id2);
    }
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
      sessionStorage.setItem('scorers', JSON.stringify('null'));
      sessionStorage.setItem('favTeamMatches', JSON.stringify('null'));

      loadChooseView();
    });
  });
}
