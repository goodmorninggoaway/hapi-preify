'use strict';

function preify(fn, args) {
    if (!fn || typeof fn !== 'function') {
        throw new Error('fn must be a function');
    }

    return function (request, reply) {
        var argValues, result;

        if (args) {
            argValues = args.map(function (argName) {
                return request.pre[argName];
            });
        }

        result = fn.apply(this, argValues);
        reply(result);
    }
}

module.exports = preify;