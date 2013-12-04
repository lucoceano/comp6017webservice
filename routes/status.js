/**
 * Created by Lucas Oceano Martins on 04/12/2013.
 */

exports.ok = function (response) {
    "use strict";
    response.send({}, 200);
};

exports.created = function (response) {
    "use strict";
    response.send({}, 201);
};

exports.noContent = function (response) {
    "use strict";
    response.send({}, 204);
};

exports.notModified = function (response) {
    "use strict";
    response.send({}, 304);
};

exports.notFound = function (error, response) {
    "use strict";
    response.send(error, 404);
};

exports.internalError = function (error, response) {
    "use strict";
    response.send(error, 500);
};