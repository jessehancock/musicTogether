angular.module('musApp')
    .directive('accountNavDirective', function() {
        return {
            templateUrl: './app/component/views/myAccount/account-nav/account-nav.html',
            restrict: 'EA',
            controller: 'myAccountCtrl'
        };
    });
