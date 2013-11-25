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

var myModels = new Array();

app.use(orm.express('sqlite://storage.db', {
    define: function (db, models, next) {
        models.user = db.define("user", {
            id: Number,
            name: String
        });

        models.question = db.define("question", {
            id: Number,
            message: String,
            user: Number
        });

        models.answer = db.define("answer", {
            id: Number,
            message: String,
            user: Number,
            question: Number
        });

        models.message = db.define("message", {
            id: Number,
            message: String,
            user: Number,
            doubt: Number
        });

        myModels['question'] = models.question;
        myModels['user'] = models.user;
        myModels['answer'] = models.answer;
        myModels['message'] = models.message;

        console.log("ModelName: " + JSON.stringify(models.question));

        next();
    }
}));

function printOnScreen(objects, res) {
    res.writeHead(200, {'Content-Type': 'text/plain' });
    if (objects) {
        res.write(JSON.stringify(objects));
    }
    res.end();
    console.log("Questions found: %s", JSON.stringify(objects));
}


app.get('/:modelName', function (req, res) {
    myModels[req.params.modelName].find(function (err, questions) {
        printOnScreen(questions, res);
    });
    console.log("ModelName: " + JSON.stringify(req.models.message));
});


//
//app.get('/question', function (req, res) {
//    req.models.question.find(function (err, questions) {
//        printOnScreen(questions, res);
//    });
//});
//
//
//app.get('/question/:id', function (req, res) {
//    req.models.question.get(req.params.id, function (err, questions) {
//        if (err) {
//            console.log("ERROR: " + err);
//        } else {
//            printOnScreen(questions, res);
//        }
//    });
//});
//
//app.get('/answer', function (req, res) {
//    req.models.answer.find(function (err, answer) {
//        printOnScreen(answer, res);
//    });
//});
//
//
//app.get('/answer/:id', function (req, res) {
//    req.models.answer.get(req.params.id, function (err, answer) {
//        if (err) {
//            console.log("ERROR: " + err);
//        } else {
//            printOnScreen(answer, res);
//        }
//    });
//});
//
//
//app.get('/user', function (req, res) {
//    req.models.user.find(function (err, users) {
//        printOnScreen(users, res);
//    });
//});
//
//app.get('/user/:id', function (req, res) {
//    req.models.user.get(req.params.id, function (err, users) {
//        printOnScreen(users, res);
//    });
//});
//
//
//app.get('/user/:id/question', function (req, res) {
//    req.models.question.find({user: req.params.id }, function (err, question) {
//        printOnScreen(question, res);
//    });
//});
//
//app.get('/user/:id/answer', function (req, res) {
//    req.models.answer.find({user: req.params.id}, function (err, answer) {
//        printOnScreen(answer, res);
//    });
//});
//
//app.get('/message', function (req, res) {
//    req.models.message.find(function (err, messages) {
//        if (err) {
//            console.log("ERROR: " + err);
//        } else {
//            printOnScreen(messages, res);
//        }
//    });
//});
//
//app.get('/message/:id', function (req, res) {
//    req.models.message.get(req.params.id, function (err, messages) {
//        printOnScreen(messages, res);
//
//    });
//});


//app.get(/^\/([a-zA-Z0-9_\.~-]+)\/(.*)/, function (req, res) {
//    res.writeHead(404, { 'Content-Type': 'text/plain' });
//    res.write("Nothing was found for [/mimi]");
//    res.end();
//
//    console.log("Not found");
//});

app.listen(4242);