var REST_SERVER_URL = "http://localhost:8000/rest";

var app = angular.module("app", []);

app.config(function ($routeProvider) {
   $routeProvider.when('/', { templateUrl:"app.html", controller:"AppCtrl" })     
                 .when('/alpha', { templateUrl:"alpha.html", controller:"AlphaCtrl" })     
                 .when('/beta', { templateUrl:"beta.html", controller:"BetaCtrl" })     
                 .when('/delta', { templateUrl:"delta.html", 
                                   controller:"DeltaCtrl",
                                   resolve: {
                                      loadData: deltaCtrl.loadData,
                                   } 
                                 })     
                 .when('/error', { templateUrl:"delta.html", 
                                   controller:"DeltaCtrl",
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
   return { sourcetext: "The quick brown fox jumps over the lazy dog."};
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
      $http({
         url: REST_SERVER_URL,
         method: "POST",
         data: JSON.stringify({action: act, data: $scope.data.sourcetext}),
         headers: {"Content-Type": "application/json"}
      }).success(function (data, status, headers, config) {
         $scope.message = data.message; // assignments as promise is resolved
         $scope.output = data.data; // data json from "data" (payload)
      }).error(function (data, status, headers, config) {
         $scope.status = status + " " + headers;
      });
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


