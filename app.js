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

app.use(express.bodyParser());

app.use(orm.express('sqlite://storage.db', {
    define: function (db, models, next) {

        models.question = db.define("question", {
            id: Number,
            message: String
        });

        models.answer = db.define("answer", {
            id: Number,
            message: String,
            question: Number
        });

        models.comment = db.define("comment", {
            id: Number,
            message: String,
            question: Number,
            answer: Number
        });

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


app.get('/question', function (req, res) {
    req.models.question.find(function (err, questions) {
        printOnScreen(questions, res);
    });
});


app.get('/question/:id', function (req, res) {
    req.models.question.get(req.params.id, function (err, questions) {
        if (err) {
            console.log("ERROR: " + err);
        } else {
            printOnScreen(questions, res);
        }
    });
});


app.get('/question/:id/answer', function (req, res) {
    req.models.answer.find({question: req.params.id}, function (err, answers) {
        if (err) {
            console.log("ERROR: " + err);
        } else {
            printOnScreen(answers, res);
        }
    });
});


app.get('/question/:id/comment', function (req, res) {
    req.models.comment.find({question: req.params.id}, function (err, comments) {
        if (err) {
            console.log("ERROR: " + err);
        } else {
            printOnScreen(comments, res);
        }
    });
});


app.get('/answer', function (req, res) {
    req.models.answer.find(function (err, answer) {
        printOnScreen(answer, res);
    });
});


app.get('/answer/:id', function (req, res) {
    req.models.answer.get(req.params.id, function (err, answer) {
        if (err) {
            console.log("ERROR: " + err);
        } else {
            printOnScreen(answer, res);
        }
    });
});


app.get('/answer/:id/comment', function (req, res) {
    req.models.comment.find({answer: req.params.id}, function (err, comments) {
        if (err) {
            console.log("ERROR: " + err);
        } else {
            printOnScreen(comments, res);
        }
    });
});


app.get('/comment', function (req, res) {
    req.models.comment.find(function (err, comments) {
        if (err) {
            console.log("ERROR: " + err);
        } else {
            printOnScreen(comments, res);
        }
    });
});

app.get('/comment/:id', function (req, res) {
    req.models.comment.get(req.params.id, function (err, comments) {
        printOnScreen(comments, res);

    });
});

app.delete('/question/:id', function (req, res) {
    req.models.question.find({id: req.params.id}, function (err, question) {
        if (question) {
            question[0].remove(function (err) {
                console.log("ERROR: " + err);
                console.log("REMOVED!");
            });
        }
    });
});

app.delete('/answer/:id', function (req, res) {
    req.models.answer.find({id: req.params.id}, function (err, answer) {
        answer[0].remove(function (err) {
            console.log("ERROR: " + err);
        });
    });
});


app.delete('/comment/:id', function (req, res) {
    req.models.comment.find({id: req.params.id}, function (err, comment) {
        comment[0].remove(function (err) {
            console.log("ERROR: " + err);
        });
    });
});


app.post('/question', function (req, res) {
    req.models.question.create([
        {
            id: req.body.id,
            message: req.body.message
        }
    ], function (err, items) {
        console.log("ERROR: " + err);
        console.log("Items: " + JSON.stringify(items));
    });

    printOnScreen("WORKED!", res);
});


app.post('/answer', function (req, res) {
    req.models.answer.create([
        {
            id: req.body.id,
            message: req.body.message,
            question: req.body.question
        }
    ], function (err, items) {
        console.log("ERROR: " + err);
    });

    printOnScreen("WORKED!", res);
});


app.post('/comment', function (req, res) {
    req.models.comment.create([
        {
            id: req.body.id,
            message: req.body.message,
            answer: req.body.answer,
            question: req.body.question
        }
    ], function (err, items) {
        console.log("ERROR: " + err);
    });

    printOnScreen("WORKED!", res);
});


app.listen(4242);