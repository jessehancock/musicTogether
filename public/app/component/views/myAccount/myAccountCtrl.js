angular.module("musApp").controller("myAccountCtrl", function($scope, myAccountServ, $rootScope, $state) {


  $scope.getCurrentUser = function() {
      myAccountServ.getCurrentUser().then(function(response, $rootScope) {
          $scope.parent = response;
      });
  }();


    $scope.getClassSchedule = function() {
        myAccountServ.getClassSchedule().then(function(response) {
            $scope.schedule = response;
        });
    }();

//This adds scope to the models in the register tab
    $scope.addClassToScope = function(course){
      $scope.course = course;
    };


    $scope.addChildToCourse = function(course, child) {
console.log(child);


        var data = {
          // TODO: HELP THIS IS WHERE THE PROBLEM IS
            course: course.toString(),
            child: child.c_id.toString()
        };

        //ADDING COST INTO THE EQUALTION
        myAccountServ.addChildToCourse(data).then(function(response) {
            alert('thank you for registering');
        });

    };

    $scope.logout = function() {
        myAccountServ.logout().then(function(response) {
          $rootScope.currentUserSignedIn = false;
          $state.go('home');
        });
    };



});
