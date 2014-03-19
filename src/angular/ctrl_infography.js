/* ctrl_infography.js ------vv-------------- */
var infographyCtrl = app.controller("InfographyCtrl", function InfographyCtrl($scope) {

	$scope.plus = function() {
		$scope.alpha = parseInt($scope.alpha, 10) +1;
         console.log("........ " + $scope.alpha);
	};

});

/* // ctrl_infography.js ---^^-------------- */

