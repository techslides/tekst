/* ctrl_delta.js ------vv-------------- */
app.controller('ZetaCtrl', function($scope){
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

/* // ctrl_zeta.js ---^^-------------- */

