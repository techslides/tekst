/* ctrl_dns.js ------vv-------------- */
var dnaCtrl = app.controller("DnaCtrl", function DnaCtrl($scope) {
    $scope.message = "";
    $scope.output = "";
    $scope.reports = [];

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
        console.log("mutArr" + mutArr);
        var obj = {
	        name: $scope.reports.length +1,
            length: work.len,
            mutations: mutArr
        };
        $scope.reports.push(obj);
        $scope.output = work.report();
    };
});


/* // ctrl_dns.js ---^^-------------- */

