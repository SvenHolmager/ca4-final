'use strict';

angular.module('myAppRename.view4', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view4', {
            templateUrl: 'app/view4/view4.html',
            controller: 'View4Ctrl'
        });
    }])

    .controller('View4Ctrl', ['$scope', '$http', 'DataFactory', 'WikiFactory', function ($scope, $http, DataFactory, WikiFactory) {
        $scope.predicate = "category"

        $scope.DataFactory = DataFactory;
        $scope.WikiFactory = WikiFactory;

        $scope.presentCategory = function (category) {
            $scope.DataFactory.setCurrentCategory(category)
        };


        $scope.scroll = function (anchor) {
            $('html, body').animate({
                scrollTop: $("#" + anchor).offset().top - 60
            }, 100);


        }

        $scope.internalAnchor = ""
        $scope.previousLetter = "";


        $scope.incr = function (category) {
            if (category.charAt(0) === " ") {
                $scope.currentFirstLetter = category.charAt(1).toUpperCase()
            } else {
                $scope.currentFirstLetter = category.charAt(0).toUpperCase()
            }

            if ($scope.currentFirstLetter != $scope.previousLetter) {
//                alert("letter changed from " + $scope.previousLetter + " to " + $scope.currentFirstLetter)
                $scope.previousLetter = $scope.currentFirstLetter
            }


            $scope.internalAnchor = "anchor" + $scope.previousLetter

        }

        $scope.WikiFactory.getAllCategories().
            success(function (data, status, headers, config) {
                $scope.allCategories = data
                $scope.filterCategories("A")

            }).
            error(function (data, status, headers, config) {
                //error = data;
            });

        $scope.filterCategories = function (letter) {
            $scope.filteredCategories = $scope.allCategories.filter(function (e) {
                if (e != null)
                    return e.charAt(0).toUpperCase() === letter.toUpperCase()
            });
        }

    }]);



