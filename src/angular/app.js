var REST_SERVER_URL = "http://kyledinh.com:8000/rest";
var GAME_SERVER_URL = "http://kyledinh.com:8000/game";
var ROR_SERVER_URL  = "http://kyledinh.com:3000/api/rest/sort";
//var REST_SERVER_URL = "http://localhost:8000/rest";
//var GAME_SERVER_URL = "http://localhost:8000/game";
//var ROR_SERVER_URL  = "http://localhost:3000/api/rest/sort";

var app = angular.module("app", ['ui.bootstrap']);

app.config(function ($routeProvider) {
    $routeProvider.when('/', { controller:"AppCtrl", templateUrl:"app_tpl" })      
        .when('/alpha', { controller:"AlphaCtrl", templateUrl:"/html/sort.tpl" })      
        .when('/beta',  { controller:"BetaCtrl",  templateUrl:"/html/bootstrap.tpl" })      
        .when('/delta', { controller:"DeltaCtrl", templateUrl:"/html/mindsweep.tpl" })     
        .when('/gamma', { controller:"GammaCtrl", templateUrl:"/html/choropleth.tpl" })  
        .when('/zeta', { controller:"ZetaCtrl", templateUrl:"/html/dataviz.tpl" })  
        .when('/error', { controller:"DeltaCtrl", templateUrl:"error_tpl", 
            resolve: {
                makeError: deltaCtrl.makeError,
            } 
        }).otherwise( {template: "404 Not Found!"} );
});

app.run(function ($rootScope, $log) {
    $rootScope.$log = $log;
})


/* 
 * Utilities 
 */

var util = {};

util.defaultValue = function defaultValue(param, val, min) {
    // Util for making directives attrs optional with a default
    if ((param === 'undefined') || (param === null) || (isNaN(param))) { return val; } 
    if (param <= min) { return val; }
    return param;
};

var bootstrap = {};

bootstrap.toggleAccordion = function(id) {
    console.log("boot style.height: " + document.getElementById(id).style.height);
    document.getElementById(id).classList.add('in');    
    if (document.getElementById(id).style.height === "auto") { 
        document.getElementById(id).style.height = "0px";
        document.getElementById(id).style.display = "none";
    } else {
        document.getElementById(id).style.display = "block";
        document.getElementById(id).style.height = "auto";
    }
}

bootstrap.openModal = function(id) {
    document.getElementById("backdrop").classList.add('modal-backdrop');
    document.getElementById(id).style.display = "block";
    document.getElementById(id).classList.add('in');
    document.getElementById(id).setAttribute("aria-hidden","true");
}

bootstrap.closeModal = function(id) { 
    document.getElementById(id).style.display = "none";
    document.getElementById(id).classList.remove('in');
    document.getElementById(id).setAttribute("aria-hidden","false");        
    document.getElementById("backdrop").classList.remove('modal-backdrop');
}