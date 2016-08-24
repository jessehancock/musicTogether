angular.module('musApp').controller('loginCtrl', function($scope, authService){


$scope.currentUserSignedIn = false;

	$scope.login = function(){
		var onSuccessCallback = function(data){
			currentUserSignedIn = true;
		};
	};

	$scope.getUser = function () {
		authService.getCurrentUser().then(function(response) {
			console.log(response);
				(response.data)? $scope.currentUserSignedIn = true : $scope.currentUserSignedIn = false;
		});
	};

$scope.getUser();


});
