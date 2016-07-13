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
