var mongoose = require('mongoose');
var db = require("./db");
var WikiObject = mongoose.model('WikiObject');

function getWiki(title, callback) {
    WikiObject.find({title: title}, function (err, wikis) {
        if (err) {
            return callback(err);
        }

        callback(null, wikis);
    });
}


function findWiki(string, callback) {
    WikiObject.find({title: { $regex: new RegExp(string, "i") }}, function (err, wikis) {
        if (err) {
            return callback(err);
        }
        var titleAndAbstract = new Array();
        wikis.forEach(function (wiki) {
            var e = {title: wiki.title, abstract: wiki.abstract}
            titleAndAbstract.push(e)
        });
        callback(null, titleAndAbstract);
    });
}

function getCategories(callback) {
    WikiObject.distinct(("categories"), function (err, wikis) {
        if (err) {
            return callback(err);
        }

        callback(null, wikis);
    });
}

function getWikisWithCategory(string, callback) {
    console.log(string)
    WikiObject.find({categories: string}, function (err, wikis) {
        if (err) {
            return callback(err);
        }

        var titleAndAbstract = new Array();
        wikis.forEach(function (wiki) {
            var e = {title: wiki.title, abstract: wiki.abstract}
            titleAndAbstract.push(e)
        });
        callback(null, titleAndAbstract);
    });
}

module.exports = {
    getWiki: getWiki,
    findWiki: findWiki,
    getCategories: getCategories,
    getWikisWithCategory: getWikisWithCategory
}