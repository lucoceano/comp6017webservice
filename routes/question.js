/**
 * Created by Lucas Oceano Martins on 04/12/2013.
 */
var express = require("express"),
    orm = require('orm'),
    statusCode = require('./status');

var app = express();

app.use(orm.express("sqlite://storage.db", {
    define: function (db, models, next) {
        "use strict";

        db.load("./models", function (err) {
            if (err) {
                throw err;
            }
            models.question = db.models.question;
        });

        next();
    }
}));


/**
 * Create a question
 */
exports.createQuestion = function (req, res) {
    "use strict";
    return req.models.question.create([
        {
            id: req.body.id,
            message: req.body.message
        }
    ], function (err) {
        return err ? statusCode.internalError(res) : statusCode.created(res);
    });
};

/**
 * Get all questions
 */
exports.allQuestions = function (req, res) {
    "use strict";
    return req.models.question.find(function (err, questions) {
        if (err) {
            return statusCode.notFound(res);
        }
        if (questions.length === 0) {
            console.log("no Content!");
            return statusCode.noContent(res);
        }

        return res.send(questions);
    });
};

/**
 * Find question by id
 */
exports.questionById = function (req, res) {
    "use strict";
    return req.models.question.get(req.params.id, function (err, questions) {
        return err ? statusCode.notFound(res) : res.send(questions);
    });
};

/**
 * Delete a question by id
 */
exports.deleteById = function (req, res) {
    "use strict";
    return req.models.question.get(req.params.id, function (err, question) {
        if (err) {
            return statusCode.notFound(res);
        }
        return question.remove(function (err) {
            if (err) {
                return statusCode.internalError(res);
            }
            return statusCode.ok(res);
        });
    });
};

/**
 * update a question by id
 */
exports.updateQuestion = function (req, res) {
    "use strict";
    return req.models.question.get(req.params.id, function (err, question) {
        if (err) {
            return statusCode.notFound(res);
        }

        if (req.body.message) {
            question.message = req.body.message;
        }

        question.save(function (err) {
            if (err) {
                return statusCode.notModified(res);
            }
            return statusCode.ok(res);
        });
    });
};
