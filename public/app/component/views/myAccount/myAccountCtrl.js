// ============================================================
angular.module("musApp").controller("myAccountCtrl", function($scope, myAccountServ, $rootScope, $state) {

    $scope.getClassSchedule = function() {
        myAccountServ.getClassSchedule().then(function(response) {
            $scope.schedule = response;
        });
    }();

    $scope.getCurrentUser = function() {
        myAccountServ.getCurrentUser().then(function(response, $rootScope) {
            $scope.parent = response;
        });
    }();

    $scope.getCurrentUserChildren = function(id) {
        myAccountServ.getCurrentUserChildren(id).then(function(response) {
            $scope.children = response;
            console.log(response, 'SHOULD I DELETE THIS?');
        $scope.updateCurrentChildSchedule(response);
        });
    }('hello');



$scope.updateCurrentChildSchedule = function(children) {
    myAccountServ.displayCurrentChildSchedule(children).then(function(response) {
      $scope.childSchedule = response;
    });
};



    $scope.addChildToClass = function(course, child) {
        var data = {
          // TODO: HELP THIS IS WHERE THE PROBLEM IS
            course: course.toString(),
            child: child.toString()
        };
        myAccountServ.addChildToClass(data).then(function(response) {
            // console.log(response);
            alert('thank you for registering');
        });

    };

    $scope.addClassToScope = function(course){
      $scope.course = course;
    };


    $scope.logout = function() {
        myAccountServ.logout().then(function(response) {
          $rootScope.currentUserSignedIn = false;
          $state.go('home');
        });
    };



});
