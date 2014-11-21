'use strict';

angular.module('myAppRename.view3', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'app/view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', ['$scope', '$http', 'DataFactory', 'WikiFactory', function ($scope, $http, DataFactory, WikiFactory) {
        $scope.DataFactory = DataFactory;
        $scope.WikiFactory = WikiFactory;

        $scope.currentCategory = $scope.DataFactory.getCurrentCategory();

        $scope.presentWiki = function (miniWiki) {
            $scope.DataFactory.setCurrentMiniWiki(miniWiki)
        };

        $scope.WikiFactory.getMiniWikisByCat($scope.currentCategory).
            success(function (data, status, headers, config) {
                $scope.miniWikis = data;
            }).
            error(function (data, status, headers, config) {
                //error = data;
            });

    }]);



