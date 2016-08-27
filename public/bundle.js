angular.module('app', []);
angular.module('musApp', ['ui.router']).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('home', {
		url: '/',
		templateUrl: './app/component/views/home/home.html'
	}).state('about', {
		url: '/about',
		templateUrl: './app/component/views/about/about.html'
	}).state('contact', {
		url: '/contact',
		templateUrl: './app/component/views/contact/contact.html'
	}).state('schedule', {
		url: '/schedule',
		templateUrl: './app/component/views/schedule/schedule.html'
	}).state('accountSetup', {
		url: '/accountSetup',
		templateUrl: './app/component/views/accountSetup/account-setup.html',
		controller: 'accountSetupCtrl',
		resolve: {
			user: ["myAccountServ", "$state", function (myAccountServ, $state) {

				myAccountServ.getCurrentUser().then(function (response) {
					if (response.new_user === false) {
						$state.go('myaccount');
					} else if (response.data === "") {
						$state.go('home');
					}
				});
			}]
		}
	}).state('myaccount', {
		url: '/myaccount',
		templateUrl: './app/component/views/myAccount/myaccount.html',
		controller: 'myAccountCtrl',
		resolve: {
			user: ["myAccountServ", "$state", function (myAccountServ, $state) {
				myAccountServ.getCurrentUser().then(function (response) {
					if (response.new_user === false) {
						$state.go('myaccount');
						// return response;
					} else {
						$state.go('accountSetup');
						alert('please log in and compelete the registration process');
						return response;
					}
				});
			}]
		}
	}).state('mykids', {
		url: '/myaccount/mykids',
		templateUrl: './app/component/views/myAccount/mykids/mykids.html',
		controller: 'myAccountCtrl',
		resolve: {
			user: ["myAccountServ", "$state", function (myAccountServ, $state) {
				myAccountServ.getCurrentUser().then(function (response) {
					if (response.new_user === false) {
						$state.go('mykids');
						// return response;
					} else {
						$state.go('accountSetup');
						alert('please log in and compelete the registration process');
						return response;
					}
				});
			}]
		}
		//need a resolve to get user and assign it to scope
	}).state('register', {
		url: '/myaccount/register',
		templateUrl: './app/component/views/myAccount/register/register.html',
		controller: 'myAccountCtrl',
		resolve: {
			user: ["myAccountServ", "$state", function (myAccountServ, $state) {
				myAccountServ.getCurrentUser().then(function (response) {
					if (response.new_user === false) {
						$state.go('register');
						// return response;
					} else {
						$state.go('accountSetup');
						alert('please log in and compelete the registration process');
						return response;
					}
				});
			}]
		}
	}).state('editaccount', {
		url: '/myaccount/editaccount',
		templateUrl: './app/component/views/myAccount/editaccount/editaccount.html',
		controller: 'myAccountCtrl',
		resolve: {
			user: ["myAccountServ", "$state", function (myAccountServ, $state) {
				myAccountServ.getCurrentUser().then(function (response) {
					if (response.new_user === false) {
						$state.go('editaccount');
						// return response;
					} else {
						$state.go('accountSetup');
						alert('please log in and compelete the registration process');
						return response;
					}
				});
			}]
		}
	});
}]);
// INITILIZE CONTROLLER
// ============================================================
angular.module("musApp").controller("accountSetupCtrl", ["$scope", "accountSetupServ", "$state", function ($scope, accountSetupServ, $state) {
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
    $scope.addChild = function () {
        $scope.customerObj.children.push({ name: '', birthdate: '' });
    };

    $scope.removeChild = function (index) {
        $scope.customerObj.children.splice(index, 1);
    };

    $scope.addCustomers = function (customerObj) {
        accountSetupServ.addCustomers(customerObj).then(function (response) {
            $scope.parent = response;
            $state.go('myaccount');
        });
    };
}]);
// INITILIZE SERVICE
// ============================================================
angular.module("musApp").service("accountSetupServ", ["$http", function ($http) {
  // CRUD FUNCTIONS
  // ============================================================
  this.addCustomers = function (customerObj) {
    return $http({
      method: 'POST',
      url: '/updateUser',
      data: customerObj
    }).then(function (response) {
      return response;
    });
  };
}]);
angular.module('musApp').directive('footerDirective', function () {
  return {
    templateUrl: './app/component/views/footer/footer-tmpl.html',
    restrict: 'EA',
    controller: ["$scope", "footerServ", function ($scope, footerServ) {
      $scope.addEmail = function (email) {
        footerServ.addEmail(email).then(function (response) {
          alert("thanks for joining " + response.data.email);
          //TODO: alert when email is already entered
        });
      };
    }]
  };
});
angular.module("musApp").service("footerServ", ["$http", function ($http) {

  this.addEmail = function (email) {
    console.log('footerServ', email);
    return $http({
      method: 'POST',
      url: '/mailinglist',
      data: { email: email }
    });
  };
}]);
angular.module('musApp').controller('loginCtrl', ["$scope", "myAccountServ", function ($scope, myAccountServ) {

	$scope.currentUserSignedIn = false;

	$scope.login = function () {
		var onSuccessCallback = function (data) {
			currentUserSignedIn = true;
		};
	};

	$scope.getUser = function () {
		myAccountServ.getCurrentUser().then(function (response) {
			response ? $scope.currentUserSignedIn = true : $scope.currentUserSignedIn = false;
		});
	}();
}]);
angular.module('musApp').directive('navDirective', function () {
  return {
    templateUrl: './app/component/views/main-nav/main-nav-tmpl.html',
    restrict: 'EA',
    controller: 'loginCtrl',
    link: function (elem, attr, scope) {

      $(document).ready(function () {
        $(window).scroll(function () {
          // $('#myModal').appendTo("body").modal('show');
          var y = document.body.scrollTop;
          if (y >= 228) {
            $(".menu-container").css({ "position": "fixed", "top": "0  ", "box-shadow": "0 6px 20px 0 rgba(0, 0, 0, 0.19)" });
          } else {
            $(".menu-container").css({ "position": "inherit" });
          }
        });
      });
    }
  };
});
angular.module("musApp").filter('ageFilter', function () {
      function calculateAge(birthday) {
            // birthday is a date
            var try1 = moment().diff(birthday);
            var try2 = moment(birthday, "YYYY").fromNow();
            console.log(try1);
            console.log(try2);
            var birthdayDate = new Date(birthday);
            var ageDifMs = new Date() - birthdayDate;
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
      }

      return function (birthdate) {

            var age = calculateAge(birthdate);
            if (age === 0) {
                  return moment(birthdate, "YYYY").fromNow().split(' ').shift() + " months old";
            } else if (age == 1) return age + ' year old';else return age + ' years old';
      };
});
angular.module("musApp").controller("myAccountCtrl", ["$scope", "myAccountServ", "$rootScope", "$state", function ($scope, myAccountServ, $rootScope, $state) {

    $scope.getCurrentUser = function () {
        myAccountServ.getCurrentUser().then(function (response, $rootScope) {
            $scope.parent = response;
        });
    }();

    $scope.getClassSchedule = function () {
        myAccountServ.getClassSchedule().then(function (response) {
            $scope.schedule = response;
        });
    }();

    //This adds scope to the models in the register tab
    $scope.addClassToScope = function (course) {
        $scope.course = course;
    };

    $scope.addChildToCourse = function (course, child) {
        console.log(child);

        var data = {
            // TODO: HELP THIS IS WHERE THE PROBLEM IS
            course: course.toString(),
            child: child.c_id.toString()
        };

        //ADDING COST INTO THE EQUALTION
        myAccountServ.addChildToCourse(data).then(function (response) {
            alert('thank you for registering');
        });
    };

    $scope.logout = function () {
        myAccountServ.logout().then(function (response) {
            $rootScope.currentUserSignedIn = false;
            $state.go('home');
        });
    };
}]);
// INITILIZE SERVICE
// ============================================================
angular.module("musApp").service("myAccountServ", ["$http", function ($http) {
  // CRUD FUNCTIONS
  // ============================================================

  this.getCurrentUser = function () {
    return $http({
      method: 'GET',
      url: '/me'
    }).then(function (response) {
      return response.data;
    });
  };

  this.getClassSchedule = function () {
    return $http({
      method: 'GET',
      url: '/classSchedule'
    }).then(function (response) {
      return response.data;
    });
  };

  this.addChildToCourse = function (data) {
    return $http({
      method: 'PUT',
      url: '/addToCourse',
      data: data
    }).then(function (response) {});
  };

  this.logout = function () {
    return $http({
      method: 'GET',
      url: '/logout'
    }).then(function (response) {
      return response;
    });
  };
}]);
angular.module('musApp').directive('accountNavDirective', function () {
    return {
        templateUrl: './app/component/views/myAccount/account-nav/account-nav.html',
        restrict: 'EA',
        controller: 'myAccountCtrl'
    };
});
// // INITILIZE CONTROLLER
// // ============================================================
// angular.module("musApp").controller("registerCtrl", function($scope, registerServ) {
//   // VARIABLES
//   // ============================================================
// //USE THIS CONTROLLER IF YOU NEED TO DO ANYTHING IN TH REGISTER.html
// //YOU WILL HAVE TO DO A NG-CONTROLLER ON WHATEVER YOU USE.
// //DIV NG-CONTROLLER registerCtrl EXAMPLE
//
// });
angular.module('musApp').directive('registerDirective', function () {
    return {
        templateUrl: './app/component/views/myAccount/register/register.html',
        restrict: 'EA',
        controller: 'myAccountCtrl'
    };
});
// // INITILIZE SERVICE
// // ============================================================
// angular.module("musApp").service("registerServ", function($http) {
//   // CRUD FUNCTIONS
//   // ============================================================
//
//   // OTHER FUNCTIONS
//   // ============================================================
//
// });