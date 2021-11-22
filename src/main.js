

import mainView from "/src/layouts/mainView.js";


const main = () => {

    initView();

};

const initView = () => {
    new mainView();
};



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