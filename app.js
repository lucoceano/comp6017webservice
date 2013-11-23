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

var app = express();


app.use(orm.express('sqlite://storage.db', {
    define: function (db, models, next) {
        models.user = db.define("user", {
            id: Number,
            name: String
        });

        models.doubt = db.define("doubt", {
            id: Number,
            message: String,
            user: Number,
            question: Number
        });

        models.message = db.define("message", {
            id: Number,
            message: String,
            user: Number,
            question: Number
        });

        next();
    }
}));


app.get('/question', function (req, res) {

    req.models.doubt.find(function (err, questions) {

        res.writeHead(200, {
            'Content-Type': 'text/plain' });
        res.write(JSON.stringify(questions));
        res.end();

        console.log("Questions found: %s", JSON.stringify(questions));

    });
});

app.get('/user', function (req, res) {

    req.models.user.find(function (err, users) {

        res.writeHead(200, {
            'Content-Type': 'text/plain' });
        res.write(JSON.stringify(users));
        res.end();

        console.log("Users found: %s", JSON.stringify(users));

    });
});


//app.get(/^\/([a-zA-Z0-9_\.~-]+)\/(.*)/, function (req, res) {
//    res.writeHead(404, { 'Content-Type': 'text/plain' });
//    res.write("Nothing was found for [/mimi]");
//    res.end();
//
//    console.log("Not found");
//});


// Launch server
app.listen(4242);