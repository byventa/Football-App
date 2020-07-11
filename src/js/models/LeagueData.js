export default class LeagueData {
    constructor(query){
        this.query = query;
    }
    async getTeamData(){
        let res =  await fetch(`http://api.football-data.org/v2/competitions/${this.query}/teams`,{
        headers: { 'X-Auth-Token': '7f177860aa5f4fa08d604940d69212f5' }});
        let league = await res.json();
        this.teams = league.teams;
        this.season = league.season;
        this.competition = league.competition;
    }
}
