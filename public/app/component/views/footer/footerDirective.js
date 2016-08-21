angular.module('musApp')
.directive('footerDirective', function(){
  return{
    templateUrl: './app/component/views/footer/footer-tmpl.html',
    restrict: 'EA'
  };
});
