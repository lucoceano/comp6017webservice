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
        models.question = db.define("question", {
            id: Number,
            message: String
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
        return err ? statusCode.internalError(err, res) : statusCode.created(res);
    });
};

/**
 * Get all questions
 */
exports.allQuestions = function (req, res) {
    "use strict";
    return req.models.question.find(function (err, questions) {
        if (err) {
            return statusCode.notFound(err, res);
        }
        if (questions.length === 0) {
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
        return err ? statusCode.notFound(err, res) : res.send(questions);
    });
};

/**
 * Delete a question by id
 */
exports.deleteById = function (req, res) {
    "use strict";
    return req.models.question.get(req.params.id, function (err, question) {
        if (err) {
            return statusCode.notFound(err, res);
        }
        return question.remove(function (err) {
            if (err) {
                return statusCode.internalError(err, res);
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
            return statusCode.notFound(err, res);
        }

        if (req.body.message) {
            question.message = req.body.message;
        }

        question.save(function (err) {
            if (err) {
                return statusCode.internalError(err, res);
            }
            return statusCode.ok(res);
        });
    });
};
