var lodash = require('lodash');
var assert = require('chai').assert;
var expect = require('chai').expect;

var alphaMeta = require('../../src/manifest/alpha');
var providePriorityStackFunction = require('../../src/creep-factory/provide-priority-stack');
var CreepFactoryMock = require('../mocks/creep-factory');

describe('providePriorityStack', function() {
  var creepFactory;
  beforeEach(function() {
    creepFactory = new CreepFactoryMock();
    creepFactory.meta = alphaMeta;
    creepFactory.providePriorityStack = providePriorityStackFunction;
  });

  it ('it should return an empty stack if no meta is defined', function () {
    creepFactory.meta = [{}];
    var result = creepFactory.providePriorityStack('harvester');
    assert(Array.isArray(result));
    expect(result).to.be.empty;
  });

  it ('it should return first creep with priority 1 and the rest priority 2 empty room', function () {
    var result = creepFactory.providePriorityStack('harvester');
    result = lodash.filter(result, {flagName: 'MinerAlpha'});
    expect(result).not.to.be.empty;
    expect(result.length).to.be.equal(3);
    expect(result[0].priority).to.be.equal(1);
    expect(result[1].priority).to.be.equal(2);
    expect(result[2].priority).to.be.equal(2);
  });

  it ('it should return 2 creeps with priority 2 creep in a room with 1 harvester', function () {
    creepFactory.room.creeps['myFirstCreep'] = {};
    creepFactory.room.creeps['myFirstCreep']['memory'] = { role: 'harvester' };
    var result = creepFactory.providePriorityStack('harvester');
    result = lodash.filter(result, {flagName: 'MinerAlpha'});
    expect(result.length).to.be.equal(2);
    expect(result[0].priority).to.be.equal(2);
    expect(result[1].priority).to.be.equal(2);
  });

  it ('it should return the same flagName than the defined on the meta', function() {
    var result = creepFactory.providePriorityStack('harvester');
    expect(result[0].flagName).to.be.equal('MinerAlpha');
  });
});
