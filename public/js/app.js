angular.module('campApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
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
})
