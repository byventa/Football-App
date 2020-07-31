export const renderSearch = (searchValue, obj) => {
  const search = searchValue;
  const format = search.replace(/[^a-zA-Z]+/g, ' ').toLowerCase();
  const teams = [
    'lei',
    'manchester city',
    'manchester united',
    'liv',
    'west ham',
    'bou',
    'wat',
    'brighton',
    'crystal palace',
    'sou',
    'eve',
    'bur',
    'shef',
    'tot',
    'wolv',
    'new',
    'nor',
    'vil',
    'ars',
    'chel',
  ];
  const twoTeams = teams.filter((el) => format.includes(el));
  twoTeams.sort((a, b) => format.indexOf(a) - format.indexOf(b));
  const finalTwoTeams = twoTeams.splice(0, 2);
  const searchArr = [];
  obj.allMatches.forEach((el) => {
    if (
      finalTwoTeams.length < 2 &&
      (el.homeTeam.name.toLowerCase().includes(finalTwoTeams[0]) || el.awayTeam.name.toLowerCase().includes(finalTwoTeams[0]))
    ) {
      searchArr.push(el);
    } else if (el.homeTeam.name.toLowerCase().includes(finalTwoTeams[0]) && el.awayTeam.name.toLowerCase().includes(finalTwoTeams[1])) {
      searchArr.push(el);
    }
  });
  searchArr.reverse();
  searchArr.map((el) => {
    let date = new Date(el.utcDate);
    let minutes = date.getMinutes().toString();
    let score = `${el.score.fullTime.homeTeam}:${el.score.fullTime.awayTeam}`;
    if (el.status === 'SCHEDULED') {
      score = 'TBD';
    }
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
        <div class="match__score">${score}</div>
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
    document.querySelector('.search-dynamic-results').insertAdjacentHTML('beforeend', markup);
  });
};
