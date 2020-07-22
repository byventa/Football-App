export const renderTeamView = el =>{

const markup = `
<div class="teamView-container">
    <div class="grid-container">
        <div class="left">
        <div class="team-logo">
            <div class="circle">
                <img src="src/img/logos/${el.teamID}.svg">
            </div>
                <h1>${el.favouriteTeamFullName}</h1>
        </div>
            <div class="league-standing-info">
                <div class="team-position"><p>Pos</p></div>
                <div class="team-position"></div>
                <div class="team-name"><p>Club</p></div>
                <div class="team-gamesplayed"><p>Pl</p></div>
                <div class="team-goaldiffrence"><p>GD</p></div>
                <div class="team-points"><p>Pts</p></div>
            </div>
        <div class="league-standings">
        </div>

        <div class="twitter-feed"></div>
        </div>
        <div class="middle">
        <div class="search-area">
            <div class="search">
            <input type="search" class="search-bar" placeholder="Search games...">
            </div>
            <div class="search-dynamic-results">
            </div>
        </div>
        <div class="next-match"></div>
        <div class="matches-area">
            <div class="choose-matches"></div>
            <div class="fixtures">
                <div class="fixture">
                        <div class="team">
                        <img src="src/img/logos/57.svg" style="height:25px"><p>Liverpool</p>
                        </div>

                        <div class="score">
                        <p>3:1</p>
                        </div>

                        <div class="team">
                        <img  src="src/img/logos/MCI.svg" style="height:25px"><p>Manchester City</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="time-area"></div>
            <div class="top-scorers"></div>
            <div class="facebook-feed"></div>
        </div>
        </div>
    </div>
</div>`;
document.getElementById('root').insertAdjacentHTML('beforeend',markup);
}

export const renderStandings = (team,teamID) =>{
    let cssClass = "team-standing";
    if(team.team.id === teamID){
        cssClass = "team-standing  favouriteTeam";
    }
    const markup = `
    <div class="${cssClass}" data-teamID="${team.team.id}">
        <div class="team-position"><p>${team.position}</p></div>
        <div class="team-crest"><img src="src/img/logos/${team.team.id}.svg"></div>
        <div class="team-name"><p>${team.team.name}</p></div>
        <div class="team-gamesplayed"><p>${team.playedGames}</p></div>
        <div class="team-goaldiffrence"><p>${team.goalDifference}</p></div>
        <div class="team-points"><p>${team.points}</p></div>
    </div>
    `;
    document.querySelector('.league-standings').insertAdjacentHTML('beforeend',markup);
    if(document.querySelector('.favouriteTeam')){
        var el = document.querySelector('.favouriteTeam');
        el.scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        });
    }

}
export const nextMatch = data =>{
const nextFixture = data.favTeamMatches.findIndex(match => match.status ==="SCHEDULED")
const homeTeam = data.teams.findIndex(team => team.name === data.favTeamMatches[nextFixture].homeTeam.name);
const awayTeam = data.teams.findIndex(team => team.name === data.favTeamMatches[nextFixture].awayTeam.name);
const date = data.favTeamMatches[nextFixture].utcDate.replace('Z',"").split('T');
const time = date[1].slice(0,5);
const day = date[0].slice(8,10);
const month = date[0].slice(5,7);
const markup = `
<div class="next-match-imgs">
    <div class="next-match-img"><img src="src/img/logos/pl-${data.favTeamMatches[nextFixture].homeTeam.id}.png">
    </div>
    <div class="next-match-img"><img src="src/img/logos/pl-${data.favTeamMatches[nextFixture].awayTeam.id}.png">
    </div>
</div>
<div class="next-match-info">
    <div class="next-match-team"><div class="team-crest"><img src="src/img/logos/${data.favTeamMatches[nextFixture].homeTeam.id}.svg"></div>${data.teams[homeTeam].tla}</div>
    <div class="next-match-text">NEXT MATCH</div>
    <div class="next-match-team">${data.teams[awayTeam].tla}<div class="team-crest"><img src="src/img/logos/${data.favTeamMatches[nextFixture].awayTeam.id}.svg"></div></div>
</div>
<div class="next-match-timer">
<div class="next-match-countdown">
</div>
<div class="next-match-date">
${time} ${day}.${month}
</div>
</div>
`;
document.querySelector('.next-match').insertAdjacentHTML('beforeend',markup);
const endDate = new Date(data.favTeamMatches[nextFixture].utcDate).getTime();
var timer = setInterval(() => {
    let now = new Date().getTime(); 
    let t = endDate - now; 
    if (t >= 0) {

        let days = Math.floor(t / (1000 * 60 * 60 * 24));
        let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        let secs = Math.floor((t % (1000 * 60)) / 1000);
        document.querySelector('.next-match-countdown').innerHTML = "";
        const timer = `${days}D ${hours}H:${mins}M:${secs}S`
        document.querySelector('.next-match-countdown').insertAdjacentHTML('beforeend',timer);

    }
}, 1000);
}