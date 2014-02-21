
/* Directives */


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
        scope: { 'data': '=', 'onClick': '&', width: '&', height: '&' },
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