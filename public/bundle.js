angular.module('campApp', ['ui.router'])
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state
	('home', {
    url: '/',
    templateUrl: './public/views/home.html'
   })
  .state('about', {
    url: '/about',
    templateUrl: './public/views/about.html'
   })
   .state('detox', {
    url: '/detox',
    templateUrl: './public/views/detox.html'
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
    templateUrl: './public/views/footer-tmpl.html',
    restrict: 'EA'
  }
})

angular.module('campApp')
    .directive('headerDirective', function() {
        return {
            templateUrl: './public/views/header-tmpl.html',
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
