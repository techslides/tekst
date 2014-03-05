/* ctrl_alpha.js ------vv-------------- */
function AlphaCtrl($scope, $http, DataService) {
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
    
/* // ctrl_alpha.js ---^^-------------- */

