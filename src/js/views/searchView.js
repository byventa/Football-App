function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}

const search = 'liverpool-#@!#%$#^&$%!vs Manchester City';
let format = search.toLowerCase().split(/[^A-Za-z]/).filter(Boolean);

const dynamicArr = [];
const searchDynamic = data.league.allMatches.forEach(el =>{
    if(el.homeTeam.name.toLowerCase().includes(format[0])){
        dynamicArr.push(el)
    }
})
format.shift();
console.log(format);
const finalArr = [];
const finalRes = dynamicArr.forEach(el =>{
    for(let i = 0; i<format.length; i++){
        if(el.awayTeam.name.toLowerCase().includes(format[i])){
            finalArr.push(el)
        }
    }
})
console.log(finalArr);