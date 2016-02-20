var _ = require('lodash');
var assert = require('chai').assert;
var expect = require('chai').expect;

var mockMeta = require('../mocks/alpha');
var MockCreepFactory = require('../mocks/factory');
var provideStack = require('../../src/factory-provide-stack');

describe('provideStack', function() {

  before(function() {
    MockCreepFactory.prototype.provideStack = provideStack;
  });

  var creepFactory;
  beforeEach(function() {
    creepFactory = new MockCreepFactory('random-room', mockMeta);
  });

  it ('it should return an empty stack if no meta is defined', function () {
    var stack = creepFactory.provideStack('harvester', {});
    assert(Array.isArray(stack));
    expect(stack).to.be.empty;
  });

  it ('it should return the same flagName than the defined on the meta', function() {
    var stack = creepFactory.provideStack('harvester', mockMeta.harvester);
    expect(stack[0].flagName).to.be.equal('MinerAlpha');
  });

  it ('it should return first creep with priority 1 and the rest priority 2 empty room', function () {
    var stack = creepFactory.provideStack('harvester', mockMeta.harvester);
    stack = _.filter(stack, {flagName: 'MinerAlpha'});
    expect(stack).not.to.be.empty;
    expect(stack.length).to.be.equal(3);
    expect(stack[0].priority).to.be.equal(1);
    expect(stack[1].priority).to.be.equal(2);
    expect(stack[2].priority).to.be.equal(2);
  });

  it ('it should return 2 creeps with priority 2 creep in a room with 1 harvester', function () {
    var room = {};
    room['creeps'] = {};
    room['creeps']['first'] = {};
    room['creeps']['first']['memory'] = { role: 'harvester', flagName: 'MinerAlpha' };
    creepFactory.room = room;
    var stack = creepFactory.provideStack('harvester', mockMeta.harvester);
    stack = _.filter(stack, {flagName: 'MinerAlpha'});
    expect(stack.length).to.be.equal(2);
    expect(stack[0].priority).to.be.equal(2);
    expect(stack[1].priority).to.be.equal(2);
  });

  it ('it should provide 2 creeps priority 1 and 3 priority 2 with multiple harvesters defined', function () {
    var stack = creepFactory.provideStack('harvester', mockMeta.harvester);
    expect(stack.length).to.be.equal(5);
    expect(stack[0].priority).to.be.equal(1);
    expect(stack[1].priority).to.be.equal(2);
    expect(stack[2].priority).to.be.equal(2);
    expect(stack[3].priority).to.be.equal(1);
    expect(stack[4].priority).to.be.equal(2);
  });
});
