import {elements} from '../views/base';


export default class ChooseTeamData {
    constructor(){
    }
    chooseTeam(){
        const favouriteTeam = document.querySelector('.select__button').getAttribute('data-team');
        localStorage.setItem('favouriteTeam',favouriteTeam );
        this.favouriteTeam = favouriteTeam;
    }
    readStorage(){
        const storage = localStorage.getItem('favouriteTeam');
        this.favouriteTeam = storage;
    }
}