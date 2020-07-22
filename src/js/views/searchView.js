import {dataFormat} from './base'

export const renderSearch = (searchValue, obj) =>{
const search = searchValue;
const format = search.replace(/[^a-zA-Z]+/g, ' ').toLowerCase();
const teams = ['leicester','manchester city','manchester united','liverpool','west ham','bou','watford','brighton','crystal palace','southampton','everton','burnley','sheffield','tottenham','wolv','newcastle','norwich','villa','arsenal','chelsea']
const twoTeams = teams.filter(el => format.includes(el));
twoTeams.sort((a, b) => format.indexOf(a) - format.indexOf(b));
const finalTwoTeams = twoTeams.splice(0,2);
const searchArr =[];
obj.allMatches.forEach(el =>{
    if(finalTwoTeams.length<2 && (el.homeTeam.name.toLowerCase().includes(finalTwoTeams[0]) || el.awayTeam.name.toLowerCase().includes(finalTwoTeams[0]))){
        searchArr.push(el)
    }
    else if(el.homeTeam.name.toLowerCase().includes(finalTwoTeams[0]) && el.awayTeam.name.toLowerCase().includes(finalTwoTeams[1])){
        searchArr.push(el)
    }
})
searchArr.reverse();
console.log(searchArr);
searchArr.map(el =>{
const date = el.utcDate.replace('Z',"").split('T');
const time = date[1].slice(0,5);
const day = date[0].slice(8,10);
const month = date[0].slice(5,7);
let score = `${el.score.fullTime.homeTeam}:${el.score.fullTime.awayTeam}`
if(el.status === "SCHEDULED"){
    score = "TBD";
}
const markup = `
<div class="fixture">
    <div class="match__date">
        ${time} ${day}.${month}
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
document.querySelector('.search-dynamic-results').insertAdjacentHTML('beforeend',markup);
})
}
