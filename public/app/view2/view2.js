'use strict';

angular.module('myAppRename.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'app/view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', ['$scope', '$http', 'DataFactory', 'WikiFactory', function ($scope, $http, DataFactory, WikiFactory) {
        $scope.DataFactory = DataFactory;
        $scope.WikiFactory = WikiFactory;

        $scope.currentMiniWiki = $scope.DataFactory.getCurrentMiniWiki();


        $scope.presentCategory = function (category) {
            $scope.DataFactory.setCurrentCategory(category)
        };


        $scope.WikiFactory.getWiki($scope.currentMiniWiki.title).
            success(function (data, status, headers, config) {
                $scope.currentWiki = data[0];

            }).
            error(function (data, status, headers, config) {
                //error = data;
            });


    }]);
