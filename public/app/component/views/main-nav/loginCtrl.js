angular.module('musApp').controller('loginCtrl', function($scope, myAccountServ){


$scope.currentUserSignedIn = false;

	$scope.login = function(){
		var onSuccessCallback = function(data){
			currentUserSignedIn = true;
		};
	};

	$scope.getUser = function () {
		myAccountServ.getCurrentUser().then(function(response) {
			console.log('TEST TO SEE', response);
				(response.data)? $scope.currentUserSignedIn = true : $scope.currentUserSignedIn = false;
		});
	};

$scope.getUser();


});
