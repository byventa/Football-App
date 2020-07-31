export const renderTeamView = (el) => {
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
                <div class="choose-matches">
                    <div class="select">
                        <select id="target">
                        <option value="0">All Games</option>
                        <option value="1">Scheduled</option>
                        <option value="2">Finished</option>
                        </select>
                        <div class="select_arrow">
                        </div>
                    </div>
                </div>
                <div class="fixtures">


                </div>
            </div>
        </div>


        <div class="right">
            <div class="time-area">
         
            </div>
            <div class="top-scorers">
                <div class="player">
                    <div class="position">Pos</div>
                    <div class="team-crest">Club</div>
                    <div class="player-name">Name</div>
                    <div class="goals">Goals</div>
                </div>
            </div>
            <div class="twitter-feed">
        </div>
        </div>
    </div>
</div>`;

  document.getElementById('root').insertAdjacentHTML('beforeend', markup);
};

export const renderStandings = (team, teamID) => {
  let cssClass = 'team-standing';
  if (team.team.id === teamID) {
    cssClass = 'team-standing  favouriteTeam';
  }
  const markup = `
    <div class="${cssClass}" data-teamID="${team.team.id}" data-teamPosition="${team.position}">
        <div class="team-position"><p>${team.position}</p></div>
        <div class="team-crest"><img src="src/img/logos/${team.team.id}.svg"></div>
        <div class="team-name"><p>${team.team.name}</p></div>
        <div class="team-gamesplayed"><p>${team.playedGames}</p></div>
        <div class="team-goaldiffrence"><p>${team.goalDifference}</p></div>
        <div class="team-points"><p>${team.points}</p></div>
    </div>
    `;
  document.querySelector('.league-standings').insertAdjacentHTML('beforeend', markup);
  if (cssClass.includes('favouriteTeam') && document.querySelector('.favouriteTeam').getAttribute('data-teamposition') > 7) {
    document.querySelector('.league-standings').scrollTop =
      200 + 50 * (document.querySelector('.favouriteTeam').getAttribute('data-teamposition') - 8);
  }
};
export const nextMatch = (data) => {
  let nextFixture = data.favTeamMatches.findIndex((match) => match.status === 'SCHEDULED');
  if (nextFixture === -1) {
    nextFixture = 37;
  }
  const homeTeam = data.teams.findIndex((team) => team.name === data.favTeamMatches[nextFixture].homeTeam.name);
  const awayTeam = data.teams.findIndex((team) => team.name === data.favTeamMatches[nextFixture].awayTeam.name);
  let date = new Date(data.favTeamMatches[nextFixture].utcDate);
  let minutes = date.getMinutes().toString();
  const endDate = new Date(data.favTeamMatches[nextFixture].utcDate).getTime();

  let state;

  var timer = setInterval(() => {
    let now = new Date().getTime();
    let t = endDate - now;
    if (t >= 0) {
      let days = Math.floor(t / (1000 * 60 * 60 * 24));
      let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      let secs = Math.floor((t % (1000 * 60)) / 1000);
      document.querySelector('.next-match-countdown').textContent = '';
      const timer = `${days}D ${hours}H:${mins}M:${secs}S`;
      state = timer;
      document.querySelector('.next-match-countdown').insertAdjacentHTML('beforeend', timer);
    } else {
      state = 'LIVE';
      clearInterval(timer);
    }
  }, 1000);

  let score = 'NEXT MATCH';

  if (data.favTeamMatches[nextFixture].score.fullTime.homeTeam !== '' && data.favTeamMatches[nextFixture].score.fullTime.awayTeam !== '') {
    score = `${data.favTeamMatches[nextFixture].score.fullTime.homeTeam}:${data.favTeamMatches[nextFixture].score.fullTime.awayTeam}`;
    state = 'FINISHED';
  }

  const markup = `
  <div class="next-match-imgs">
      <div class="next-match-img"><img src="src/img/logos/pl-${data.favTeamMatches[nextFixture].homeTeam.id}.png">
      </div>
      <div class="next-match-img"><img src="src/img/logos/pl-${data.favTeamMatches[nextFixture].awayTeam.id}.png">
      </div>
  </div>
  <div class="next-match-info">
      <div class="next-match-team"><div class="team-crest"><img src="src/img/logos/${data.favTeamMatches[nextFixture].homeTeam.id}.svg"></div>${
    data.teams[homeTeam].tla
  }</div>
      <div class="next-match-text">${score}</div>
      <div class="next-match-team">${data.teams[awayTeam].tla}<div class="team-crest"><img src="src/img/logos/${
    data.favTeamMatches[nextFixture].awayTeam.id
  }.svg"></div></div>
  </div>
  <div class="next-match-timer">
  <div class="next-match-countdown">
  ${state}
  </div>
  <div class="next-match-date">
  MATCHDAY ${data.favTeamMatches[nextFixture].matchday}

  </div>
  <div class="next-match-date">
  ${date.getHours()}:${minutes.padStart(2, '0')} ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} 

  </div>
  </div>
  `;
  document.querySelector('.next-match').insertAdjacentHTML('beforeend', markup);
};
export const topScorers = (el, i, teamID) => {
  let cssClass = 'player';
  if (el.team.id === teamID) {
    cssClass = 'player  favouriteTeam';
  }
  let topScorer = '';
  if (i === 0) {
    topScorer = 'topScorer';
  }
  const markup = `
    <div class="${cssClass} ${topScorer}">
        <div class="position">${i + 1}</div>
        <div class="team-crest"><img src="src/img/logos/${el.team.id}.svg"></div>
        <div class="player-name">${el.player.name}</div>
        <div class="goals">${el.numberOfGoals}</div>
    </div>
    `;
  document.querySelector('.top-scorers').insertAdjacentHTML('beforeend', markup);
};

export const renderFixtures = (el) => {
  let date = new Date(el.utcDate);
  let minutes = date.getMinutes().toString();
  const markup = `
        <div class="fixture">
        <div class="match__date">
              MATCHDAY ${el.matchday}
            </div> 
            <div class="match__date">
               ${date.getHours()}:${minutes.padStart(2, '0')} ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} 
            </div> 
            <div class="match">
                <div class="match__home-team">
                    <div class="match__home-team-logo">
                        <img src="src/img/logos/${el.homeTeam.id}.svg">
                    </div>
                    <div class="match__team-name">
                        ${el.homeTeam.name}
                    </div>
                </div>
                <div class="match__score">${el.score.fullTime.homeTeam}:${el.score.fullTime.awayTeam}</div>
                <div class="match__away-team">
                    <div class="match__away-team-logo">
                    <img src="src/img/logos/${el.awayTeam.id}.svg">
                    </div>
                    <div class="match__team-name">
                        ${el.awayTeam.name}
                    </div>
                </div>
            </div>
        </div>
        `;
  document.querySelector('.fixtures').insertAdjacentHTML('beforeend', markup);
};
export const loadTwitter = (teamID) => {
  const twitterLinks = new Map([
    [57, 'Arsenal?ref_src=twsrc%5Etfw'],
    [58, 'AVFCOfficial?ref_src=twsrc%5Etfw'],
    [61, 'ChelseaFC?ref_src=twsrc%5Etfw'],
    [62, 'Everton?ref_src=twsrc%5Etfw'],
    [64, 'LFC?ref_src=twsrc%5Etfw'],
    [65, 'ManCity?ref_src=twsrc%5Etfw'],
    [66, 'ManUtd?ref_src=twsrc%5Etfw'],
    [67, 'NUFC?ref_src=twsrc%5Etfw'],
    [68, 'NorwichCityFC?ref_src=twsrc%5Etfw'],
    [73, 'SpursOfficial?ref_src=twsrc%5Etfw'],
    [76, 'Wolves?ref_src=twsrc%5Etfw'],
    [328, 'BurnleyOfficial?ref_src=twsrc%5Etfw'],
    [338, 'LCFC?ref_src=twsrc%5Etfw'],
    [340, 'SouthamptonFC?ref_src=twsrc%5Etfw'],
    [346, 'WatfordFC?ref_src=twsrc%5Etfw'],
    [354, 'CPFC?ref_src=twsrc%5Etfw'],
    [356, 'SheffieldUnited?ref_src=twsrc%5Etfw'],
    [397, 'OfficialBHAFC?ref_src=twsrc%5Etfw'],
    [563, 'WestHam?ref_src=twsrc%5Etfw'],
    [1044, 'afcbournemouth?ref_src=twsrc%5Etfw'],
  ]);
  const markup = `<a class="twitter-timeline" data-dnt="true" data-theme="light" href="https://twitter.com/${twitterLinks.get(teamID)}"></a>`;
  document.querySelector('.twitter-feed').insertAdjacentHTML('beforeend', markup);
};
