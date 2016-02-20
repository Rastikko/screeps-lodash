var expect = require('chai').expect;
var sinon = require('sinon');

var mockMeta = require('../mocks/alpha');
var MockCreepFactory = require('../mocks/factory');
var checkQueue = require('../../src/factory-check-queue');

describe('checkQueue', function() {
  var creepFactory;
  before(function() {
    MockCreepFactory.prototype.checkQueue = checkQueue;
    MockCreepFactory.prototype.provideStack = sinon.stub();
  });

  beforeEach(function() {
    creepFactory = new MockCreepFactory('random-room', mockMeta);
  });

  it ('it should call provideStack 1 time with alpha-mock', function () {
    creepFactory.checkQueue();
    expect(creepFactory.provideStack.callCount).to.equal(1);
  });

  it ('it should call provideStack with the rigth arguments on alpha-mock', function () {
    creepFactory.checkQueue();
    expect(creepFactory.provideStack.firstCall.args[0]).to.equal('harvester');
    expect(creepFactory.provideStack.firstCall.args[1]).to.equal(mockMeta.harvester);
  });

  it ('it should retrieve an stack of queues', function () {
    creepFactory.provideStack = function() {
      return ['a', 'b'];
    }
    creepFactory.checkQueue();
    var queue = creepFactory.queue;
    expect(queue.length).to.be.equal(2);
  });

  it ('it should merge the arrays from provideStack', function () {
    creepFactory.provideStack = function() {
      return ['a', 'b'];
    };
    creepFactory.meta = {
      'harvester': {},
      'depositer': {}
    }
    creepFactory.checkQueue();
    var queue = creepFactory.queue;
    expect(queue.length).to.be.equal(4);
  });

});
