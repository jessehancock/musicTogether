// INITILIZE SERVICE
// ============================================================
angular.module("musApp").service("myAccountServ", function($http) {
  // CRUD FUNCTIONS
  // ============================================================
  this.getClassSchedule = function() {
    return $http({
      method: 'GET',
      url: '/classSchedule'
    }).then(function(response) {
      return response.data;
    });
  };

  this.getCurrentUser = function() {
    return $http({
      method: 'GET',
      url: '/me'
    }).then(function(response) {
      return response.data;
    });
  };

  this.getCurrentUserChildren = function(id){
    console.log('step2' + id);
    return $http({
      method: 'GET',
      url: '/mykids/' + id
    }).then(function(response) {
      console.log('step3' + response);
      // TODO get this date function to calc age
      // var today = new Date(99,5,24);
      // var age = today - response.data[0].birthdate;
      // console.log('from service', age, today);
      return response.data;
    });
  };
  this.addChildToClass = function(data){
    return $http({
      method: 'PUT',
      url: '/addToCourse',
      data: data
    }).then(function(response){
    });
  };

  this.logout = function() {
    console.log('logout2');
    return $http({
      method: 'GET',
      url: '/logout'
    }).then(function(response) {
      return response;
    });
  };




});
