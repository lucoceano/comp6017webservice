/**
 * Created by Lucas Oceano Martins on 05/12/2013.
 */

var should = require('should'),
    request = require('supertest'),
    winston = require('winston'),
    express = require("express"),
    assert = require("assert"),
    orm = require('orm'),
    statusCode = require('../routes/status');

var app = express();
var myModels;

var url = 'http://localhost:4242',
    testQuestion,
    question = {
        id: 1,
        message: 'test question 1'
    },
    answer = {
        id: 1,
        message: 'test answer 1',
        question: 1
    },
    comment = {
        id: 1,
        message: 'test comment 1',
        answer: 1,
        question: null
    };


describe('Routing', function () {
    "use strict";

    before(function (done) {

        app.use(orm.express('sqlite://storage.db', {
            define: function (db, models) {

                db.load("../routes/models", function (err) {
                    if (err) {
                        throw err;
                    }

                    models.question = db.models.question;
                    models.answer = db.models.answer;
                    models.comment = db.models.comment;

                });

                models.question.find(function (err, questions) {
                    if (questions.length > 0) {
                        question = questions[questions.length - 1];
                        var newId = question.id + 1;
                        question = {
                            id: newId,
                            message: question.message.replace(question.id.toString(), newId.toString())
                        };
                    }
                });


                models.answer.find(function (err, answers) {
                    if (answers.length > 0) {
                        answer = answers[answers.length - 1];
                        var newId = answer.id + 1;
                        answer = {
                            id: newId,
                            message: answer.message.replace(answer.id.toString(), newId.toString()),
                            question: answer.question
                        };
                    }
                });


                models.comment.find(function (err, comments) {
                    if (comments.length > 0) {
                        comment = comments[comments.length - 1];
                        var newId = comment.id + 1;
                        comment = {
                            id: newId,
                            message: comment.message.replace(comment.id.toString(), newId.toString()),
                            question: comment.question,
                            answer: comment.answer
                        };
                    }

                    myModels = models;
                    done();
                });


                testQuestion = {
                    id: question.id + 20,
                    message: "no answer question"
                };

            }
        }));
    });

    /**
     * Including Statements
     */
    describe('Including', function () {
        it('Should include a question into the database', function (done) {
            request(url)
                .post('/question')
                .send(question)
                .end(function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                    res.should.have.status(statusCode.statusCode.created);
                    done();
                });
        });


        it('Should include a answer into the database', function (done) {
            request(url)
                .post('/answer')
                .send(answer)
                .end(function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                    res.should.have.status(statusCode.statusCode.created);
                    done();
                });
        });

        it('Should include a comment into the database', function (done) {
            request(url)
                .post('/comment')
                .send(comment)
                .end(function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                    res.should.have.status(statusCode.statusCode.created);
                    done();
                });
        });

    });

    /**
     * Getting statements
     */
    describe('Getting', function () {

        it('Should get all question from data base', function (done) {
            request(url)
                .get('/question')
                .expect(statusCode.statusCode.ok)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    myModels.question.find(function (err, questions) {
                        if (err) {
                            throw err;
                        }
                        res.body.length.should.equal(questions.length);
                        done();
                    });

                });
        });

        it('Should get all answer from data base', function (done) {
            request(url)
                .get('/answer')
                .expect(statusCode.statusCode.ok)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    myModels.answer.find(function (err, answers) {
                        if (err) {
                            throw err;
                        }
                        res.body.length.should.equal(answers.length);
                        done();
                    });

                });
        });


        it('Should get all comment from data base', function (done) {
            request(url)
                .get('/comment')
                .expect(statusCode.statusCode.ok)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    myModels.comment.find(function (err, comments) {
                        if (err) {
                            throw err;
                        }

                        res.body.length.should.equal(comments.length);
                        done();
                    });

                });
        });
    });


    /**
     * Getting statements
     */
    describe('Getting One by One', function () {

        it('Should get a question from data base', function (done) {
            request(url)
                .get('/question/' + question.id)
                .expect(statusCode.statusCode.ok)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    myModels.question.get(question.id, function (err, question) {
                        if (err) {
                            throw err;
                        }
                        res.body.should.eql(question);
                        done();
                    });

                });
        });

        it('Should get a answer from data base', function (done) {
            request(url)
                .get('/answer/' + answer.id)
                .expect(statusCode.statusCode.ok)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    myModels.answer.get(answer.id, function (err, answer) {
                        if (err) {
                            throw err;
                        }
                        res.body.should.eql(answer);
                        done();
                    });

                });
        });


        it('Should get a comment from data base', function (done) {
            request(url)
                .get('/comment/' + comment.id)
                .expect(statusCode.statusCode.ok)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    myModels.comment.get(comment.id, function (err, comment) {
                        if (err) {
                            throw err;
                        }
                        res.body.should.eql(comment);

                        done();
                    });

                });
        });
    });

    /**
     * Updating statements
     */
    describe('Updating', function () {
        it('Should correctly update an existing question', function (done) {
            question.message = question.message.replace("!", " updated!");
            request(url)
                .put('/question/' + question.id)
                .send(question)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(statusCode.statusCode.ok);
                    done();
                });
        });


        it('Should correctly update an existing answer', function (done) {
            answer.message = answer.message.replace("!", " updated!");
            request(url)
                .put('/answer/' + answer.id)
                .send(answer)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(statusCode.statusCode.ok);
                    done();
                });
        });


        it('Should correctly update an existing comment', function (done) {
            comment.message = comment.message.replace("!", " updated!");
            request(url)
                .put('/comment/' + comment.id)
                .send(comment)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(statusCode.statusCode.ok);
                    done();
                });
        });
    });


    /**
     * Deleting statements
     */
    describe('Deleting', function () {

        it('Should delete a comment from database', function (done) {
            request(url)
                .del('/comment/' + comment.id)
                .expect(statusCode.statusCode.ok)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });


        it('Should delete a answer from database', function (done) {
            request(url)
                .del('/answer/' + answer.id)
                .expect(statusCode.statusCode.ok)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });

        it('Should delete a question from database', function (done) {
            request(url)
                .del('/question/' + question.id)
                .expect(statusCode.statusCode.ok)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });
    });
});


/**
 * Status Code Statements
 */
describe('StatusCode', function () {

    it('Should receive StatusCode 500 Internal Error', function (done) {
        request(url)
            .post('/answer')
            .send(question)
            .expect(statusCode.statusCode.internalError)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                }
                done();
            });
    });


    it('Should receive StatusCode 404 Not Found', function (done) {
        request(url)
            .get('/answer/' + answer.id + 10)
            .expect(statusCode.statusCode.notFound)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                }
                done();
            });
    });


//    it('Should fail to receive StatusCode 304 Not Modified', function (done) {
//        request(url)
//            .put('/comment/' + comment.id)
//            .send(question)
//            .expect(statusCode.statusCode.notModified)
//            .end(function (err, res) {
//                if (err) {
//                    throw err;
//                }
//                done();
//            });
//    });


    it('Should receive Status Code 201 Created', function (done) {
        request(url)
            .post('/question')
            .send(testQuestion)
            .expect(statusCode.statusCode.created)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                done();
            });
    });

    it('Should receive StatusCode 204 No Content', function (done) {

        request(url)
            .get('/question/' + testQuestion.id + '/answer')
            .expect(statusCode.statusCode.noContent)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                done();
            });
    });


    it('Should receive StatusCode 200 OK', function (done) {

        request(url)
            .del('/question/' + testQuestion.id)
            .expect(statusCode.statusCode.ok)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                done();
            });
    });

});