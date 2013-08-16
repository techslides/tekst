var REST_SERVER_URL = "http://localhost:8000/rest";

var app = angular.module("app", []);

app.config(function ($routeProvider) {
   $routeProvider.when('/',      { templateUrl:"app.html",   controller:"AppCtrl" })     
                 .when('/alpha', { templateUrl:"alpha.html", controller:"AlphaCtrl" })     
                 .when('/beta',  { templateUrl:"beta.html",  controller:"BetaCtrl" })     
                 .when('/delta', { templateUrl:"delta.html", controller:"DeltaCtrl",
                                      resolve: {
                                         loadData: deltaCtrl.loadData,
                                      } 
                                 })     
                 .when('/error', { templateUrl:"delta.html", controller:"DeltaCtrl",
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
      console.log("Sort with " + act + " by " + $scope.data.criteria)
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
      sw.start();
      $scope.output = selectionSort($scope.data.sourcetext.split(delim)).join(delim); 
      $scope.message = sw.stop();
      //alert("Not yet implemented!");
   }      
}
   
function BetaCtrl($scope, DataService) {
   $scope.data = DataService;
   $scope.reversedMsg = function () {
      return $scope.data.input.split("").reverse().join("");
   }
}

var deltaCtrl = app.controller("DeltaCtrl", function ($scope) {
   $scope.model =  { message: "This is the App" };
});

deltaCtrl.loadData = function ($q, $timeout) {
   var defer = $q.defer();
   $timeout(function () {
      defer.resolve();
      console.log("loadData");
   }, 2000);
   return defer.promise;
}

deltaCtrl.makeError = function ($q, $timeout) {
   var defer = $q.defer();
   $timeout(function () {
      defer.reject();
   }, 500);
   return defer.promise;
}


