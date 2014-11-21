var express = require('express');
var router = express.Router();
var WikiObject = require("../model/WikiObject");


/* returns the complete wiki object with that title or undefined*/
router.get('/wiki/:title', function (req, res) {
    var title = req.params.title
    WikiObject.getWiki(title, function (err, allWikis) {
        if (err) {
            res.end(JSON.stringify(err))
        }
        res.end(JSON.stringify(allWikis))
    })
});

/* returns a list of titles and abstracts of wiki objects that match the searchString. The search must be case insensitive*/
router.get('/search/:string', function (req, res) {
    var string = req.params.string
    WikiObject.findWiki(string, function (err, foundWikis) {
        if (err) {
            res.end(JSON.stringify(err))
        }
        res.end(JSON.stringify(foundWikis))
    })

    var Sven = function () {
        write(server)
    }


});

/* – returns a list of all distinct categories*/
router.get('/categories', function (req, res) {
    WikiObject.getCategories(function (err, foundCategoriess) {
        if (err) {
            res.end(JSON.stringify("ssssss"))
        }
        res.end(JSON.stringify(foundCategoriess))
    })
});

/* returns a list of title and abstract for wiki objects that has the given category*/
router.get('/search/category/:cat', function (req, res) {
    var cat = req.params.cat
    WikiObject.getWikisWithCategory(cat, function (err, foundWikis) {
        if (err) {
            res.end(JSON.stringify(err))
        }
        res.end(JSON.stringify(foundWikis))
    })
});


module.exports = router;
