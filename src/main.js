

import titleView from "/src/layouts/topMenuView/titleView";


const main = () => {

    new titleView();

}



window.onload = function () {
    console.log("onload");

    main();

};

window.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded");

});

window.addEventListener('hashchange', () => {
    console.log("hashchange");
   // Route(location.hash)
});