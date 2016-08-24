angular.module('app',[]);

angular.module('musApp', ['ui.router'])
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state
	('home', {
    url: '/',
    templateUrl: './app/component/views/home/home.html'
   })
  .state('about', {
    url: '/about',
    templateUrl: './app/component/views/about/about.html'
   })
	 .state('contact', {
    url: '/contact',
    templateUrl: './app/component/views/contact/contact.html'
	})
	.state('schedule', {
	 url: '/schedule',
	 templateUrl: './app/component/views/schedule/schedule.html'
 })
 .state('accountSetup', {
	 url: '/accountSetup',
 	templateUrl: './app/component/views/accountSetup/account-setup.html',
 	controller: 'accountSetupCtrl',
	resolve: {
		user: ["authService", "$state", function(authService, $state) {

			authService.getCurrentUser().then(function(response) {
				console.log('this was hit 2');
				if(response.data.new_user === false) {
					$state.go('myaccount');
				}
				else if(response.data === ""){
					$state.go('home');
				}
			});
		}]
	}
 })
 .state('myaccount', {
 url: '/myaccount',
 templateUrl: './app/component/views/myAccount/myaccount.html',
 controller: 'myAccountCtrl',
 resolve: {
	 user:["authService", "$state", function(authService, $state){
	 authService.getCurrentUser().then(function(response){
			 if(response.data.new_user === false){
			 $state.go('myaccount');
			 // return response;
		 }
		 else{
			 $state.go('accountSetup');
			 alert('please log in and compelete the registration process');
			 return response;
		 }
	 });
	 }]
 }
 })

 .state('mykids', {
	url: '/myaccount/mykids',
	templateUrl: './app/component/views/myAccount/mykids/mykids.html',
	controller: 'myAccountCtrl',
	resolve: {
		user:["authService", "$state", function(authService, $state){
		authService.getCurrentUser().then(function(response){
				if(response.data.new_user === false){
				$state.go('mykids');
				// return response;
			}
			else{
				$state.go('accountSetup');
				alert('please log in and compelete the registration process');
				return response;
			}
		});
		}]
	}
	//need a resolve to get user and assign it to scope
 })
 .state('register', {
	url: '/myaccount/register',
	templateUrl: './app/component/views/myAccount/register/register.html',
	controller: 'myAccountCtrl',
	resolve: {
		user:["authService", "$state", function(authService, $state){
		authService.getCurrentUser().then(function(response){
				if(response.data.new_user === false){
				$state.go('register');
				// return response;
			}
			else{
				$state.go('accountSetup');
				alert('please log in and compelete the registration process');
				return response;
			}
		});
		}]
	}
 })
 .state('editaccount', {
	url: '/myaccount/editaccount',
	templateUrl: './app/component/views/myAccount/editaccount/editaccount.html',
	controller: 'myAccountCtrl',
	resolve: {
		user:["authService", "$state", function(authService, $state){
		authService.getCurrentUser().then(function(response){
				if(response.data.new_user === false){
				$state.go('editaccount');
				// return response;
			}
			else{
				$state.go('accountSetup');
				alert('please log in and compelete the registration process');
				return response;
			}
		});
		}]
	}
 });


}]);


          // INITILIZE SERVICE
          // ============================================================
          angular.module('musApp').service("authService", ["$http", function($http) {
            // AUTH FUNCTIONS
            // ============================================================
            this.login = function(user) {
              return $http({
                method: 'post',
                url: '/login',
                data: user
              }).then(function(response) {
                return response;
              });
            };
            this.logout = function() {
              return $http({
                method: 'get',
                url: '/logout'
              }).then(function(response) {
                return response;
              });
            };
            this.getCurrentUser = function() {
              return $http({
                method: 'GET',
                url: '/me'
              }).then(function(response) {
                return response;
              });
            };
            this.registerUser = function(user) {
              return $http({
                method: 'POST',
                url: '/register',
                data: user
              }).then(function(response) {
                return response;
              });
            };
            this.editUser = function(id, user) {
              return $http({
                method: 'PUT',
                url: "/user/" + id,
                data: user
              }).then(function(response) {
                return response;
              });
            };
            // OTHER FUNCTIONS
            // ============================================================
          }]);

// INITILIZE CONTROLLER
// ============================================================
angular.module("musApp").controller("accountSetupCtrl", ["$scope", "accountSetupServ", "$state", function($scope, accountSetupServ, $state) {
    // VARIABLES
    // ============================================================
    $scope.customerObj = {
        parent: {
            email: '',
            phone: ''
        },
        children: [{
            name: '',
            birthday: ''
        }]
    };
    // FUNCTIONS
    // ==========================================================
    $scope.addChild = function() {
        $scope.customerObj.children.push({name: '', birthdate: ''});
    };


    $scope.removeChild = function(index){
      $scope.customerObj.children.splice(index, 1);
    };


    $scope.addCustomers = function(customerObj){
    	accountSetupServ.addCustomers(customerObj).then(function(response){
        console.log('the truth', response);
        $scope.parent = response;
        $state.go('myaccount');
    	});

    };


}]);

// INITILIZE SERVICE
// ============================================================
angular.module("musApp").service("accountSetupServ", ["$http", function($http) {
  // CRUD FUNCTIONS
  // ============================================================
  this.addCustomers = function(customerObj) {
    return $http({
      method: 'POST',
      url: '/updateUser',
      data: customerObj
    }).then(function(response) {
      return response;
    });
  };



}]);

angular.module('musApp')
.directive('footerDirective', function(){
  return{
    templateUrl: './app/component/views/footer/footer-tmpl.html',
    restrict: 'EA',
    controller: ["$scope", "footerServ", function($scope, footerServ){
      $scope.addEmail = function(email) {
          footerServ.addEmail(email).then(function(response){
            console.log(response);
            alert("thanks for joining " + response.data.email);
            //TODO: alert when email is already entered
          });
      };
    }]
  };
});

angular.module("musApp").service("footerServ", ["$http", function($http) {

  this.addEmail = function(email) {
    console.log('footerServ', email);
    return $http({
      method: 'POST',
      url: '/mailinglist',
      data: {email: email}
    });
  };


}]);

angular.module('musApp').controller('loginCtrl', ["$scope", "loginServ", function($scope, loginServ){

	$scope.login = function(){
		var onSuccessCallback = function(data){
			currentUserSignedIn = true;
		};
	};



}]);

angular.module('musApp').service("loginServ", ["$http", function($http){


}]);

angular.module('musApp')
    .directive('navDirective', function() {
        return {
            templateUrl: './app/component/views/main-nav/main-nav-tmpl.html',
            restrict: 'EA',
            controller: ["$scope", "authService", function($scope, authService) {
                $scope.currentUserSignedIn = false;
                authService.getCurrentUser().then(function(response) {
                    if (response.data) $scope.currentUserSignedIn = true;
                    else $scope.currentUserSignedIn = false;
                });
            }],
            link: function(elem, attr, scope) {

                $(document).ready(function() {
                  $(window).scroll(function() {
                    // $('#myModal').appendTo("body").modal('show');
                    var y = document.body.scrollTop;
                    if(y >= 228){
                      $(".menu-container").css({"position": "fixed", "top": "15", "box-shadow": "0 6px 20px 0 rgba(0, 0, 0, 0.19)"} );
                    }
                    else {
                      $(".menu-container").css({"position": "inherit"});
                    }

                  });
                });

            }
        };

    });

// ============================================================
angular.module("musApp").controller("myAccountCtrl", ["$scope", "myAccountServ", "$rootScope", function($scope, myAccountServ, $rootScope) {

    $scope.getClassSchedule = function() {
        myAccountServ.getClassSchedule().then(function(response) {
            $scope.schedule = response;
        });
    };
    $scope.getClassSchedule();

    $scope.getCurrentUser = function() {
        myAccountServ.getCurrentUser().then(function(response, $rootScope) {
            $scope.parent = response;
            //I call this hear so that I already have a parent.id back
        });
    };
    $scope.getCurrentUser();

    $scope.getCurrentUserChildren = function(id) {
        myAccountServ.getCurrentUserChildren(id).then(function(response) {
            $scope.children = response;
        });
    };

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
      console.log(course);
      $scope.course = course;
    };


    $scope.logout = function() {
        console.log('logout1');
        myAccountServ.logout().then(function(response) {

        });
    };



}]);

// INITILIZE SERVICE
// ============================================================
angular.module("musApp").service("myAccountServ", ["$http", function($http) {
  // CRUD FUNCTIONS
  // ============================================================
  this.getClassSchedule = function() {
    return $http({
      method: 'GET',
      url: '/classSchedule'
    }).then(function(response) {
      return response.data;
    });
  };

  this.getCurrentUser = function() {
    return $http({
      method: 'GET',
      url: '/me'
    }).then(function(response) {
      return response.data;
    });
  };

  this.getCurrentUserChildren = function(id){
    return $http({
      method: 'GET',
      url: '/mykids/' + id
    }).then(function(response) {
      // TODO get this date function to calc age
      // var today = new Date(99,5,24);
      // var age = today - response.data[0].birthdate;
      // console.log('from service', age, today);
      return response.data;
    });
  };
  this.addChildToClass = function(data){
    return $http({
      method: 'PUT',
      url: '/addToCourse',
      data: data
    }).then(function(response){
    });
  };

  this.logout = function() {
    console.log('logout2');
    return $http({
      method: 'get',
      url: '/logout'
    }).then(function(response) {
      return response;
    });
  };




}]);

angular.module('musApp')
    .directive('accountNavDirective', function() {
        return {
            templateUrl: './app/component/views/myAccount/account-nav/account-nav.html',
            restrict: 'EA',
            controller: 'myAccountCtrl'
        };
    });

// INITILIZE CONTROLLER
// ============================================================
angular.module("musApp").controller("registerCtrl", ["$scope", "registerServ", function($scope, registerServ) {
  // VARIABLES
  // ============================================================
//USE THIS CONTROLLER IF YOU NEED TO DO ANYTHING IN TH REGISTER.html
//YOU WILL HAVE TO DO A NG-CONTROLLER ON WHATEVER YOU USE.
//DIV NG-CONTROLLER registerCtrl EXAMPLE

}]);

// INITILIZE SERVICE
// ============================================================
angular.module("musApp").service("registerServ", ["$http", function($http) {
  // CRUD FUNCTIONS
  // ============================================================

  // OTHER FUNCTIONS
  // ============================================================

}]);
