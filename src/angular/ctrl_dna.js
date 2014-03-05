/* ctrl_dns.js ------vv-------------- */
var dnaCtrl = app.controller("DnaCtrl", function DnaCtrl($scope) {
    $scope.message = "";
    $scope.output = "";
    $scope.reports = [];

    $scope.align = function() {
        var work = new Work($scope.seq_x, $scope.seq_y);
        work.align();
        var obj = {
	   		name: $scope.reports.length +1,
           	length: work.len,
           	mutations: work.mutations
        };
        $scope.reports.push(obj);
        $scope.output = work.report();
        //$scope.$apply();
    };
});
/* // ctrl_dns.js ---^^-------------- */

