export default class LeagueData {
  constructor(query) {
    this.query = query;
  }
  async getLeagueData() {
    let resleague = await fetch(`http://api.football-data.org/v2/competitions/${this.query}/teams`, {
      headers: { 'X-Auth-Token': '7f177860aa5f4fa08d604940d69212f5' },
    });
    let league = await resleague.json();
    this.teams = league.teams;
    this.season = league.season;
    this.competition = league.competition;
    sessionStorage.setItem('teams', JSON.stringify(this.teams));
    sessionStorage.setItem('season', JSON.stringify(this.season));
    sessionStorage.setItem('competition', JSON.stringify(this.competition));
  }
  async getMatchesData() {
    let resMatches = await fetch(`http://api.football-data.org/v2/competitions/${this.query}/matches`, {
      headers: { 'X-Auth-Token': '7f177860aa5f4fa08d604940d69212f5' },
    });
    let matches = await resMatches.json();
    this.allMatches = matches.matches;
    this.favTeamMatches = matches.matches.filter((el) => {
      if (el.awayTeam.id === this.teamID || el.homeTeam.id === this.teamID) {
        return el;
      }
    });
    sessionStorage.setItem('allMatches', JSON.stringify(this.allMatches));
    sessionStorage.setItem('favTeamMatches', JSON.stringify(this.favTeamMatches));
  }
  async getLeagueStandings() {
    let resStandings = await fetch(`http://api.football-data.org/v2/competitions/${this.query}/standings`, {
      headers: { 'X-Auth-Token': '7f177860aa5f4fa08d604940d69212f5' },
    });
    let standings = await resStandings.json();
    this.table = standings.standings[0].table;
    sessionStorage.setItem('table', JSON.stringify(this.table));
  }
  async getTopScorers() {
    let resScorers = await fetch(`http://api.football-data.org/v2/competitions/${this.query}/scorers`, {
      headers: { 'X-Auth-Token': '7f177860aa5f4fa08d604940d69212f5' },
    });
    let scorers = await resScorers.json();
    this.scorers = scorers;
    sessionStorage.setItem('scorers', JSON.stringify(this.scorers));
  }

  chooseTeam() {
    const favouriteTeam = document.querySelector('.select__button').getAttribute('data-team');
    const favouriteTeamFullName = document.querySelector('.select__button').getAttribute('data-teamFullName');
    this.favouriteTeam = favouriteTeam;
    this.favouriteTeamFullName = favouriteTeamFullName;
    const teamID = this.teams.findIndex((team) => team.tla == favouriteTeam);
    this.teamID = parseInt(this.teams[parseInt(teamID)].id);
    localStorage.setItem('teamID', this.teamID);
    localStorage.setItem('favouriteTeamFullName', this.favouriteTeamFullName);
  }
  readStorage() {
    // LOCAL STORAGE
    const storageID = localStorage.getItem('teamID');
    const storageFullName = localStorage.getItem('favouriteTeamFullName');
    this.teamID = parseInt(storageID);
    this.favouriteTeamFullName = storageFullName;
    // SESION STORAGE
    this.teams = JSON.parse(sessionStorage.getItem('teams'));
    this.season = JSON.parse(sessionStorage.getItem('season'));
    this.competition = JSON.parse(sessionStorage.getItem('competition'));
    this.allMatches = JSON.parse(sessionStorage.getItem('allMatches'));
    this.favTeamMatches = JSON.parse(sessionStorage.getItem('favTeamMatches'));
    this.table = JSON.parse(sessionStorage.getItem('table'));
    this.scorers = JSON.parse(sessionStorage.getItem('scorers'));
  }
}
