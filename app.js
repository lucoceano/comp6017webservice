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
    orm = require('orm');

var app = express();

var question = require('./routes/question'),
    answer = require('./routes/answer'),
    comment = require('./routes/comment'),
    statusCode = require('./routes/status');

app.use(express.bodyParser());

app.use(orm.express('sqlite://storage.db', {
    define: function (db, models, next) {
        "use strict";
        next();
    }
}));


/**
 * get statements
 */
app.get('/question', question.allQuestions);
app.get('/question/:id', question.questionById);
app.get('/question/:id/answer', answer.answerOfQuestionById);
app.get('/question/:id/comment', comment.commentsOfQuestionById);


app.get('/answer', answer.allAnswer);
app.get('/answer/:id', answer.answerById);
app.get('/answer/:id/comment', comment.commentsOfAnswerById);

app.get('/comment', comment.allComments);
app.get('/comment/:id', comment.commentById);

app.get('*', function (req, res) {
    "use strict";
    statusCode.notFound(res);
});

/**
 * delete statements
 */
app.delete('/question/:id', question.deleteById);
app.delete('/answer/:id', answer.deleteById);
app.delete('/comment/:id', comment.deleteById);

app.delete('*', function (req, res) {
    "use strict";
    statusCode.notFound(res);
});

/**
 * post statements
 */
app.post('/question', question.createQuestion);
app.post('/answer', answer.createAnswer);
app.post('/comment', comment.createComment);

app.post('*', function (req, res) {
    "use strict";
    statusCode.notFound(res);
});

/**
 * put statements
 */
app.put('/question/:id', question.updateQuestion);
app.put('/answer/:id', answer.updateAnswer);
app.put('/comment/:id', comment.updateComment);

app.put('*', function (req, res) {
    "use strict";
    statusCode.notFound(res);
});

app.listen(4242);
