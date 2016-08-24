// ============================================================
angular.module("musApp").controller("myAccountCtrl", function($scope, myAccountServ, $rootScope, $state) {

    $scope.getClassSchedule = function() {
        myAccountServ.getClassSchedule().then(function(response) {
            $scope.schedule = response;
        });
    };
    $scope.getClassSchedule();

    $scope.getCurrentUser = function() {
        myAccountServ.getCurrentUser().then(function(response, $rootScope) {
            console.log('this might be the answer' + response.id);
            $scope.parent = response;
            $scope.getCurrentUserChildren(response.id);
            //I call this hear so that I already have a parent.id back
        });
    };
    $scope.getCurrentUser();

    $scope.getCurrentUserChildren = function(id) {
        myAccountServ.getCurrentUserChildren(id).then(function(response) {
            $scope.children = response;
        });
    };

    // $scope.getCurrentUserChildren(id);


    $scope.addChildToClass = function(course, child) {
        var data = {
          // TODO: HELP THIS IS WHERE THE PROBLEM IS
            course: course.toString(),
            child: child.toString()
        };
        myAccountServ.addChildToClass(data).then(function(response) {
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
