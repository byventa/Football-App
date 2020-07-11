import './css/style.css';
import regeneratorRuntime from "regenerator-runtime";
import LeagueData from './js/models/LeagueData';


const data = {};
const state = {};
// CONTROL APP
const AppController = async () =>{
    // GET DATA FROM API
    data.league = new LeagueData ('PL')
    await data.league.getTeamData();
    // RENDER HTML DEPENDING ON LOCAL STORAGE
    if(state.team){
        // IF FAVOURITE TEAM IS IN STORAGE RENDER APP UI
    } else{
    // IF THERES NOTHING IN STORAGE RENDER PICK TEAM AND THEN RENDER APP UI
    // RENDER HTML OF SLIDER
    console.log(data);
    }
};
AppController();

window.i = data;

