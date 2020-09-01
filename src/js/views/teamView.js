export const renderTeamView = (el) => {
  let markup;
  if (el.teams === null || el.season === null || el.competition === null) {
    markup = `<div class="no-results white"><img src="img/PLLOGO.svg"> Too many request wait couple of seconds and then refresh the page.
    </div>
    `;
    setInterval(function () {
      window.location.reload(1);
    }, 60000);
    document.getElementById('root').insertAdjacentHTML('beforeend', markup);
  } else {
    markup = `
<div class="teamView-container">
    <div class="grid-container">
        <div class="left">
        <div class="team-logo">
            <div class="circle">
            <img src="img/${el.teamID}.svg">
            </div>
            <div class="league-info">
            <h1>ENGLAND</h3>
            <h3>${el.competition.name} ${el.season.startDate.substring(2, 4)}/${el.season.endDate.substring(2, 4)}</h3>
            <h3>${el.favouriteTeamFullName}</h3>
            </div>
        </div>
            <div class="league-standing-info">
                <div class="team-position"><p>POS</p></div>
                <div class="team-position"></div>
                <div class="team-name"><p>CLUB</p></div>
                <div class="team-gamesplayed"><p>PL</p></div>
                <div class="team-goaldiffrence"><p>GD</p></div>
                <div class="team-points"><p>PTS</p></div>
            </div>
        <div class="league-standings" id="standings">

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

            <div class="next-match" data-id="">

            </div>
            
            <div class="matches-area">
                <div class="choose-matches">
                    <div class="select-desktop">
                      <button type="button" id="buttontarget" value="0" class="sd-button">All Fixtures</button>
                      <button type="button" id="buttontarget" value="1" class="sd-button">Scheduled</button>
                      <button type="button" id="buttontarget" value="2" class="sd-button">Finished</button>
                      <button type="button" id="buttontarget" value="3" class="sd-button">Postponed</button>
                      <button type="button" id="buttontarget" value="4" class="sd-button">${el.favouriteTeam} Fixtures</button>

                    </div>
                    <div class="select-mobile">
                        <select id="target">
                        <option value="0">All Games</option>
                        <option value="1">Scheduled</option>
                        <option value="2">Finished</option>
                        <option value="3">Postponed</option>
                        <option value="4">${el.favouriteTeamFullName}</option>
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
            <div class="top-scorer-info">
                    <div class="position">POS</div>
                    <div class="team-crest">CLUB</div>
                    <div class="player-name">NAME</div>
                    <div class="goals">GOALS</div>
                </div>
            <div class="top-scorers">
            </div>
            <div class="twitter-feed">
        </div>
        </div>
    </div>
    <div class="change-team-modal">
    <div class="modal-content">
    <div class="close-modal"></div>
      <h1 class="select__heading">Your Favourite Team is ${el.favouriteTeamFullName}</h1>
      <div class="team-logo-modal"> <img src="img/${el.teamID}.svg"></div>
      <h1 class="select__heading">Are you sure you want to change your favourite team ?</h1>
        <button id="modalbutton" class="select__button" type="button">Change Favourite Team</button>
    </div>
  </div>
</div>`;
    document.getElementById('root').insertAdjacentHTML('beforeend', markup);
  }
};

export const renderStandings = (team, teamID) => {
  if (team === -1) {
    const markup = `
    <div class="no-results">Too many request wait couple of seconds and then refresh the page.</div>
  `;
    document.querySelector('.league-standings').insertAdjacentHTML('beforeend', markup);
  } else {
    let cssClass = 'team-standing';
    if (team.team.id === teamID) {
      cssClass = 'team-standing  favouriteTeam';
    }
    const markup = `
    <div class="${cssClass}" data-teamID="${team.team.id}" data-teamPosition="${team.position}">
        <div class="team-position"><p>${team.position}</p></div>
        <div class="team-crest"><img src="img/${team.team.id}.svg"></div>
        <div class="team-name"><p>${team.team.name}</p></div>
        <div class="team-gamesplayed"><p>${team.playedGames}</p></div>
        <div class="team-goaldiffrence"><p>${team.goalDifference}</p></div>
        <div class="team-points"><p>${team.points}</p></div>
    </div>
    `;
    document.querySelector('.league-standings').insertAdjacentHTML('beforeend', markup);
    if (team.position === 20 && document.querySelector('.favouriteTeam').getAttribute('data-teamposition') > 7) {
      document.querySelector('.league-standings').scrollTop =
        200 + 50 * (document.querySelector('.favouriteTeam').getAttribute('data-teamposition') - 8);
    }
  }
};

export const nextMatchId = (data) => {
  if (data.favTeamMatches.length < 1) {
    return undefined;
  } else if (data.favTeamMatches.length === 1) {
    return null;
  } else {
    let nextFixture = data.favTeamMatches.findIndex((match) => match.status === 'SCHEDULED');
    if (nextFixture === -1) {
      nextFixture = 37;
    }
    const matchId = data.favTeamMatches[nextFixture].id;
    return matchId;
  }
};

export const nextMatch = (data, matchid) => {
  if (document.querySelector('.next-match').dataset.id !== matchid && matchid > 1 && matchid !== undefined && matchid !== null) {
    document.querySelector('.next-match').innerHTML = '';
    document.querySelector('.next-match').dataset.id = matchid;
    let match = data.allMatches.findIndex((el) => el.id === matchid);
    let homeTeamIdx = data.teams.findIndex((el) => el.id === data.allMatches[match].homeTeam.id);
    let awayTeamIdx = data.teams.findIndex((el) => el.id === data.allMatches[match].awayTeam.id);
    const nextFixture = data.favTeamMatches.findIndex((match) => match.status === 'SCHEDULED');

    let date = new Date(data.allMatches[match].utcDate);
    let minutes = date.getMinutes().toString();
    const endDate = new Date(data.allMatches[match].utcDate).getTime();
    let now = new Date().getTime();
    let t = endDate - now;
    let state = 'TBD';
    if (t >= 0) {
      let days = Math.floor(t / (1000 * 60 * 60 * 24));
      let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      let secs = Math.floor((t % (1000 * 60)) / 1000);
      const timer = `${days}D ${hours}H:${mins}M`;
      state = timer;
    } else if (t < 0 && t > -6000000) {
      state = 'LIVE';
    } else {
      state = 'FINISHED';
    }
    let score = 'NEXT MATCH';
    if (matchid !== data.favTeamMatches[nextFixture].id) {
      score = 'MATCH';
    }

    if (data.allMatches[match].score.fullTime.homeTeam !== null && data.allMatches[match].score.fullTime.awayTeam !== null) {
      score = `${data.allMatches[match].score.fullTime.homeTeam}:${data.allMatches[match].score.fullTime.awayTeam}`;
      state = 'FINISHED';
    }
    const markup = `
                  <div class="next-match-imgs">
                      <div class="next-match-img"><img src="img/pl-${data.allMatches[match].homeTeam.id}.png">
                      </div>
                      <div class="next-match-img"><img src="img/pl-${data.allMatches[match].awayTeam.id}.png">
                      </div>
                  </div>
                  <div class="next-match-info">
                      <div class="next-match-team"><div class="team-crest"><img src="img/${data.allMatches[match].homeTeam.id}.svg"></div>
                  ${data.teams[homeTeamIdx].tla}
                  </div>
                      <div class="next-match-text">${score}</div>
                      <div class="next-match-team">
                      ${data.teams[awayTeamIdx].tla}
                      <div class="team-crest"><img src="img/${data.allMatches[match].awayTeam.id}.svg"></div></div>
                  </div>
                  <div class="next-match-timer">
                  <div class="next-match-countdown">
                  ${state}
                  </div>
                  <div class="next-match-date">
                  MATCHDAY ${data.allMatches[match].matchday}
                  </div>
                  <div class="next-match-date">
                  ${date.getHours()}:${minutes.padStart(2, '0')} ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}

                  </div>
                  </div>
                  `;
    document.querySelector('.next-match').insertAdjacentHTML('beforeend', markup);
  } else if (matchid === null) {
    const markup = `
      <div class="no-results">Too many request wait couple of seconds and then refresh the page.</div>
    `;
    document.querySelector('.next-match').insertAdjacentHTML('beforeend', markup);
  } else {
    const markup = `
    <div class="no-results">Information that you are trying to get access to is not available at this moment.</div>
  `;
    document.querySelector('.next-match').insertAdjacentHTML('beforeend', markup);
  }
};
export const topScorers = (el, i, teamID) => {
  let markup;
  if (el === -1) {
    markup = `
     <div class="no-results">Too many request wait couple of seconds and then refresh the page.</div>
     `;
  } else if (el === null) {
    markup = `
    <div class="no-results">Information that you are trying to get access to is not available at this moment.</div>
     `;
  } else {
    let cssClass = 'player';
    if (el.team.id === teamID) {
      cssClass = 'player  favouriteTeam';
    }
    let topScorer = '';
    if (i === 0) {
      topScorer = 'topScorer';
    }
    markup = `
      <div class="${cssClass} ${topScorer}">
          <div class="position">${i + 1}</div>
          <div class="team-crest"><img src="img/${el.team.id}.svg"></div>
          <div class="player-name">${el.player.name}</div>
          <div class="goals">${el.numberOfGoals}</div>
      </div>
      `;
  }
  document.querySelector('.top-scorers').insertAdjacentHTML('beforeend', markup);
};

export const renderFixtures = (el) => {
  if (el === -1) {
  } else {
    let date = new Date(el.utcDate);
    let minutes = date.getMinutes().toString();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let score = 'TBD';
    let finalDay = `${date.getDate()} ${monthNames[date.getMonth()]}`;
    let finalHour = `${date.getHours()}:${minutes.padStart(2, '0')} `;
    if (el.score.fullTime.homeTeam !== null && el.score.fullTime.awayTeam !== null) {
      score = `${el.score.fullTime.homeTeam}:${el.score.fullTime.awayTeam}`;
    }
    if (el.status === 'POSTPONED') {
      finalDay = el.status;
      finalHour = 'MATCH';
    }
    const markup = `
        <div class="fixture" data-matchid="${el.id}">
        <div class="match__date">
             <div> ${finalHour}</div>
             <div>${finalDay} </div>
            </div> 
            <div class="match">
                <div class="match__team">
                    <div class="match__team-logo">
                        <img src="img/${el.homeTeam.id}.svg">
                    </div>
                    <div class="match__team-name">
                        ${el.homeTeam.name}
                    </div>
                </div>
                <div class="match__score"><div class="match__matchday">Matchday ${el.matchday}</div><div>${score}</div></div>
                <div class="match__team">
                    <div class="match__team-logo">
                    <img src="img/${el.awayTeam.id}.svg">
                    </div>
                    <div class="match__team-name">
                        ${el.awayTeam.name}
                    </div>
                </div>
            </div>
        </div>
        `;
    document.querySelector('.fixtures').insertAdjacentHTML('beforeend', markup);
  }
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
    [63, 'FulhamFC?ref_src=twsrc%5Etfw'],
    [74, 'WBA?ref_src=twsrc%5Etfw'],
    [341, 'lufc?ref_src=twsrc%5Etfw'],
  ]);
  const markup = `<a class="twitter-timeline" data-dnt="true" data-theme="light" href="https://twitter.com/${twitterLinks.get(teamID)}"></a>`;
  document.querySelector('.twitter-feed').insertAdjacentHTML('beforeend', markup);
  twttr.widgets.load();
};
