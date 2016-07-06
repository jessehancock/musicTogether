angular.module('campApp')
    .directive('headerDirective', function() {
        return {
            templateUrl: './views/header-tmpl.html',
            restrict: 'EA',
            controller: function($scope) {
              var width = $(window).width();
              if(width > 618)$('.header').css('height', '50px');



                $('.hamburger').on('click', function() {
                    var navHeight = $('.header').height();
                    if (navHeight === 0) {
                        $('.header').css('height', '170px');
                        $('.bump-padding').css('height', '170px');
                    } else {
                        $('.header').css('height', '0px');
                        $('.bump-padding').css('height', '47px');
                    }
                });

            }
        }
    })
