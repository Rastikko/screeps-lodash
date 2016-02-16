var lodash = require('lodash');
var expect = require('chai').expect;
var sinon = require('sinon');

var mockMeta = require('../mocks/alpha');
var checkQueue = require('../../src/creep-factory-check-queue');

describe('checkQueue', function() {
  var provideStackSpy;
  beforeEach(function() {
    provideStackSpy = sinon.spy();
  });

  it ('it should call provideStack 1 time with alpha-mock', function () {
    checkQueue({}, mockMeta, provideStackSpy);
    expect(provideStackSpy.callCount).to.equal(1);
  });

  it ('it should call provideStack with the rigth arguments on alpha-mock', function () {
    checkQueue('random-room', mockMeta, provideStackSpy);
    expect(provideStackSpy.firstCall.args[0]).to.equal('random-room');
    expect(provideStackSpy.firstCall.args[1]).to.equal('harvester');
    expect(provideStackSpy.firstCall.args[2]).to.equal(mockMeta.harvester);
  });

  it ('it should retrieve an stack of queues', function () {
    var provideStack = function() {
      return ['a', 'b'];
    }
    var queue = checkQueue({}, mockMeta, provideStack);
    expect(queue.length).to.be.equal(2);
  });

  it ('it should merge the arrays from provideStack', function () {
    var provideStack = function() {
      return ['a', 'b'];
    };
    var meta = {
      'harvester': {},
      'depositer': {}
    }
    var queue = checkQueue({}, meta, provideStack);
    expect(queue.length).to.be.equal(4);
  });

});
