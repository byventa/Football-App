export default class LeagueData {
    constructor(query){
        this.query = query;
    }
    async getLeagueData(){
        let resleague =  await fetch(`http://api.football-data.org/v2/competitions/${this.query}/teams`,{
        headers: { 'X-Auth-Token': '7f177860aa5f4fa08d604940d69212f5' }});
        let league = await resleague.json();
        this.teams = league.teams;
        this.season = league.season;
        this.competition = league.competition;

    }
    async getMatchesData(){
        let resMatches =  await fetch(`http://api.football-data.org/v2/competitions/${this.query}/matches`,{
        headers: { 'X-Auth-Token': '7f177860aa5f4fa08d604940d69212f5' }});
        let matches = await resMatches.json();
        this.allMatches = matches.matches;
        this.favTeamMatches = matches.matches.filter(el =>{ 
            if(el.awayTeam.id === this.teamID || el.homeTeam.id === this.teamID){
              return el;
            }
          })
    }
    async getLeagueStandings(){
        let resStandings =  await fetch(`http://api.football-data.org/v2/competitions/${this.query}/standings`,{
        headers: { 'X-Auth-Token': '7f177860aa5f4fa08d604940d69212f5' }});
        let standings = await resStandings.json();
        this.standings = standings.standings;

    }
    async getTopScorers(){
        let resScorers =  await fetch(`http://api.football-data.org/v2/competitions/${this.query}/scorers`,{
        headers: { 'X-Auth-Token': '7f177860aa5f4fa08d604940d69212f5' }});
        let scorers = await resScorers.json();
        this.scorers = scorers;
    }
    getData(){
        this.getMatchesData();
        this.getLeagueStandings();
        this.getTopScorers();
    }
    chooseTeam(){
        const favouriteTeam = document.querySelector('.select__button').getAttribute('data-team');
        this.favouriteTeam = favouriteTeam;
        const teamID = this.teams.findIndex(team => team.tla == favouriteTeam);
        this.teamID = parseInt(this.teams[parseInt(teamID)].id);
        localStorage.setItem('favouriteTeam',favouriteTeam );
        localStorage.setItem('teamID',this.teamID );
    }
    readStorage(){
        const storageTeam = localStorage.getItem('favouriteTeam');
        const storageID = localStorage.getItem('teamID');
        this.favouriteTeam = storageTeam;
        this.teamID = parseInt(storageID);
    }
}
