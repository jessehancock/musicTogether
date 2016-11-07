angular.module('musApp')
    .directive('editaccountDirective', function() {
        return {
            templateUrl: './app/component/views/myAccount/editaccount/editaccount.html',
            restrict: 'EA',
            controller: 'myAccountCtrl'
        };

    });
