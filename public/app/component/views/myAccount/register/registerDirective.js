angular.module('musApp')
    .directive('registerDirective', function() {
        return {
            templateUrl: './app/component/views/myAccount/register/register.html',
            restrict: 'EA',
            controller: 'myAccountCtrl'
        };

    });
