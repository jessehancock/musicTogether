angular.module('musApp')
.directive('footerDirective', function(){
  return{
    templateUrl: './app/component/views/footer/footer-tmpl.html',
    restrict: 'EA',
    controller: function($scope, footerServ){
      $scope.addEmail = function(email) {
          footerServ.addEmail(email).then(function(response){

            if (response.status === 200) {
              swal('Success', 'Thanks for joining our email list', 'success');
            }
            else{
              swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
          });
      };
    }
  };
});
