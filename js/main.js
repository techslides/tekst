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
   return { message: "I'm for a service"};
})

app.factory('SortService', function($http) {
   return {
      getSorted: function(payload) {
         return $http.get('http://localhost:8000/rest/', payload).then(function(result) {
            return result.data;
         });
      }
   }
});


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

   var action = "SORT";
   //var data = "This is the example string to sort.";

   $http({
         url: "http://localhost:8000/rest",
         method: "POST",
         data: JSON.stringify({action: action, data: $scope.data.message}),
         headers: {"Content-Type": "application/json"}
   }).success(function (data, status, headers, config) {
         $scope.result = data.result; // assignments as promise is resolved
         $scope.sorted = data.data;
   }).error(function (data, status, headers, config) {
         $scope.status = status + " " + headers;
   });
}
   

function BetaCtrl($scope, DataService) {
   $scope.data = DataService;
   $scope.reversedMsg = function () {
      return $scope.data.message.split("").reverse().join("");
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


