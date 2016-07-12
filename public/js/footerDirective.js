angular.module('campApp')
.directive('footerDirective', function(){
  return{
    templateUrl: './views/footer-tmpl.html',
    restrict: 'EA'
  }
})
