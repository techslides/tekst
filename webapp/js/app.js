var REST_SERVER_URL = "http://kyledinh.com:8000/rest";
var GAME_SERVER_URL = "http://kyledinh.com:8000/game";
var ROR_SERVER_URL  = "http://kyledinh.com:3000/api/rest/sort";

var app = angular.module("app", ['ui.bootstrap']);

app.config(function($routeProvider) {
    $routeProvider.when('/', { controller:"AppCtrl", templateUrl:"app_tpl" })      
        .when('/sort', { controller:"SortCtrl", templateUrl:"/html/sort.tpl" })      
        .when('/beta',  { controller:"BetaCtrl",  templateUrl:"/html/bootstrap.tpl" })      
        .when('/mindsweep', { controller:"MindsweepCtrl", templateUrl:"/html/mindsweep.tpl" })     
        .when('/choropleth', { controller:"ChoroplethCtrl", templateUrl:"/html/choropleth.tpl" })  
        .when('/dataviz', { controller:"DatavizCtrl", templateUrl:"/html/dataviz.tpl" })  
        .when('/seq', { controller:"SeqCtrl", templateUrl:"/html/seq.tpl" })  
        .when('/infography', { controller:"InfographyCtrl", templateUrl:"/html/infography.tpl" })  
        .when('/error', { controller:"MindsweepCtrl", templateUrl:"error_tpl", 
            resolve: {
                makeError: mindsweepCtrl.makeError,
            } 
        }).otherwise( { template: "404 Not Found!" } );
});

app.run(function($rootScope, $log) {
    $rootScope.$log = $log;
});

app.controller("AppCtrl", function($rootScope) {  
    $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
        console.log(rejection);
    });    
});

/* 
 * Utilities 
 */

var util = {};

util.defaultValue = function defaultValue(arg, val, min) {
    // Util for making directives attrs optional with a default
    if ((arg === undefined) || (arg === null) || (isNaN(arg))) { return val; } 
    if (arg <= min) { return val; }
    return arg;
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
};

bootstrap.openModal = function(id) {
    document.getElementById("backdrop").classList.add('modal-backdrop');
    document.getElementById(id).style.display = "block";
    document.getElementById(id).classList.add('in');
    document.getElementById(id).setAttribute("aria-hidden","true");
};

bootstrap.closeModal = function(id) { 
    document.getElementById(id).style.display = "none";
    document.getElementById(id).classList.remove('in');
    document.getElementById(id).setAttribute("aria-hidden","false");        
    document.getElementById("backdrop").classList.remove('modal-backdrop');
};


;/* ctrl_sort.js ------vv-------------- */
function SortCtrl($scope, $http, DataService) {
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
    }; 

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
    };

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
    };        
}
    
/* // ctrl_sort.js ---^^-------------- */

;/* ctrl_beta.js ------vv-------------- */
function BetaCtrl($scope, DataService) {
    $scope.data = DataService;
    $scope.reversedMsg = function () {
        return $scope.data.input.split("").reverse().join("");
    };
    $scope.openModal = bootstrap.openModal;
    $scope.closeModal = bootstrap.closeModal;
    $scope.toggleAccordion = bootstrap.toggleAccordion;
 
}
   
/* // ctrl_beta.js ---^^-------------- */

;/* ctrl_mindsweep.js ------vv-------------- */
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

;/* ctrl_seq.js ------vv-------------- */
var seqCtrl = app.controller("SeqCtrl", function SeqCtrl($scope) {
    $scope.message = "";
    $scope.output = "";
    $scope.reports = [];
    $scope.seq_x = "GATTACAGATTACAGATTACAGATTACAGATTACAGATTACAGATTACAGATTACAGATTACAGATTACAGATTACAGATTACAGATTACAGATTACAGATTACA";
    $scope.seq_y = "GATTACAGATTACAGATTAGAGATTACAGATTACAGATTACAGATTACAGATTACAGATTAGAGATTACAGATTACAGATTAGAGATTACAGATTACGATTACA";

    $scope.filterBarOffset = function(items, len, offset) {
        var result = {};
        angular.forEach(items, function(value, key) {
            result[ParseInt(key)] = Math.floor(parseInt(key)/len) + offset;
        });
        return result;
    };

    $scope.align = function() {
        var work = new Work($scope.seq_x, $scope.seq_y);
        work.align();

        var mutArr = [];
        for (var k in work.mutations) {
            mutArr.push(Object.keys(work.mutations[k])[0]);
        }
        console.log("mutArr [" + mutArr + "]");
        var obj = {
	        name: $scope.reports.length +1,
            length: work.len,
            mutations: mutArr
        };
        $scope.reports.push(obj);
        $scope.output = work.report();
    };
});


/* // ctrl_seq.js ---^^-------------- */

;
/* ctrl_choropleth.js ------vv-------------- */
function ChoroplethCtrl($scope) {
    var fig1 = { id: "fig1", w: 960, h: 500, rateById: d3.map(), path: d3.geo.path(),
                 quantize: null, svg: null };

    fig1.svg = d3.select("#stage").append("svg")
        .attr("width", fig1.w).attr("height", fig1.h);

    $scope.binh = [];

    $scope.toggleSpinner = function() {
        $scope.spinner = $scope.spinner === false ? true : false;
        console.log(">> toggleSpinner() : " + $scope.spinner); 
    };

    $scope.cold = function() {
        fig1.svg.remove();
        $scope.toggleSpinner();

        fig1.svg = d3.select("#stage").append("svg").attr("width", fig1.w).attr("height", fig1.h);
        fig1.quantize = d3.scale.quantize().domain([0, .15])
            .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

        queue()
        .defer(d3.json, "/data/us.json")
        .defer(d3.tsv, "/data/cold.tsv", function(d) { fig1.rateById.set(d.id, +d.rate); })
        .await(function(error, us) {
            $scope.toggleSpinner();
            fig1.svg.append("g")
                .attr("class", "counties")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.counties).features)
                .enter().append("path")
                .attr("class", function(d) { return fig1.quantize(fig1.rateById.get(d.id)); })
                .attr("d", fig1.path)
                .on("click", $scope.clicked);

            fig1.svg.append("path")
                .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
                .attr("class", "states")
                .attr("d", fig1.path);
        });
    };

    $scope.flu = function() {

        fig1.svg.remove();
        $scope.toggleSpinner();

        fig1.svg = d3.select("#stage").append("svg").attr("width", fig1.w).attr("height", fig1.h);
        fig1.quantize = d3.scale.quantize().domain([0, .15])
            .range(d3.range(9).map(function(i) { return "r" + i + "-9"; }));

        queue()
            .defer(d3.json, "/data/us.json")
            .defer(d3.tsv, "/data/flu.tsv", function(d) { fig1.rateById.set(d.id, +d.rate); })
            .await(function(error, us) {
                $scope.toggleSpinner();
                fig1.svg.append("g")
                    .attr("class", "counties")
                    .selectAll("path")
                    .data(topojson.feature(us, us.objects.counties).features)
                    .enter().append("path")
                    .attr("class", function(d) { return fig1.quantize(fig1.rateById.get(d.id)); })
                    .attr("d", fig1.path)
                    .on("click", $scope.clicked);

                fig1.svg.append("path")
                    .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
                    .attr("class", "states")
                    .attr("d", fig1.path);
            });
    };   

    $scope.clicked = function(d) {
        console.log(d);
        $scope.binh.push({ "id" : d.id });
        $scope.$apply();
        console.log("push len : " + $scope.binh.length);
    };
}
/* // ctrl_choropleth.js ---^^-------------- */

;/* ctrl_dataviz.js ------vv-------------- */
app.controller('DatavizCtrl', function($scope){
    // controller "knows" nothing about donut charts
    $scope.shared = { data: [ 10, 20, 30, 40 ] };
    $scope.chartClicked = function() {
        var i, len = $scope.shared.data.length;
        for (i = 0; i < len; i++) { 
            $scope.shared.data[i] = Math.floor(Math.random()*50)+1;
            //removed this and underscore.js _.each($scope.shared.data, function(d, index) {
        }
    };
    $scope.addValue = function() {
        $scope.shared.data.push(Math.floor(Math.random()*30))+1;
    };
});

/* // ctrl_dataviz.js ---^^-------------- */

;/* ctrl_infography.js ------vv-------------- */
var infographyCtrl = app.controller("InfographyCtrl", function InfographyCtrl($scope) {


});

/* // ctrl_infography.js ---^^-------------- */

;/* Directives */

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

//<donut-chart>
app.directive('donutChart', function() {
    return {
        restrict: 'E',
        scope: { 'data': '=', 'onClick': '&', width: '=', height: '=' },
        controller: function($scope) { 
            $scope.width = util.defaultValue($scope.width, 240, 100); 
            $scope.height = util.defaultValue($scope.height, 240, 100); },
        link: function(scope, element, attr) {
            var pie = new PieChart(element, scope.data, scope.width, scope.height);
            pie.onClick = function() {
                scope.$apply(function() {
                    if (scope.onClick) scope.onClick();
                });
            };
            scope.$watchCollection('data', pie.updateData);
        }
    };
});

//<infography101 attrs=[alpha, beta] />
app.directive('infography101', function() {
    return {
        restrict: 'E',
        templateUrl: "/html/infography101.svg",
        replace: true,
        scope: {
            alpha: '@', beta: '@'
        },
        controller: function($scope) {
            $scope.plus = function() {
                $scope.alpha = parseInt($scope.alpha, 10) +1;
                console.log("........ " + $scope.alpha);
            };
            $scope.grow = function() {
                $scope.beta = parseInt($scope.beta, 10) +1;
                console.log("-------- " + $scope.beta);
            };      
        }
    };
});

/* 
 * D3JS Charts 
 */

function PieChart(element, data, width, height) {
    var self = this;
    var color = d3.scale.category10();
    var root = element[0];
    var min = Math.min(width, height);
    var pie = d3.layout.pie().sort(null);
    var arc = d3.svg.arc().outerRadius(min / 2 * 0.9).innerRadius(min / 2 * 0.5);
      
    svg = d3.select(root).append('svg').attr({width: width, height: height})
        .append('g').attr('transform', 'translate(' + width/2 + ',' + height/2 + ')');

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

    var arcTween = function(a) {
        // see: http://bl.ocks.org/mbostock/1346410
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) {
            return arc(i(t));
        };
    };

    this.onClick = function() {
        // not defined
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
    };
}
;
/* Filters */

// a filter
app.filter('reverse', function() {
    return function (text) {
        return text.split("").reverse().join("");
    }
});
;
/* Services */

// a service
app.factory('DataService', function() {
    return { sourcetext: "The quick brown fox jumps over the lazy dog.", criteria: "WORD"};
});

;/* src/javascript/algorithms.js */

'use strict';

function Stopwatch(debug) {
    this.begin;
    this.end;
    this.dur;
    this.debug = false; 
    if (debug === true) this.debug = true;
}

Stopwatch.prototype.start = function() {
    this.begin = Date.now();
    if (this.debug) console.log("Stopwatch started at: " + this.begin);
}

Stopwatch.prototype.stop = function() {
    this.end = Date.now();
    this.dur = this.end - this.begin;
    if (this.debug) console.log("Stopwatch stopped at: " + this.end + " dur: " + this.dur + " ms");
    return this.dur;
}

Stopwatch.prototype.lap = function() {
    var laptime = Date.now() - this.begin;
    if (this.debug) console.log("Stopwatch lapped, dur: " + laptime + " ms");
    return laptime;
}

function swap (items, x, y) {
    var temp = items[x];
    items[x] = items[y];
    items[y] = temp;
}

function selectionSort(items) {
    var N = items.length; 
    var min;
    for (var i = 0; i < N; i++) {
        min = i;
        //console.log(items);
        //check the rest of the array for anything smaller
        for (var j = i+1; j < N; j++) {
            if (items[j] < items[min]) {
                min = j;
            }
        }
        //swap the min found with pointer i
        swap(items, i , min);
    }
    console.log("selectionSort " + N + " items");
    return items;
}

function insertionSort(items) {
    var N = items.length;
    var i, j;
    console.log("insertionSort " + N + " items");
    for (i = 0; i < N; i++) {
        for (j = i; j > 0; j--) {
            if (items[j] < items[j-1]) {
                swap(items, j, j-1);
            } else {
                break;
            }
        }
    }
    return items;
}

function partition(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)],
         l = left,
         r = right;

    while (l <= r) {    
        while (items[l] < pivot) { l++; }
        while (items[r] > pivot) { r--; }

        if (l <= r) {
            swap(items, l, r);
            l++;
            r--;
        }
    }
    return l;
}

function quickSort(items, left, right) {
    var index;
    var N = items.length;

    if (N > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? (N -1) : right;
        index = partition(items, left, right);

        if (left < index -1) { quickSort(items, left, index -1); }
        if (index < right)    { quickSort(items, index, right); }
    } 
    return items;
}

function maxRoundedNum(num, max) {
    var num = Math.floor(num); 
    if (num > max) { num = max; }
    return num;
}

function bucketSort(arr, n) {
    var items  = [];
    var bucket = [];
    var len = arr.length;
    var i;

    for (i = 0; i < n; i++) {
        bucket[i] = [];
    }
    for (i = 0; i < len; i++) {
        var y = maxRoundedNum(Math.pow(arr[i], 1/5), n-1);
        bucket[y].push(arr[i]); 
    }
    for (i = 0; i < n; i++) {
        var buckarr = insertionSort(bucket[i]);
        console.log("bucket :" + buckarr);
        items = items.concat(buckarr); 
    }
    return items; 
}

var test_numbers = [112,1,223,3234,453,67,345,24554,3423,567675,231,3134,453,88,0,5,234,23,34234654,5456,2342,234];

;/* src/javascript/mindsweep.js */

/*
 * Written by Kyle Dinh, 2013. 
 * https://github.com/kyledinh/toolkit/tree/master/mindsweep
 * Use d8 or node.js to run this mine sweeper game
 * d8 --shell console.js mindsweep.js
 * var g = new Game(8,9);
 * g.start();
 * g.click(2,3);
 * g.show();
 * g.cheat();      // to see where the bombs are
 * 
 */

/*jslint devel: true, white: true, indent: 3, node: true */
//http://www.javascriptlint.com/online_lint.php
'use strict';

// Tile
// status: UNKNOWN | CHECKED | CLICKED | BOMB
function Tile(status, touch, x, y) {
    this.status = status || "UNKNOWN";
    this.touch = touch || 0;
    this.x = x;
    this.y = y;
}

Tile.prototype.print = function () {
    console.log(this.x + ", " + this.y + " " + this.status);
};

Tile.prototype.cheat = function () {
    var out = this.touch || "=";
    if (this.touch !== "undefined") { out = this.touch; }
    if (this.status === "BOMB") { out = "*"; }
    return out; 
};

Tile.prototype.show = function () {
    var out = "=";
    if ((this.status === "CHECKED") && (this.touch > 0)) { out = this.touch; }
    if ((this.status === "CHECKED") && (this.touch === 0)) { out = String.fromCharCode(160); }
    //if ((this.status === "CLICKED")) { out = "."; }
    if ((this.status === "CLICKED")) { out = this.touch; }
    return out; 
};

Tile.prototype.updateTouch = function(cnt) {
    if (this.status !== "BOMB") {
        this.touch = cnt;
    } 
};

// Grid

function Grid(x, y) {
    this.x = x;
    this.y = y;
    this.tiles = null;
}

Grid.prototype.setup = function () {
    var i, j, arr = [this.x];
    for (i=0; i < this.x; i++) {
         arr[i] = [this.y]; 
    }
    this.tiles = arr;
    for (i=0; i < this.x; i++) {
        for (j=0; j < this.y; j++) {
            this.tiles[i][j] = new Tile("UNKNOWN", 0, i, j);
        }
    }
};

//Console log the state of the Grid 
Grid.prototype.cheat = function () {
    var i, j; 
    var out = []; 
    var header = "          ";
    if (this.y > 10) { header = header + " "; }
    for (i=0; i < this.x; i++) {
        header = header + i + "  ";
        if (i < 10) { header += " "; }
    }
    console.log(header);
    for (j=0; j < this.y; j++) {
        var log = (j < 10) ? "row  " + j + " :" : "row " + j + " :"; 
        for (i=0; i < this.x; i++) {
            log = log + "[" + this.tiles[i][j].cheat() + "] "; 
            if (this.tiles[i][j].status === "BOMB") {
                out.push({x: i, y: j, show: this.tiles[i][j].cheat()});
            }
        } 
        console.log(log);
    }
    return out;
};

//Console log the state of the Grid
Grid.prototype.show = function () {
    var i, j; 
    var out = [];
    var header = "          ";
    if (this.y > 10) { header += " "; } 
    for (i=0; i < this.x; i++) {
        header = header + i + "  ";
        if (i < 10) { header += " "; }
    }
    console.log(header);
    for (j=0; j < this.y; j++) {
        var row = [];
        var log = (j < 10) ? "row  " + j + "  " : "row " + j + "  "; 
        for (i=0; i < this.x; i++) {
            log = log + "[" + this.tiles[i][j].show() + "] "; 
            row.push({x: i, y: j, show: this.tiles[i][j].show()});
        }
        out.push(row); 
        console.log(log);
    }
    return out;
};

//Switch some Tiles to Bomb tiles 
Grid.prototype.layBombs = function (numBombs) {
    var i; 
    var bombArr = [];
    var size = this.x * this.y; 
    for (i=0; i < size; i++) {
         bombArr.push(i);
    }
    bombArr = shuffleArray(bombArr);
    for (i=0; i < numBombs; i++) {
        var bomb = bombArr.pop();
        var row = Math.floor(bomb / this.x);    
        var mod = bomb % this.x;
        this.tiles[mod][row].status = "BOMB";
    }
};

Grid.prototype.isInBounds = function (x, y) {
    //console.log("checking InBound " + x + ", " + y);
    if ((x < 0) || (x >= this.x)) { return false; }
    if ((y < 0) || (y >= this.y)) { return false; }
    return true;
};

// Updates the tile's touch field with # of bombs that are adjacent
Grid.prototype.updateTiles = function () {
    var i, j;
    for (j=0; j < this.y; j++) {     // row
        for (i=0; i < this.x; i++) { // col
            var cnt = 0;
            if (this.isInBounds(i -1,j -1)) { if (this.tiles[i -1][j -1].status === "BOMB") {cnt++;} }
            if (this.isInBounds(i    ,j -1)) { if (this.tiles[i    ][j -1].status === "BOMB") {cnt++;} }
            if (this.isInBounds(i +1,j -1)) { if (this.tiles[i +1][j -1].status === "BOMB") {cnt++;} }
            if (this.isInBounds(i -1,j    )) { if (this.tiles[i -1][j    ].status === "BOMB") {cnt++;} }
            if (this.isInBounds(i +1,j    )) { if (this.tiles[i +1][j    ].status === "BOMB") {cnt++;} }
            if (this.isInBounds(i -1,j +1)) { if (this.tiles[i -1][j +1].status === "BOMB") {cnt++;} }
            if (this.isInBounds(i    ,j +1)) { if (this.tiles[i    ][j +1].status === "BOMB") {cnt++;} }
            if (this.isInBounds(i +1,j +1)) { if (this.tiles[i +1][j +1].status === "BOMB") {cnt++;} }
            console.log("updatingTouch " + i + ", " + j + " with " + cnt);
            this.tiles[i][j].updateTouch(cnt);
        }
    }
};

Grid.prototype.stringifyTiles = function () {
    var i, j, arr = [];
    for (j=0; j < this.y; j++) {     // row
        for (i=0; i < this.x; i++) { // col
            arr.push(this.tiles[i][j]);
        }
    }
    return JSON.stringify(arr);
}

Grid.prototype.parseTiles = function (str) {
    var arr = JSON.parse(str);
    var i, n = arr.length;
    for (i=0; i < n; i++) {
        this.tiles[arr[i].x][arr[i].y] = new Tile(arr[i].status, arr[i].touch, arr[i].x, arr[i].y);
    }
}

/*
 * Game object
 */

function Game(x, y) {
    this.grid = new Grid(x, y);
    this.moves = 0;
    this.numBombs;
    this.state;
    this.name;
    this.id;
    this.action;
}

function checkZeroAndPush(t, arr) {
    if ((t.touch === 0) && (t.status !== "CHECKED") && (t.status !== "CLICKED") && (t.status !== "BOMB")) {
        t.status = "CHECKED";
        arr.push(t);
        console.log("pushing to checkArr: " + t.x + ", " + t.y);
    }
    if ((t.touch > 0) && (t.status !== "BOMB") && (t.status !== "CLICKED")) {
        t.status = "CHECKED";
        console.log("marked adjacent : " + t.x + ", " + t.y);
    }
}

Game.prototype.click = function (x, y) {
    if (this.grid.isInBounds(x,y) === false) {
        console.log("Invalid click: It's off the grid, please select again!");
        return "INVALID";
    } 
    this.moves = this.moves +1;
    if ( this.grid.tiles[x][y].status === "BOMB") {
        console.log("YOU HIT A BOMB!!!");
        return "BOMB";
    }
    
    //passed invalid or bomb; process click
    this.grid.tiles[x][y].status = "CLICKED";

    var tile, checkArr = [];
    if (this.grid.tiles[x][y].touch === 0) {
        checkArr.push(this.grid.tiles[x][y]);
    }
    //while ((tile = checkArr.pop()) !== undefined) {
    while (checkArr.length > 0) {
        tile = checkArr.pop();
        var i = tile.x;
        var j = tile.y;
        tile.status = "CHECKED";
        //2D Array, looping through neighbors
        if (this.grid.isInBounds(i -1,j -1)) { checkZeroAndPush(this.grid.tiles[i -1][j -1], checkArr); }
        if (this.grid.isInBounds(i   ,j -1)) { checkZeroAndPush(this.grid.tiles[i   ][j -1], checkArr); }
        if (this.grid.isInBounds(i +1,j -1)) { checkZeroAndPush(this.grid.tiles[i +1][j -1], checkArr); }
        if (this.grid.isInBounds(i -1,j   )) { checkZeroAndPush(this.grid.tiles[i -1][j   ], checkArr); }
        if (this.grid.isInBounds(i +1,j   )) { checkZeroAndPush(this.grid.tiles[i +1][j   ], checkArr); }
        if (this.grid.isInBounds(i -1,j +1)) { checkZeroAndPush(this.grid.tiles[i -1][j +1], checkArr); }
        if (this.grid.isInBounds(i   ,j +1)) { checkZeroAndPush(this.grid.tiles[i   ][j +1], checkArr); }
        if (this.grid.isInBounds(i +1,j +1)) { checkZeroAndPush(this.grid.tiles[i +1][j +1], checkArr); }
    }
    return "OK"; 
};

Game.prototype.start = function (numBombs) {
    this.numBombs = numBombs || 8;
    this.grid.setup();
    this.grid.layBombs(this.numBombs);
    this.grid.updateTiles();
};

Game.prototype.show = function () {
    console.log("show:");
    return this.grid.show();
};

Game.prototype.cheat = function () {
    console.log("cheat view:");
    return this.grid.cheat();
};

Game.prototype.stringify = function () {
    var obj = new Game(this.grid.x, this.grid.y);
    obj.grid = this.grid.stringifyTiles();
    obj.moves = this.moves;
    obj.numBombs = this.numBombs;
    obj.name = this.name;
    obj.state = this.state;
    obj.id = this.id;
    obj.action = this.action;
    return JSON.stringify(obj);
}

// LIBRARY

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

;/* src/javascript/Work.js */

/*
 * Written by Kyle Dinh, 2014. 
 */
(function () { 

    function Work(controlStr, sampleStr, wordLength) {
        this.name = "";
        this.control = controlStr || " ";
        this.sampler = sampleStr || " ";
        this.word = wordLength || 6;
        this.curPointer = 0;    
        this.len = this.control.length;
        this.mutations = [];
        this.DEBUG = false;
    }

    Work.prototype.debug = function (msg) {
        if (this.DEBUG) { console.log(msg); }
    };

    Work.prototype.incPointer = function (i) {
        var n = i || 1;
        this.curPointer += n;
    };

    Work.prototype.alter = function (pos) {
        if ((pos + 2) > this.len) { return "MUTATION"; } 
        if (this.control[pos+1] === this.sampler[pos]) { return "BLANK"; }
        return "MUTATION";
    };

    // Simple algorithm for now, needs more work 
    Work.prototype.align  = function () {
        for (var i = 0; this.curPointer < this.len; i++) {
            if (this.control[i] === this.sampler[i]) {
                this.debug(i + " " + this.control[i] + " - " + this.sampler[i]);
            }
            if (this.control[i] !== this.sampler[i]) {
                var action = this.alter(i); 
                if (action === "BLANK") { this.insert(i, " "); }
                var mutation = {}; 
                mutation[i] = action;
                this.mutations.push(mutation);
                this.debug(action + " " + this.control[i] + " : " + this.sampler[i]);
            }
            this.curPointer++;
        } 
    };

    Work.prototype.insert = function (pos, str) {
        var place = str || " ";
        var head = "" + this.sampler.slice(0, pos);
        var tail = "" + this.sampler.slice(pos, this.sampler.length); 
        this.sampler = head + place + tail;
    };

    Work.prototype.printAtIndex = function (i) {
        this.printPair(this.control[i], this.sampler[i]);
    };

    Work.prototype.printPair = function (x, y) {
        var str = "";
        if (typeof y === 'undefined') { str = x + " - ."; }
        if (x === y) { str = x + " - " + y; }
        if (x !== y) { str = x + " * " + y; }
        if (y === " ") { str = x + " *  "; }
        console.log(str);
    };

    Work.prototype.report = function () {
        var obj = {
	   name: this.name,
           length: this.len,
           mutations: this.mutations
        };
        return JSON.stringify(obj);
    }

    // Nodejs export
    if (typeof exports !== 'undefined') {
        exports.Work = Work;
    } else {
        this.Work = Work;  
    }

})();

/* Work.js built Tue Mar  4 05:18:52 PST 2014 -- kyledinh */ 
;/********* DEV ENVIRONMENT RE-WRITE **********/

REST_SERVER_URL = "http://localhost:8000/rest";
GAME_SERVER_URL = "http://localhost:8000/game";
ROR_SERVER_URL  = "http://localhost:3000/api/rest/sort";

