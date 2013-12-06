/**
 * Created by Lucas Oceano Martins on 04/12/2013.
 */


exports.statusCode = {
    ok: 200,
    created: 201,
    noContent: 204,
    notModified: 304,
    notFound: 404,
    internalError: 500
};

exports.ok = function (response) {
    "use strict";
    response.send(exports.statusCode.ok);
};

exports.created = function (response) {
    "use strict";
    response.send(exports.statusCode.created);
};

exports.noContent = function (response) {
    "use strict";
    response.send(exports.statusCode.noContent);
};

exports.notModified = function (response) {
    "use strict";
    response.send(exports.statusCode.notModified);
};

exports.notFound = function (response) {
    "use strict";
    response.send(exports.statusCode.notFound);
};

exports.internalError = function (response) {
    "use strict";
    response.send(exports.statusCode.internalError);
};