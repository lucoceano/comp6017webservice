/**
 * Students are expected to make use of the full abilities of CRUD (Create,
 * Retrieve, Update, Delete) and develop a RESTful service that accommodates all
 * core HTTP verbs (PUT, POST, GET, HEAD, DELETE). Additionally students should
 * show competent use of a number of HTTP status codes (other than 2XX, 404 and
 * 500). The service should enable discovery of collections composed of one
 * question and zero or more answers from a starting URI. Any question or answer
 * can have comments attached to it. The services should enable the creation of
 * questions, answers and comments, as well as the update and deletion of these
 * items. All content should be provided in JSON format.
 */


var express = require("express"),
    path = require("path"),
    orm = require('orm');

var app = express.createServer();

app.get('/question', function (req, res) {
    res.send('Ecomm API is running');
});

// Launch server

app.listen(4242);


//var
//
//var app = express();
//
//orm.connect('sqlite://storage.db', function (err, db) {
//    if (err) {
//        console.log('ERROR: ' + err);
//    }
//
//    var User = db.define("user", {
//        id: Number,
//        name: String
//    });
//
//    User.create([
//        {
//            id: 3,
//            name: "John"
//        },
//        {
//            id: 2,
//            name: "Liza"
//        }
//    ], function (err, items) {
//        if (err) {
//            console.log("ERRO: " + err);
//        }
//    });
//
//    User.get(2, function (err, user) {
//
//        console.log("Searching...");
//        console.log("User found: %s", user.name);
//
//    });
//});