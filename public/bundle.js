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
            birthdate: ''
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

          if (response.status === 200) {
            swal('Success', 'Thanks for joining our email list', 'success');
          } else {
            swal("Cancelled", "Your imaginary file is safe :)", "error");
          }
        });
      };
    }]
  };
});
angular.module("musApp").service("footerServ", ["$http", function ($http) {

  this.addEmail = function (email) {
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

        $(".myaccount-slidding-menu	").mouseenter(function () {
          $(".account-nav-container").slideDown('fast', 'linear');
          $('.login-nav-container').css('height', '25vh');
          $('.login-nav-container').css('margin-top', '14vh');
        });

        $(".myaccount-slidding-menu	").mouseleave(function () {
          $(".account-nav-container").slideToggle();
          $('.login-nav-container').css('height', '11vh');
          $('.login-nav-container').css('margin-top', '0');
        });

        $('[data-toggle="tooltip"]').tooltip();
      });
    }
  };
});
angular.module("musApp").filter('ageFilter', function () {

  //TODO Make math work right for months;
  function calculateAge(birthday) {
    // birthday is a date
    var birthdayDate = new Date(birthday);
    var ageDifMs = new Date() - birthdayDate;
    var ageDate = new Date(ageDifMs); // milliseconds from epoch
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

    $scope.addChildToCourse = function (course, child, parent) {
        var amount_due = 0;
        var childAge = new Date(child.birthdate);
        var age = moment(childAge).fromNow().split(' ');
        if (age[1] === 'year' || age[1] === 'years') {
            age[0] = 12;
        } else if (age[0] >= 9) {
            age[0] = 9;
        } else age[0] = 8;
        child.month_age = age[0];

        //THIS FUNCTION WILL CALCULATE COST
        cost(parent.children, parent.new_user); //calling cost function
        function cost(childArr, returning) {
            var regFee = 15;
            var totalCost = 145;

            childArr = childArr.sort(function (a, b) {
                return b.month_age - a.month_age;
            });

            for (var i = 1; i < childArr.length; i++) {
                if (childArr[i].schedule_id) if (childArr[i].month_age > 8) totalCost += 70;
            }

            if (returning) amount_due = totalCost;else amount_due = totalCost + regFee;
        }

        //PASSING THIS DATA TO THE BACK END
        var data = {
            course: course,
            child: child.c_id,
            month_age: child.month_age,
            amount_due: amount_due,
            parent_id: child.parent_id
        };

        //ADDING COST INTO THE EQUALTION
        myAccountServ.addChildToCourse(data).then(function (response) {

            $rootScope.amount_due = response.amount_due;
            swal('Awesome!', 'your total is now ' + response.amount_due, 'success');
        });
    };

    $scope.logout = function () {
        myAccountServ.logout().then(function (response) {
            $rootScope.currentUserSignedIn = false;
            $state.go('home');
        });
    };

    //this takes is on the editAccount
    $scope.addChild = function () {
        $scope.customerObj.children.push({ name: '', birthdate: '' });
    };

    $scope.remove = function (array, index) {
        array.splice(index, 1);
    };

    //

    //TEST STUFF TO SEE IF I CAN GET THIS TO WORK

    $scope.itemsToAdd = [{
        childName: '',
        birthdate: ''
    }];

    $scope.removeItemToAdd = function (itemToAdd, index) {
        console.log(itemToAdd, index);
        var index = $scope.itemsToAdd.indexOf(itemToAdd);
        $scope.itemsToAdd.splice(index, 1);
    };

    $scope.addNew = function () {
        $scope.itemsToAdd.push({
            childName: '',
            birthdate: ''
        });
    };

    $scope.editAccount = function (user, itemsToAdd) {
        var newKids = [];
        for (var i = 0; i < itemsToAdd.length; i++) {
            if (itemsToAdd[i].childName != "") newKids.push(itemsToAdd[i]);
        }
        // console.log(user, newKids);
        myAccountServ.updateUser(user, newKids).then(function (response, $rootScope) {
            swal('Awesome!', 'Your account has been updated', 'success');
        });
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
    }).then(function (response) {
      return response.data;
    });
  };

  this.updateUser = function (updatedUser, newKids) {
    for (var i = 0; i < newKids.length; i++) {
      updatedUser.children.push(newKids[i]);
    }
    return $http({
      method: 'PUT',
      url: '/editUser',
      data: updatedUser
    }).then(function (response) {
      console.log(response);
      return response.data;
    });
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
angular.module('musApp').directive('editaccountDirective', function () {
    return {
        templateUrl: './app/component/views/myAccount/editaccount/editaccount.html',
        restrict: 'EA',
        controller: 'myAccountCtrl'
    };
});
angular.module('musApp').directive('registerDirective', function () {
    return {
        templateUrl: './app/component/views/myAccount/register/register.html',
        restrict: 'EA',
        controller: 'myAccountCtrl'
    };
});