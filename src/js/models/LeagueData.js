import { elements } from '../views/base';

export default class LeagueData {
  constructor(query) {
    this.query = query;
  }
  async getLeagueData() {
    await fetch(`https://api.football-data.org/v2/competitions/${this.query}/teams`, {
      headers: { 'X-Auth-Token': '7f177860aa5f4fa08d604940d69212f5' },
    })
      .then(handleErrors)
      .then((data) => {
        this.teams = data.teams;
        this.season = data.season;
        this.competition = data.competition;

        sessionStorage.setItem('teams', JSON.stringify(this.teams));
        sessionStorage.setItem('season', JSON.stringify(this.season));
        sessionStorage.setItem('competition', JSON.stringify(this.competition));
      })
      .catch(ifErrorHappened)
      .finally((this.teams = null), (this.season = null), (this.competition = null));
  }
  async getMatchesData() {
    await fetch(`https://api.football-data.org/v2/competitions/${this.query}/matches`, {
      headers: { 'X-Auth-Token': '7f177860aa5f4fa08d604940d69212f5' },
    })
      .then(handleErrors)
      .then((data) => {
        this.allMatches = data.matches;
        this.favTeamMatches = this.allMatches.filter((el) => {
          if (el.awayTeam.id === this.teamID || el.homeTeam.id === this.teamID) {
            return el;
          }
        });

        sessionStorage.setItem('allMatches', JSON.stringify(this.allMatches));
        sessionStorage.setItem('favTeamMatches', JSON.stringify(this.favTeamMatches));
      })
      .catch(ifErrorHappened)
      .finally(((this.allMatches = [-1]), (this.favTeamMatches = [undefined])));
  }
  async getLeagueStandings() {
    await fetch(`https://api.football-data.org/v2/competitions/${this.query}/standings`, {
      headers: { 'X-Auth-Token': '7f177860aa5f4fa08d604940d69212f5' },
    })
      .then(handleErrors)
      .then((data) => {
        this.table = data.standings[0].table;
        sessionStorage.setItem('table', JSON.stringify(this.table));
      })
      .catch(ifErrorHappened)
      .finally((this.table = [-1]));
  }
  async getTopScorers() {
    await fetch(`https://api.football-data.org/v2/competitions/${this.query}/scorers`, {
      headers: { 'X-Auth-Token': '7f177860aa5f4fa08d604940d69212f5' },
    })
      .then(handleErrors)
      .then((data) => {
        this.scorers = data;
        if (this.scorers.scorers.length < 1) {
          this.scorers.scorers = [null];
        }
        sessionStorage.setItem('scorers', JSON.stringify(this.scorers));
      })
      .catch(ifErrorHappened)
      .finally(
        (this.scorers = {
          scorers: [-1],
        })
      );
  }

  chooseTeam() {
    const favouriteTeam = document.querySelector('.select__button').getAttribute('data-team');
    const favouriteTeamFullName = document.querySelector('.select__button').getAttribute('data-teamFullName');
    this.favouriteTeam = favouriteTeam;
    this.favouriteTeamFullName = favouriteTeamFullName;
    const teamID = this.teams.findIndex((team) => team.tla == favouriteTeam);
    this.teamID = parseInt(this.teams[parseInt(teamID)].id);
    localStorage.setItem('favouriteTeam', this.favouriteTeam);
    localStorage.setItem('teamID', this.teamID);
    localStorage.setItem('favouriteTeamFullName', this.favouriteTeamFullName);
  }
  readStorage() {
    // LOCAL STORAGEc
    const storageID = localStorage.getItem('teamID');
    const storageFullName = localStorage.getItem('favouriteTeamFullName');
    const favTeamTla = localStorage.getItem('favouriteTeam');
    this.teamID = parseInt(storageID);
    this.favouriteTeamFullName = storageFullName;
    this.favouriteTeam = favTeamTla;
    // SESION STORAGE
    if (JSON.parse(sessionStorage.getItem('teams')) !== null) {
      this.teams = JSON.parse(sessionStorage.getItem('teams'));
    }
    if (JSON.parse(sessionStorage.getItem('season')) !== null) {
      this.season = JSON.parse(sessionStorage.getItem('season'));
    }
    if (JSON.parse(sessionStorage.getItem('competition')) !== null) {
      this.competition = JSON.parse(sessionStorage.getItem('competition'));
    }
    if (JSON.parse(sessionStorage.getItem('table')) !== null && JSON.parse(sessionStorage.getItem('table'))[0] !== -1) {
      this.table = JSON.parse(sessionStorage.getItem('table'));
    }
    if (
      JSON.parse(sessionStorage.getItem('scorers')) !== null &&
      JSON.parse(sessionStorage.getItem('scorers')) !== 'null' &&
      JSON.parse(sessionStorage.getItem('scorers')).scorers.length > 1
    ) {
      this.scorers = JSON.parse(sessionStorage.getItem('scorers'));
    }
    if (JSON.parse(sessionStorage.getItem('allMatches')) !== null && JSON.parse(sessionStorage.getItem('allMatches'))[0] !== -1) {
      this.allMatches = JSON.parse(sessionStorage.getItem('allMatches'));
    }
    if (JSON.parse(sessionStorage.getItem('favTeamMatches')) !== null && JSON.parse(sessionStorage.getItem('favTeamMatches')) !== 'null') {
      this.favTeamMatches = JSON.parse(sessionStorage.getItem('favTeamMatches'));
    }
  }
}

function handleErrors(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw Error(response.status);
  }
}
function ifErrorHappened(error) {
  const errorStatus = error.toString().replace(/\D/g, '');
  if (errorStatus == 429) {
    console.log(`Too many request wait 60s and then try refreshing the page.`);
  } else {
    console.log(`${error}  Try refreshing the page.`);
  }
}
