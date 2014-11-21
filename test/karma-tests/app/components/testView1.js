describe('View1Ctrl', function() {
    var $scope;

    beforeEach(module('myAppRename.view1'));

    //Mocks for the test
    beforeEach(module({
        WikiFactory: { findWiki: function() {return  "hh"; }},
        DataFactory: { presentWiki: function() {return  "hh"; }}
    }));

    beforeEach(inject(function($rootScope, $controller) {
        $scope = $rootScope.$new();
        $controller('View1Ctrl', {$scope: $scope});
    }));

    it('Should have the value wiki factory', function () {
        expect($scope.WikiFactory.findWiki('hh')).toBe('hh');
    });
    it('Should have the value data factoryy', function () {
        expect($scope.DataFactory.presentWiki('hh')).toBe('hh');
    });


});