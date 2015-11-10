/**
 * Created by janeluck on 11/10/15.
 */

var should = require('should'),
    toMaxInt = require('./toMaxInt');

describe('Convert numbers to max int', function(){
    it('n < 10', function() {

        toMaxInt(1).should.eql(5);
        toMaxInt(5).should.eql(5);
        toMaxInt(6).should.eql(10);
    });


    it('n = 10', function() {

        toMaxInt(10).should.eql(10);
    });


    it('n > 10', function() {

        toMaxInt(120).should.eql(150);
        toMaxInt(1001).should.eql(1500);
        toMaxInt(1501).should.eql(2000);
        toMaxInt(3700).should.eql(4000);
    })
})
