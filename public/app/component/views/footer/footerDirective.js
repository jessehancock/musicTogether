angular.module('musApp')
.directive('footerDirective', function(){
  return{
    templateUrl: './app/component/views/footer/footer-tmpl.html',
    restrict: 'EA',
    controller: function($scope, footerServ){
      $scope.addEmail = function(email) {
          footerServ.addEmail(email).then(function(response){
            console.log(response);
            alert("thanks for joining " + response.data.email);
            //TODO: alert when email is already entered
          });
      };
    }
  };
});
