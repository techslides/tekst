/* ctrl_dns.js ------vv-------------- */
var dnaCtrl = app.controller("DnaCtrl", function DnaCtrl($scope) {
    $scope.message = "--";
    $scope.align = function() {
        var work = new Work($scope.seq_x, $scope.seq_y);
        work.align();
        $scope.output = work.report();
    };
});

/* // ctrl_dns.js ---^^-------------- */

