var lodash = require('lodash');
var assert = require('chai').assert;
var expect = require('chai').expect;

var mockMeta = require('../mocks/alpha');
var provideStack = require('../../src/creep-factory-provide-stack');

describe('provideStack', function() {

  it ('it should return an empty stack if no meta is defined', function () {
    var result = provideStack({}, 'harvester', {});
    assert(Array.isArray(result));
    expect(result).to.be.empty;
  });

  it ('it should return the same flagName than the defined on the meta', function() {
    var result = provideStack({}, 'harvester', mockMeta.harvester);
    expect(result[0].flagName).to.be.equal('MinerAlpha');
  });

  it ('it should return first creep with priority 1 and the rest priority 2 empty room', function () {
    var result = provideStack({}, 'harvester', mockMeta.harvester);
    result = lodash.filter(result, {flagName: 'MinerAlpha'});
    expect(result).not.to.be.empty;
    expect(result.length).to.be.equal(3);
    expect(result[0].priority).to.be.equal(1);
    expect(result[1].priority).to.be.equal(2);
    expect(result[2].priority).to.be.equal(2);
  });

  it ('it should return 2 creeps with priority 2 creep in a room with 1 harvester', function () {
    var room = {};
    room['creeps'] = {};
    room['creeps']['first'] = {};
    room['creeps']['first']['memory'] = { role: 'harvester', flagName: 'MinerAlpha' };
    var result = provideStack(room, 'harvester', mockMeta.harvester);
    result = lodash.filter(result, {flagName: 'MinerAlpha'});
    expect(result.length).to.be.equal(2);
    expect(result[0].priority).to.be.equal(2);
    expect(result[1].priority).to.be.equal(2);
  });

  it ('it should provide 2 creeps priority 1 and 3 priority 2 with multiple harvesters defined', function () {
    var result = provideStack({}, 'harvester', mockMeta.harvester);
    expect(result.length).to.be.equal(5);
    expect(result[0].priority).to.be.equal(1);
    expect(result[1].priority).to.be.equal(2);
    expect(result[2].priority).to.be.equal(2);
    expect(result[3].priority).to.be.equal(1);
    expect(result[4].priority).to.be.equal(2);
  });
});
