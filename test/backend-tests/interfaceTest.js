global.TEST_DATABASE = "mongodb://localhost/WikiTestDB";

var should = require("should");
var assert = require("assert")
var app = require("../../server/app");
var http = require("http");
var testPort = 9999;
var testServer;
var mongoose = require("mongoose");
var WikiObject = mongoose.model("WikiObject");

var request = require('request');

describe('Test interface for api/wiki', function () {
    var apiUrl = "http://localhost:"+testPort+"/api/";
    var testWiki1 = {
        "title":"test1title",
        "url":"test1url",
        "abstract":"test1abstract",
        "links":["test1links"],
        "headings":[
            {"heading":"test1h1","position":3},
            {"heading":"test1h2","position":2},
            {"heading":"test1h3","position":1},
            {"heading":"testh4","position":4}],
        "categories":["test2categories"]};
    var testWiki2 = {
        "title":"test2title",
        "url":"test2url",
        "abstract":"test2abstract",
        "links":["test2link1", "test2link2"],
        "headings":[
            {"heading":"test2headin1", "position":1},
            {"heading":"test2heading2 ", "position":4},
            {"heading":"test2heading3", "position":3},
            {"heading":"test2heading4", "position":2}],
        "categories":["test2categories"]};
    var testWiki3 = {
        "title":"test3title",
        "url":"test3url",
        "abstract":"test3abstract",
        "links":["test3link1", "test3link2"],
        "headings":[
            {"heading":"test3headin1", "position":1},
            {"heading":"test3heading2 ", "position":4},
            {"heading":"test3heading3", "position":3},
            {"heading":"test3heading4", "position":2}],
        "categories":["mtfr"]};


    var titleForWiki1, titleForWiki2, cat1, cat2, cat3, titleForWiki3;
    //Start the server before the TESTS
    before(function (done) {
        testServer = app.listen(testPort, function () {
            console.log("Server is listening on: " +testPort + " ");
            done();
        })
            .on('error', function(err){
                console.log(err);
            });
    });
    //Inserts two test wikis and get their id's created by the database
    beforeEach(function(done){
        WikiObject.remove({}, function () {
            WikiObject.create(testWiki1)
                .then(function(wiki1) {
                    titleForWiki1 = wiki1.title;
                    cat1 = wiki1.categories;
                    WikiObject.create(testWiki2)
                        .then(function(wiki2) {
                            titleForWiki2 = wiki2.title;
                            cat2 = wiki2.categories;
                            WikiObject.create(testWiki3)
                                .then(function (wiki3) {
                                    titleForWiki3 = wiki3.title;
                                    cat3 = wiki3.categories;
                                    done();
                                })
                        })

                })
        });
    });

    after(function(){
        //Stop server after the test
        mongoose.connection.db.dropDatabase();
        testServer.close();
    });

    //Test1
    it ("Should get a single wikiobject", function(done) {
        var url = apiUrl+"wiki/"+titleForWiki1;
        request.get(url, function(error, response, body) {
            response.statusCode.should.equal(200);
            var wikiObj1 = JSON.parse(body); //When using the shortcut methods in the request module we need to parse result into a javascript object
            if(wikiObj1[1] === undefined) {
                wikiObj1[0].title.should.equal(titleForWiki1);
                done();
            }
        });
    });

    //Test2
    it ("should return a list of titles and abstracts that match the searchString", function(done) {

        request.get(apiUrl +"/search/test2title", function (error, response, body) {
            response.statusCode.should.equal(200);
            var wikiList = JSON.parse(body);

            wikiList.length.should.equal(1);
            wikiList[0].title.should.equal("test2title");
            wikiList[0].abstract.should.equal("test2abstract");
            done();
        });
    });

    //Test 3 Artur
    it("Should get a list of categories", function (done) {
        var url = "http://localhost:" + testPort + "/api/categories";
        request.get(url, function (error, response, body) {
            var list = JSON.parse(body);

            response.statusCode.should.equal(200);
            assert.notEqual(list[0], list[1])
            list[0].should.equal("mtfr")
            list[1].should.equal("test2categories")
            done();
        })
    })

    //Test4 Artur
    it("Should get list of title and abstracs for specific wiki", function (done) {
        var url = "http://localhost:"+ testPort + "/api/search/category/mtfr";
        request.get(url, function (error, response, body) {
            var list = JSON.parse(body)
            response.statusCode.should.equal(200);
                assert.equal(list.length,[1])
            console.log(list)

            done();
        })

    });

});
