angular.module('campApp', ['ui.router'])
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state
	('home', {
    url: '/',
    templateUrl: './views/home.html'
   })
  .state('about', {
    url: '/about',
    templateUrl: './views/about.html'
   })
   .state('detox', {
    url: '/detox',
    templateUrl: './views/detox.html'
   })
  //  .state('registration', {
  //   url: '/registration',
  //   templateUrl: './views/registration.html'
  //  })
}])

angular.module('campApp').controller('mainCtrl', ["$scope", function($scope){
	$scope.name = 'jesse';	
}])
angular.module('campApp')
.directive('footerDirective', function(){
  return{
    templateUrl: './views/footer-tmpl.html',
    restrict: 'EA'
  }
})
angular.module('campApp')
    .directive('headerDirective', function() {
        return {
            templateUrl: './views/header-tmpl.html',
            restrict: 'EA',
            controller: function() {

                $(document).ready(function() {
                  var windowsize = $(window).width();

                  $('.hamburger').on('click', (function() {
                      $('.small-menu').slideToggle('slow');
                  }));
                  $('.small-menu').on('resize', function(){
                    if(windowsize > 618){
                      $('.small-menu').hide()
                    }
                  })

                })

            }
        }
    })
