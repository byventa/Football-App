
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

        <div class="league-standings">
        <div class="team-standing">
        <div class="team-position"><p>Pos</p></div>
        <div class="team-position"></div>
        <div class="team-name"><p>Club</p></div>
        <div class="team-gamesplayed"><p>Pl</p></div>
        <div class="team-goaldiffrence"><p>GD</p></div>
        <div class="team-points"><p>Pts</p></div>
    </div></div>

        <div class="twitter-feed"></div>
        </div>
        <div class="middle">
        <div class="search-area">
            <div class="search">
            <input type="search" class="search-bar" placeholder="Search games...">
            </div>
            <div class="search-dynamic-results">
            dsadsa
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

let timeout = null;

document.querySelector('.search-bar').addEventListener('keyup',e=>{
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        console.log('Input Value:',document.querySelector('.search-bar').value);
    }, 700);
})
    
}

export const renderStandings = team =>{
    const markup = `
    <div class="team-standing" data-teamID="${team.team.id}">
        <div class="team-position"><p>${team.position}</p></div>
        <div class="team-crest"><img src="src/img/logos/${team.team.id}.svg"></div>
        <div class="team-name"><p>${team.team.name}</p></div>
        <div class="team-gamesplayed"><p>${team.playedGames}</p></div>
        <div class="team-goaldiffrence"><p>${team.goalDifference}</p></div>
        <div class="team-points"><p>${team.points}</p></div>
    </div>
    `;
    document.querySelector('.league-standings').insertAdjacentHTML('beforeend',markup);
}