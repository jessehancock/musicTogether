angular.module('campApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
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
})
