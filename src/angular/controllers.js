
/* Controllers */

app.controller("AppCtrl", function ($rootScope) {  
    $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
        console.log(rejection);
    })    
});

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

    $scope.rorSort = function(act) { 
        console.log("Sort with " + act + " by " + $scope.data.criteria);
        var delim = ($scope.data.criteria === "CHAR") ? "" : " ";
        $http({
            url: ROR_SERVER_URL,
            method: "POST",
            data: JSON.stringify({action: act, data: $scope.data.sourcetext.split(delim)}),
            headers: {"Content-Type": "application/json"}
        }).success(function (data, status, headers, config) {
            if (data.status === "fail") {
                $scope.message = data.error;            
                $scope.output = "";
                alert("Error with the JSON Response");
            } else {        
                $scope.message = data.message;
                $scope.output = data.data.join(" ");     // data json from "data" (payload)
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
        } else if (act === "QUICK") {
            $scope.output = quickSort(arr).join(" "); 
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
    $scope.openModal = bootstrap.openModal;
    $scope.closeModal = bootstrap.closeModal;
    $scope.toggleAccordion = bootstrap.toggleAccordion;
 
}

function GammaCtrl($scope) {
    var width = 960;
    var height = 500;
    var rateById = d3.map();
    var quantize = d3.scale.quantize()
        .domain([0, .15])
        .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

    var red_quantize = d3.scale.quantize()
        .domain([0, .15])
        .range(d3.range(9).map(function(i) { return "r" + i + "-9"; }));

    var path = d3.geo.path();

    var svg = d3.select("#stage").append("svg")
        .attr("width", width)
        .attr("height", height);

    $scope.binh = [];

    var killSpinner = function (attr) {
        d3.select("#spinner").attr("class", attr);
    }

    $scope.cold = function() {
        svg.remove();
        killSpinner("spinner");
        //d3.select("svg").remove();
        svg = d3.select("#stage").append("svg").attr("width", width).attr("height", height);
        queue()
        .defer(d3.json, "/data/us.json")
        .defer(d3.tsv, "/data/cold.tsv", function(d) { rateById.set(d.id, +d.rate); })
        .await(function(error, us) {
            killSpinner();
            svg.append("g")
                .attr("class", "counties")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.counties).features)
                .enter().append("path")
                .attr("class", function(d) { return quantize(rateById.get(d.id)); })
                .attr("d", path)
                .on("click", $scope.clicked);

            svg.append("path")
                .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
                .attr("class", "states")
                .attr("d", path);
        });
    }

    $scope.flu = function() {
        svg.remove();
        killSpinner("spinner");
        //d3.select("svg").remove();
        svg = d3.select("#stage").append("svg").attr("width", width).attr("height", height);
        queue()
            .defer(d3.json, "/data/us.json")
            .defer(d3.tsv, "/data/flu.tsv", function(d) { rateById.set(d.id, +d.rate); })
            .await(function(error, us) {
                killSpinner();
                svg.append("g")
                    .attr("class", "counties")
                    .selectAll("path")
                    .data(topojson.feature(us, us.objects.counties).features)
                    .enter().append("path")
                    .attr("class", function(d) { return red_quantize(rateById.get(d.id)); })
                    .attr("d", path)
                    .on("click", $scope.clicked);

                svg.append("path")
                    .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
                    .attr("class", "states")
                    .attr("d", path);
            });
    }    

    $scope.clicked = function(d) {
        console.log(d);
        $scope.binh.push({ "id" : d.id });
        console.log("push len : " + $scope.binh.length);
        $scope.$apply();
    }
}

var deltaCtrl = app.controller("DeltaCtrl", function ($scope, $http) {
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


app.controller('ZetaCtrl', function($scope){
    // controller "knows" nothing about donut charts
    $scope.shared = { data: [ 10, 20, 30, 40 ] };
    $scope.chartClicked = function() {
        var i, len = $scope.shared.data.length;
        for (i = 0; i < len; i++) { 
            $scope.shared.data[i] = Math.floor(Math.random()*50)+1;
            //removed this and underscore.js _.each($scope.shared.data, function(d, index) {
        }
    }
    $scope.addValue = function() {
        $scope.shared.data.push(Math.floor(Math.random()*30))+1;
    }
});


