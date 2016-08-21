angular.module('musApp')
    .directive('navDirective', function() {
        return {
            templateUrl: './app/component/views/main-nav/main-nav-tmpl.html',
            restrict: 'EA',
            controller: function($scope, authService){
              $scope.currentUserSignedIn = false;
              authService.getCurrentUser().then(function(response){
                if(response.data) $scope.currentUserSignedIn = true;
                else $scope.currentUserSignedIn = false;
              });
            }
        };
    });
