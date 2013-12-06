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

        db.load("./models", function (err) {
            if (err) {
                throw err;
            }
            models.comment = db.models.comment;
        });

        next();
    }
}));


/**
 * Create a comment
 */
exports.createComment = function (req, res) {
    "use strict";
    return req.models.comment.create([
        {
            id: req.body.id,
            message: req.body.message,
            question: req.body.question,
            answer: req.body.answer
        }
    ], function (err) {
        return err ? statusCode.internalError(res) : statusCode.created(res);
    });
};

/**
 * Get all Comment
 */
exports.allComments = function (req, res) {
    "use strict";
    return req.models.comment.find(function (err, comments) {
        if (err) {
            return statusCode.notFound(res);
        }
        if (comments.length === 0) {
            return statusCode.noContent(res);
        }
        return res.send(comments);
    });
};

/**
 * find comment by id
 */
exports.commentById = function (req, res) {
    "use strict";
    return req.models.comment.get(req.params.id, function (err, comment) {
        return err ? statusCode.notFound(res) : res.send(comment);
    });
};

/**
 * delete a comment by id
 */
exports.deleteById = function (req, res) {
    "use strict";
    return req.models.comment.get(req.params.id, function (err, comment) {
        if (err) {
            return statusCode.notFound(res);
        }

        return comment.remove(function (err) {
            if (err) {
                return statusCode.internalError(res);
            }
            return statusCode.ok(res);
        });
    });
};

/**
 * Update a comment by id
 */
exports.updateComment = function (req, res) {
    "use strict";
    return req.models.comment.get(req.params.id, function (err, comment) {
        if (err) {
            return statusCode.notFound(res);
        }

        if (req.body.message) {
            comment.message = req.body.message;
        }
        if (req.body.question) {
            comment.question = req.body.question;
        }
        if (req.body.answer) {
            comment.answer = req.body.answer;
        }

        comment.save(function (err) {
            if (err) {
                return statusCode.notModified(res);
            }
            return statusCode.ok(res);
        });
    });
};


/**
 * Get the comments of a question with it id
 */
exports.commentsOfQuestionById = function (req, res) {
    "use strict";
    req.models.comment.find({question: req.params.id}, function (err, comments) {
        if (err) {
            return statusCode.notFound(res);
        }
        if (comments.length === 0) {
            return statusCode.noContent(res);
        }
        return res.send(comments);
    });
};

/**
 * get the comments of a answer with it id
 */
exports.commentsOfAnswerById = function (req, res) {
    "use strict";
    req.models.comment.find({answer: req.params.id}, function (err, comments) {
        if (err) {
            return statusCode.notFound(res);
        }
        if (comments.length === 0) {
            return statusCode.noContent(res);
        }
        return res.send(comments);
    });
};