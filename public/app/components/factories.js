'use strict';

/* Factories */

angular.module('myAppRename.factories', [])
    .factory('DataFactory', function () {
        var currentMiniWiki;
        var currentCategory;

        var setCurrentCategory = function setCurrentCategory(category) {
            currentCategory = category
        }
        var getCurrentCategory = function getCurrentCategory() {
            return currentCategory;
        }

        var setCurrentMiniWiki = function setCurrentWiki(miniWiki) {
            currentMiniWiki = miniWiki
        }
        var getCurrentMiniWiki = function getCurrentMiniWiki() {
            console.log(currentMiniWiki)
            return currentMiniWiki;
        }

        return {
            setCurrentCategory: setCurrentCategory,
            getCurrentCategory: getCurrentCategory,
            setCurrentMiniWiki: setCurrentMiniWiki,
            getCurrentMiniWiki: getCurrentMiniWiki
        }
    }).


    factory('WikiFactory', ['$http', function ($http) {

        var findWiki = function findWiki(searchString) {
            return $http({
                method: 'GET',
                url: 'api/search/' + searchString
            })
        }

        var getWiki = function getWiki(title) {
            return $http({
                method: 'GET',
                url: 'api/wiki/' + title
            })
        }

        var getMiniWikisByCat = function getMiniWikisByCat(category) {
            return $http({
                method: 'GET',
                url: 'api/search/category/' + category
            })
        }

        var getAllCategories = function getAllCategories(category) {
            return $http({
                method: 'GET',
                url: 'api/categories'
            })
        }

        return {
            findWiki: findWiki,
            getWiki: getWiki,
            getMiniWikisByCat: getMiniWikisByCat,
            getAllCategories: getAllCategories
        }
    }]);
;