var mongoose = require('mongoose');
var dbURI;

//This is set by the backend tests
if (typeof global.TEST_DATABASE != "undefined") {
    dbURI = global.TEST_DATABASE;
}
else {
    dbURI = "mongodb://test:test@ds051750.mongolab.com:51750/ca4db";
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
    global.mongo_error = "Not Connected to the Database";
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});


/** WikiObject SCHEMA **/
var wikiObjectSchema = new mongoose.Schema({
    title: { type: String, index: true},
    url: { type: String},
    abstract: { type: String},
    categories: {type: [
        {type: String}
    ], index: true},
    headings: [
        {heading: {type: String}, position: {type: Number}}
    ],
    links: {type: [
        {type: String}
    ], index: true}
});
//a
mongoose.model('WikiObject', wikiObjectSchema,  'wiki');

