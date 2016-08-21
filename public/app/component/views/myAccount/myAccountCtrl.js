// ============================================================
angular.module("musApp").controller("myAccountCtrl", function($scope, myAccountServ, $rootScope) {

  $scope.getClassSchedule = function(){
    myAccountServ.getClassSchedule().then(function(response){
      $scope.schedule = response;
    });
  };

  $scope.getCurrentUser = function(){
    myAccountServ.getCurrentUser().then(function(response, $rootScope){
      $scope.parent = response;
      //I call this hear so that I already have a parent.id back
      $scope.getCurrentUserChildren($scope.parent.id);
    });
  };
  $scope.getCurrentUser();

  $scope.getCurrentUserChildren = function(id){
    myAccountServ.getCurrentUserChildren(id).then(function(response){
      console.log(response);
      $scope.children = response;
    });
  };

});
