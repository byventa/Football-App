
export const renderTeamView = (team) =>{
const markup = `
<div class="container__teamView">
    <div class="content-wrapper">
    <div class="col30"><img src="https://1000logos.net/wp-content/uploads/2017/04/Color-Liverpool-logo.jpg">
    </div>
    <div class="col30"><img src="https://1000logos.net/wp-content/uploads/2017/04/Liverpool-symbol.jpg">
    </div>
    <div class="col30"><img src="https://1000logos.net/wp-content/uploads/2017/04/Liverpool-emblem.jpg">
    </div>
    </div>
</div>`;
    document.getElementById('root').insertAdjacentHTML('beforeend',markup);
}
