'use strict';

describe('WikiFactory', function () {
  var mockBackend;
  var wikiF;
  var wikiForTest = {
    "title":"hh",
    "url":"test1url",
        "abstract":"test1abstract",
        "links":["test1links"],
        "headings":[
        {"heading":"test1h1","position":3},
        {"heading":"test1h2","position":2},
        {"heading":"test1h3","position":1},
        {"heading":"testh4","position":4}],
        "categories":["test2categories"]};

  beforeEach(module('myAppRename.factories'));

  //Mocks for the test
  beforeEach(inject(function ($httpBackend, WikiFactory) {
        mockBackend = $httpBackend;
        mockBackend.expectGET('api/categories').respond(wikiForTest);
        wikiF = WikiFactory;
      })
  );

  it('Gets a wiki obj as json', function () {
    wikiF.getAllCategories().success(function(aJoke){
      expect(JSON.stringify(aJoke)).toBe(JSON.stringify(wikiForTest));

    })
    mockBackend.flush();
  });
});

describe('WikiFactory', function () {
  var mockBackend;
  var factory;
  var wikiForTest = {title:"hh",
    url:"test1url",
    abstract:"test1abstract",
    links:["test1links"],
    headings:[{heading:"test1h1",position:3}],
    categories:["test2categories"]}

  beforeEach(module('myAppRename.factories'));

  //Mocks for the test
  beforeEach(inject(function ($httpBackend, WikiFactory) {
        mockBackend = $httpBackend;
        mockBackend.expectGET('api/wiki/' + wikiForTest.title).respond(wikiForTest);
        factory = WikiFactory;
      })
  );

  it('Should get a wiki object with specific title', function () {
    factory.getWiki("hh").success(function(aJoke){
      expect(JSON.stringify(aJoke)).toBe(JSON.stringify(wikiForTest));

    })
    mockBackend.flush();
  });
});

describe('WikiFactory', function () {
    var mockBackend;
    var wikiF;
    var wikiForTest = {
        "title":"aaaaaaaaaaaaaaaaaaaaaaaa",
        "url":"test1url",
        "abstract":"test1abstract",
        "links":["test1links"],
        "headings":[
            {"heading":"test1h1","position":3},
            {"heading":"test1h2","position":2},
            {"heading":"test1h3","position":1},
            {"heading":"testh4","position":4}],
        "categories":["test2categories"]};

    beforeEach(module('myAppRename.factories'));

    //Mocks for the test
    beforeEach(inject(function ($httpBackend, WikiFactory) {
            mockBackend = $httpBackend;
            mockBackend.expectGET('api/search/aaaaa').respond(wikiForTest);
            wikiF = WikiFactory;
        })
    );

    it('Gets a wiki obj as json', function () {
        wikiF.findWiki("aaaaa").success(function(aJoke){
            expect(JSON.stringify(aJoke)).toBe(JSON.stringify(wikiForTest));

        })
        mockBackend.flush();
    });
});

describe('WikiFactory', function () {
    var mockBackend;
    var wikiF;
    var wikiForTest = {
        "title":"aaaaaaaaaaaaaaaaaaaaaaaa",
        "url":"test1url",
        "abstract":"test1abstract",
        "links":["test1links"],
        "headings":[
            {"heading":"test1h1","position":3},
            {"heading":"test1h2","position":2},
            {"heading":"test1h3","position":1},
            {"heading":"testh4","position":4}],
        "categories":["test2categories"]};

    beforeEach(module('myAppRename.factories'));

    //Mocks for the test
    beforeEach(inject(function ($httpBackend, WikiFactory) {
            mockBackend = $httpBackend;
            mockBackend.expectGET('api/search/category/test2categories').respond(wikiForTest);
            wikiF = WikiFactory;
        })
    );

    it('Gets a wiki obj as json', function () {
        wikiF.getMiniWikisByCat("test2categories").success(function(aJoke){
            expect(JSON.stringify(aJoke)).toBe(JSON.stringify(wikiForTest));

        })
        mockBackend.flush();
    });
})


describe('DataFactory', function () {
    var mockBackend;
    var wikiF;


})



