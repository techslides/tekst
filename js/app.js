var REST_SERVER_URL = "http://localhost:8000/rest";
var GAME_SERVER_URL = "http://localhost:8000/game";

var app = angular.module("app", []);

app.config(function ($routeProvider) {
   $routeProvider.when('/',      { controller:"AppCtrl",   templateUrl:"app_tpl"  })     
                 .when('/alpha', { controller:"AlphaCtrl", templateUrl:"alpha_tpl" })     
                 .when('/beta',  { controller:"BetaCtrl",  templateUrl:"beta_tpl" })     
                 .when('/delta', { controller:"DeltaCtrl", templateUrl:"delta_tpl" })     
                 .when('/error', { controller:"DeltaCtrl", templateUrl:"error_tpl", 
                                      resolve: {
                                         makeError: deltaCtrl.makeError,
                                      } 
                                 })     
                 .otherwise( {template: "404 Not Found!"} )     
})

app.run(function ($rootScope, $log) {
   $rootScope.$log = $log;
})

// a service
app.factory('DataService', function() {
   return { sourcetext: "The quick brown fox jumps over the lazy dog.", criteria: "WORD"};
})

// a filter
app.filter('reverse', function() {
   return function (text) {
      return text.split("").reverse().join("");
   }
})

app.directive("error", function ($rootScope) {
   return {
      restrict:"E",
      template:'<div class="alert-box alert" ng-show="isError">Error!!!</div>',
      link: function (scope) {
         $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
            scope.isError = true;
         })
      }
   }
})

app.controller("AppCtrl", function ($rootScope) {  
   $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
      console.log(rejection);
   })   
})

function AlphaCtrl($scope, $http, DataService) {
   $scope.data = DataService;
   $scope.goSort = function(act) { 
      console.log("Sort with " + act + " by " + $scope.data.criteria);
      var delim = ($scope.data.criteria === "CHAR") ? "" : " ";
      $http({
         url: REST_SERVER_URL,
         method: "POST",
         data: JSON.stringify({action: act, data: $scope.data.sourcetext.split(delim)}),
         headers: {"Content-Type": "application/json"}
      }).success(function (data, status, headers, config) {
         if (data.status === "fail") {
            $scope.message = data.error; // assignments as promise is resolved
            $scope.output = "";
            alert("Error with the JSON Response");
         } else {      
            $scope.message = data.message; // assignments as promise is resolved
            $scope.output = data.data.join(" "); // data json from "data" (payload)
         }
      }).error(function (data, status, headers, config) {
         $scope.status = status + " " + headers;
      });
   } 
   $scope.jsSort = function(act) {
      console.log("Sort with " + act + " by " + $scope.data.criteria)
      var delim = ($scope.data.criteria === "CHAR") ? "" : " ";
      var sw = new Stopwatch(true);
      var arr = $scope.data.sourcetext.split(delim);
      sw.start();
      if (act === "NATIVE") {
         $scope.output = $scope.data.sourcetext.split(delim).sort().join(" "); 
      } else if (act === "SELECTION") {
         $scope.output = selectionSort(arr).join(" "); 
      } else if (act === "INSERTION") {
         $scope.output = insertionSort(arr).join(" "); 
      } else {
         var showalert = true;
      }
      $scope.message = act + " " +sw.stop() + "ms : " + arr.length + " elements";
      if (showalert) { 
         alert("ERROR: " + act + " Not yet implemented!");
         $scope.output = ""; 
      }
   }      
}
   
function BetaCtrl($scope, DataService) {
   $scope.data = DataService;
   $scope.reversedMsg = function () {
      return $scope.data.input.split("").reverse().join("");
   }
   $scope.openModal = function(id) {
      document.getElementById("backdrop").classList.add('modal-backdrop');
      document.getElementById(id).style.display = "block";
      document.getElementById(id).classList.add('in');
      document.getElementById(id).setAttribute("aria-hidden","true");
   }
   $scope.closeModal = function(id) { 
      document.getElementById(id).style.display = "none";
      document.getElementById(id).classList.remove('in');
      document.getElementById(id).setAttribute("aria-hidden","false");      
      document.getElementById("backdrop").classList.remove('modal-backdrop');
   }
}

var deltaCtrl = app.controller("DeltaCtrl", function ($scope, $http) {
   $scope.result = "OUTPUT";
   $scope.game = new Game(12,12);
   $scope.game.start();
   $scope.display = $scope.game.show();
   $scope.play = function(x, y) {
      $scope.result = $scope.game.click(x, y);
      $scope.display = $scope.game.show();   
   };
   $scope.save = function() {
      console.log("Saving game: " + $scope.game.name);
      $scope.game.action = "SAVEGAME";
      var gameData = $scope.game.stringify();
      $http({
         url: GAME_SERVER_URL,
         method: "POST",
         data: gameData,
         headers: {"Content-Type": "application/json"}
      }).success(function (data, status, headers, config) {
         // TODO better result output for errors
         if (data.status === "fail") {
            //
            alert("Error with the JSON Response");
         } else {      
            alert("Game Saved!");
         }
      }).error(function (data, status, headers, config) {
         $scope.result = "ERROR";
      });   
   };   
});

deltaCtrl.loadData = function ($q, $timeout) {
   var defer = $q.defer();
   $timeout(function () {
      defer.resolve();
      console.log("loadData");
   }, 500);
   return defer.promise;
};

deltaCtrl.makeError = function ($q, $timeout) {
   var defer = $q.defer();
   $timeout(function () {
      defer.reject();
   }, 500);
   return defer.promise;
};


