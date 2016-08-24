angular.module('musApp')
    .directive('navDirective', function() {
        return {
            templateUrl: './app/component/views/main-nav/main-nav-tmpl.html',
            restrict: 'EA',
            controller: function($scope, authService) {
                $scope.currentUserSignedIn = false;
                authService.getCurrentUser().then(function(response) {
                    if (response.data) $scope.currentUserSignedIn = true;
                    else $scope.currentUserSignedIn = false;
                });
            },
            link: function(elem, attr, scope) {

                $(document).ready(function() {
                  $(window).scroll(function() {
                    // $('#myModal').appendTo("body").modal('show');
                    var y = document.body.scrollTop;
                    if(y >= 228){
                      $(".menu-container").css({"position": "fixed", "top": "15", "box-shadow": "0 6px 20px 0 rgba(0, 0, 0, 0.19)"} );
                    }
                    else {
                      $(".menu-container").css({"position": "inherit"});
                    }

                  });
                });

            }
        };

    });
