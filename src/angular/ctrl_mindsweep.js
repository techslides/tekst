/* ctrl_mindsweep.js ------vv-------------- */
var mindsweepCtrl = app.controller("MindsweepCtrl", function ($scope, $http) {
    $scope.toggleAccordion = bootstrap.toggleAccordion; 
    $scope.result = "OUTPUT";
    $scope.game = new Game(12,12);
    $scope.game.start();
    $scope.display = $scope.game.show();
    
    $scope.restart = function() {
        $scope.result = "New Game Started!";
        $scope.game = new Game(document.getElementById("restart_x").value,
            document.getElementById("restart_y").value);
        $scope.game.start(document.getElementById("restart_n").value);
        $scope.display = $scope.game.show();
    };
    
    $scope.loadgame = function() {
        alert("Load Game feature is not yet implemented!");
    };
    
    $scope.play = function(x, y) {
        $scope.result = $scope.game.click(x, y);
        $scope.display = $scope.game.show();  
        if ($scope.result === "BOMB") { alert("YOU HIT A BOMB!!"); }
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
            if (data.status === "fail") {
                alert(data.error);
            } else {
                alert("Game Saved!");
            }
        }).error(function (data, status, headers, config) {
            $scope.result = "ERROR";
        });    
    };    
});

mindsweepCtrl.loadData = function ($q, $timeout) {
    var defer = $q.defer();
    $timeout(function () {
        defer.resolve();
        console.log("loadData");
    }, 500);
    return defer.promise;
};

mindsweepCtrl.makeError = function ($q, $timeout) {
    var defer = $q.defer();
    $timeout(function () {
        defer.reject();
    }, 500);
    return defer.promise;
};
   
/* // ctrl_mindsweep.js ---^^-------------- */

