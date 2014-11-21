'use strict';

angular.module('myAppRename.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$http', 'DataFactory', 'WikiFactory', function ($scope, $http, DataFactory, WikiFactory) {
        $scope.DataFactory = DataFactory;
        $scope.WikiFactory = WikiFactory;

        $scope.searchString = "";
        $scope.miniWikis = "";

        $scope.presentWiki = function (miniWiki) {
            $scope.DataFactory.setCurrentMiniWiki(miniWiki)
        };

        $scope.findWiki = function () {
            $scope.WikiFactory.findWiki($scope.searchString).
                success(function (data, status, headers, config) {
                    $scope.miniWikis = data;
                }).
                error(function (data, status, headers, config) {
                    //error = data;
                });
            ;
        };
    }]);