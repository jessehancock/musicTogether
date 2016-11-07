angular.module("musApp").service("footerServ", function($http) {

  this.addEmail = function(email) {
    return $http({
      method: 'POST',
      url: '/mailinglist',
      data: {email: email}
    });
  };


});
