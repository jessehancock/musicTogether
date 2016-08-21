// INITILIZE SERVICE
// ============================================================
angular.module("musApp").service("accountSetupServ", function($http) {
  // CRUD FUNCTIONS
  // ============================================================
  this.addCustomers = function(customerObj) {
    return $http({
      method: 'POST',
      url: '/updateUser',
      data: customerObj
    }).then(function(response) {
      return response;
    });
  };



});
