// INITILIZE CONTROLLER
// ============================================================
angular.module("musApp").controller("accountSetupCtrl", function($scope, accountSetupServ, $state) {
    // VARIABLES
    // ============================================================
    $scope.customerObj = {
        parent: {
            email: '',
            phone: ''
        },
        children: [{
            name: '',
            birthdate: ''
        }]
    };
    // FUNCTIONS
    // ==========================================================
    $scope.addChild = function() {
        $scope.customerObj.children.push({name: '', birthdate: ''});
    };


    $scope.removeChild = function(index){
      $scope.customerObj.children.splice(index, 1);
    };


    $scope.addCustomers = function(customerObj){
    	accountSetupServ.addCustomers(customerObj).then(function(response){
        $scope.parent = response;
        $state.go('myaccount');
    	});

    };


});
