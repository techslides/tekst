angular.module("mod_kustom", [])
    .directive('donutChart', function() {
        return {
            scope: { 'data': '=', 'onClick': '&', width: '@', height: '@' },
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
    }
);




