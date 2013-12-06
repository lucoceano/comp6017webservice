/**
 * Created by lucoceano on 06/12/2013.
 */

module.exports = function (db, cb) {
    "use strict";

    db.question = db.define("question", {
        id: Number,
        message: String
    });

    db.answer = db.define("answer", {
        id: Number,
        message: String,
        question: Number
    });

    db.comment = db.define("comment", {
        id: Number,
        message: String,
        question: Number,
        answer: Number
    });

    return cb();
};