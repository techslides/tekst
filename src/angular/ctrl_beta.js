/* ctrl_beta.js ------vv-------------- */
function BetaCtrl($scope, DataService) {
    $scope.data = DataService;
    $scope.reversedMsg = function () {
        return $scope.data.input.split("").reverse().join("");
    }
    $scope.openModal = bootstrap.openModal;
    $scope.closeModal = bootstrap.closeModal;
    $scope.toggleAccordion = bootstrap.toggleAccordion;
 
}
   
/* // ctrl_beta.js ---^^-------------- */

