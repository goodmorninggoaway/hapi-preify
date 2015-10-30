var expect = require('chai').expect;

describe('hapi-preify', function() {
    var preify, request, reply;

    beforeEach(function(done) {
        preify = require('../src');
        request = {
            pre: {}
        };
        reply = undefined;

        done();
    });

    it('should return a function', function(done){
        var fn = function(){};

        var actual = preify(fn);

        expect(actual).to.be.a('function');
        done();
    });

    it('synchronous function should run with no parameters', function(done) {
        var fn = function() { return 1;};
        var preified = preify(fn);

        reply = function(actual) {
            expect(actual).to.equal(1);
            done();
        };

        preified(request, reply);
    });

    it('synchronous function should run with 1 parameter', function(done) {
        request.pre.thing1 = 'because';

        var fn = function(arg1) { return '1' + arg1;};
        var preified = preify(fn, ['thing1']);

        reply = function(actual) {
            expect(actual).to.equal('1because');
            done();
        };

        preified(request, reply);
    });

    it('synchronous function should run with multiple parameters', function(done) {
        request.pre.thing1 = 'because';
        request.pre[2] = 'fish';
        request.pre['3'] = 'lettuce';

        var fn = function(arg1, arg2, arg3) { return '1' + arg1 + arg2 + arg3;};
        var preified = preify(fn, ['thing1', 2, '3']);

        reply = function(actual) {
            expect(actual).to.equal('1becausefishlettuce');
            done();
        };

        preified(request, reply);
    });

    it('synchronous function should run with missing parameter', function(done) {
        request.pre.thing1 = 'because';
        request.pre[2] = 'fish';
        request.pre['3'] = 'lettuce';

        var fn = function(arg1, arg2, arg3) { return '1' + arg1 + arg2 + arg3;};
        var preified = preify(fn, ['thing1', '', '3']);

        reply = function(actual) {
            expect(actual).to.equal('1becauseundefinedlettuce');
            done();
        };

        preified(request, reply);
    });
});