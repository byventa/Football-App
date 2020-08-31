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
    'ful',
    'west bromwich',
    'leeds',
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
    document.querySelector('.search-dynamic-results').insertAdjacentHTML('beforeend', markup);
  });
};
