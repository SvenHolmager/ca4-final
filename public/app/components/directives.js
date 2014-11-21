'use strict';

/* Directives */
angular.module('myAppRename.directives', [])
    .directive("formatListing", function () {
        return {
            restrict: "EA",
            replace: true,
            templateUrl: 'listingTemplate.html'
        };
    })
    .directive("formatPresentation", function () {
        return {
            restrict: "EA",
            replace: true,
            templateUrl: 'presentingTemplate.html'
        };
    })
    .directive("formatCategoryListings", function () {
        return {
            restrict: "EA",
            replace: true,
            templateUrl: 'categoryListingTemplate.html'
        };
    })
    .directive('showonhoverparent', function () {

        return {
            link: function (scope, element) {
                element.parent().bind('mouseenter', function () {

                    var div = document.createElement('div');
                    div.id = 'presenter';
                    div.style.width = "500px";
                    div.style.backgroundColor = '#222222';
                    div.style.color = '#f5f5f5';

                    //position div
                    var x = event.x + document.body.scrollLeft;
                    var y = event.y + document.body.scrollTop;
                    var canvas = document.body;
                    x -= canvas.offsetLeft;
                    y -= canvas.offsetTop;
                    div.style.position = "absolute";
                    div.style.left = x + "px";
                    div.style.top = y + "px";
                    document.body.appendChild(div);


                    element.appendTo(div)
                    element.show();
                });

                element.parent().bind('mouseleave', function () {
                    element.hide();

                });

                element.parent().bind('mousedown', function () {
                    element.hide();
                });
            }

        }


    });
