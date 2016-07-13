angular.module('campApp')
.directive('footerDirective', function(){
  return{
    templateUrl: './public/views/footer-tmpl.html',
    restrict: 'EA'
  }
})
