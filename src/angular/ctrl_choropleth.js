
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

