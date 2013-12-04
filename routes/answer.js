/**
 * Created by lucoceano on 04/12/2013.
 */
var express = require("express"),
    orm = require('orm'),
    statusCode = require('./status');

var app = express();


app.use(orm.express("sqlite://storage.db", {
    define: function (db, models, next) {
        "use strict";

        models.answer = db.define("answer", {
            id: Number,
            message: String,
            question: Number
        });

        next();
    }
}));

/**
 * Create a answer
 */
exports.createAnswer = function (req, res) {
    "use strict";
    return req.models.answer.create([
        {
            id: req.body.id,
            message: req.body.message,
            question: req.body.question
        }
    ], function (err) {
        return err ? statusCode.internalError(err, res) : statusCode.created(res);
    });
};

/**
 * Get all answer
 */
exports.allAnswer = function (req, res) {
    "use strict";
    return req.models.answer.find(function (err, answers) {
        if (err) {
            return statusCode.notFound(err, res);
        }
        if (answers.length === 0) {
            return statusCode.noContent(res);
        }
        return res.send(answers);
    });
};

/**
 * find answer by id
 */
exports.answerById = function (req, res) {
    "use strict";
    return req.models.answer.get(req.params.id, function (err, answer) {
        return err ? statusCode.notFound(err, res) : res.send(answer);
    });
};

/**
 * Delete a answer by id
 */
exports.deleteById = function (req, res) {
    "use strict";
    return req.models.answer.get(req.params.id, function (err, answer) {
        if (err) {
            return statusCode.notFound(err, res);
        }

        return answer.remove(function (err) {
            if (err) {
                return statusCode.internalError(err, res);
            }
            return statusCode.ok(res);
        });
    });
};

/**
 * update a answer by id
 */
exports.updateAnswer = function (req, res) {
    "use strict";
    return req.models.answer.get(req.params.id, function (err, answer) {
        if (err) {
            return statusCode.notFound(err, res);
        }

        if (req.body.message) {
            answer = req.body.message;
        }
        if (req.body.question) {
            answer.question = req.body.question;
        }

        answer.save(function (err) {
            if (err) {
                return statusCode.internalError(err, res);
            }
            return statusCode.ok(res);
        });
    });
};

/**
 * get the answers of a question with it id
 */
exports.answerOfQuestionById = function (req, res) {
    "use strict";
    req.models.answer.find({question: req.params.id}, function (err, answers) {
        if (err) {
            return statusCode.notFound(err, res);
        }
        if (answers.length === 0) {
            return statusCode.noContent(res);
        }
        return res.send(answers);
    });
};
