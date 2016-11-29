// INITILIZE SERVICE
// ============================================================
angular.module("musApp").service("myAccountServ", function($http) {
  // CRUD FUNCTIONS
  // ============================================================

  this.getCurrentUser = function() {
    return $http({
      method: 'GET',
      url: '/me'
    }).then(function(response) {
      return response.data;
    });
  };

  this.getClassSchedule = function() {
    return $http({
      method: 'GET',
      url: '/classSchedule',
    }).then(function(response) {
      return response.data;
    });
  };

  this.addChildToCourse = function(data){
    return $http({
      method: 'PUT',
      url: '/addToCourse',
      data: data
    }).then(function(response){
      return response.data;
    });
  };

  this.updateUser = function(updatedUser, newKids){
    for(var i = 0; i < newKids.length; i++){
      updatedUser.children.push(newKids[i])
    }
    return $http({
      method: 'PUT',
      url: '/editUser',
      data: updatedUser
    }).then(function(response){
      console.log(response);
      return response.data;
    });

  }

  this.logout = function() {
    return $http({
      method: 'GET',
      url: '/logout'
    }).then(function(response) {
      return response;
    });
  };




});
