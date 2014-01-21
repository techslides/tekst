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

// a service
app.factory('DataService', function() {
    return { sourcetext: "The quick brown fox jumps over the lazy dog.", criteria: "WORD"};
});

// a filter
app.filter('reverse', function() {
    return function (text) {
        return text.split("").reverse().join("");
    }
});

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
});

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

//<donut-chart>
app.directive('donutChart', function() {
    return {
        scope: { 'data': '=', 'onClick': '&', width: '&', 
            height: '&' },
        controller: function($scope) {
           $scope.width = util.defaultValue($scope.width, 200, 100); 
           $scope.height = util.defaultValue($scope.height, 200, 100); },
        restrict: 'E',
        link: function(scope, element, attr) {
            var pie = new PieChart(element, scope.data, scope.width, scope.height);
            pie.onClick = function() {
                scope.$apply(function(){
                    if(scope.onClick) scope.onClick();
                });
            }
            scope.$watchCollection('data', pie.updateData);
        }
    };
});

app.controller('ZetaCtrl', function($scope){
    // controller "knows" nothing about donut charts
    $scope.shared = { data: [ 10, 20, 30, 40 ] };
    $scope.chartClicked = function() {
        var len = $scope.shared.data.length,
            i;
        for (i = 0; i < len; i++) { 
            $scope.shared.data[i] = Math.floor(Math.random()*50)+1;
            //removed this and underscore.js _.each($scope.shared.data, function(d, index) {
        }
    }
    $scope.addValue = function() {
        $scope.shared.data.push(Math.floor(Math.random()*30))+1;
    }
});

/* 
 * D3JS Charts 
 */

function PieChart(element, data, width, height) {
    var self = this;
    var color = d3.scale.category10();
    var el = element[0];
    var min = Math.min(width, height);
    var pie = d3.layout.pie().sort(null);
    var arc = d3.svg.arc()
        .outerRadius(min / 2 * 0.9)
        .innerRadius(min / 2 * 0.5);
      
    svg = d3.select(el).append('svg')
        .attr({width: width, height: height})
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    svg.on('mousedown', function(d) {
        self.onClick();
    });
    
    // add the <path>s for each arc slice
    arcs = svg.selectAll('path.arc').data(pie(data))
        .enter().append('path')
        .attr('class', 'arc')
        .style('stroke', 'white')
        .attr('fill', function(d, i) { return color(i) })
        // store the initial angles
        .each(function(d) { return this._current = d });

    var arcTween = function (a) {
        // see: http://bl.ocks.org/mbostock/1346410
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) {
            return arc(i(t));
        };
    }
    this.onClick = function() {
      
    };
    
    this.updateData = function(newData, oldData) {
        var data = newData.slice(0); // copy
        var duration = 500;
        var PI = Math.PI;
        while(data.length < oldData.length) data.push(0);
        arcs = svg.selectAll('.arc').data(pie(data));
        arcs.transition().duration(duration).attrTween('d', arcTween);
        // transition in any new slices
        arcs.enter().append('path')
            .style('stroke', 'white')
            .attr('class', 'arc')
            .attr('fill', function(d, i){ return color(i) })
            .each(function(d) {
                this._current = { startAngle: 2 * PI - 0.001, endAngle: 2 * PI }
            })
            .transition().duration(duration).attrTween('d', arcTween);
        // transition out any slices with size = 0
        arcs.filter(function(d){ return d.data === 0 })
            .transition()
            .duration(duration)
            .each(function(d){ d.startAngle = 2 * PI - 0.001; d.endAngle = 2 * PI; })
            .attrTween('d', arcTween).remove();
    }
}


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
