
/* ctrl_gamma.js ------vv-------------- */
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

    $scope.toggleSpinner = function() {
        $scope.spinner = $scope.spinner === false ? true : false;
        console.log(">> toggleSpinner() : " + $scope.spinner); 
    };

    $scope.cold = function() {
        svg.remove();
        $scope.toggleSpinner();
        //d3.select("svg").remove();
        svg = d3.select("#stage").append("svg").attr("width", width).attr("height", height);
        queue()
        .defer(d3.json, "/data/us.json")
        .defer(d3.tsv, "/data/cold.tsv", function(d) { rateById.set(d.id, +d.rate); })
        .await(function(error, us) {
            $scope.toggleSpinner();
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
    };

    $scope.flu = function() {
        svg.remove();
        $scope.toggleSpinner();
        //d3.select("svg").remove();
        svg = d3.select("#stage").append("svg").attr("width", width).attr("height", height);
        queue()
            .defer(d3.json, "/data/us.json")
            .defer(d3.tsv, "/data/flu.tsv", function(d) { rateById.set(d.id, +d.rate); })
            .await(function(error, us) {
                $scope.toggleSpinner();
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
    };   

    $scope.clicked = function(d) {
        console.log(d);
        $scope.binh.push({ "id" : d.id });
        $scope.$apply();
        console.log("push len : " + $scope.binh.length);
    };
}
/* // ctrl_gamma.js ---^^-------------- */

