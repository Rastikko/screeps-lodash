function commandCarryEnergy() {
  if (this.carry.energy < this.carryCapacity) {
    // check for claimed source in memory
    var source;
    if (this['memory']['carriedSource']) {
      source = Game.getObjectById(this['memory']['carriedSource']);
    }
    if (!source) {
      // instead get the less carried source possible.
      var self = this;
      source = this.pos.findClosestByRange(FIND_SOURCES_ACTIVE, {
        filter: function(source) {
          var distance = source.pos.getRangeTo(self);
          return !source.isCarried(distance);
        }
      });
      if (source) this['memory']['carriedSource'] = source.id;
    }
    if (source) {
      var harvesters = this.room.find(FIND_MY_CREEPS, {
        filter: function(harvester) {
          var rightSource = harvester.memory.claimedSource === source.id;
          var haveEnergy = harvester.carry.energy > 20;
          return rightSource && haveEnergy;
        }
      });
      if (harvesters.length) {
        var result = harvesters[0].transfer(this, RESOURCE_ENERGY);
        if (result === ERR_NOT_IN_RANGE) {
          this.moveTo(harvesters[0]);
        }
      }
      return 'SAVE';
    }
	}
  this['memory']['carriedSource'] = null;
  return 'DELETE';
}

module.exports = commandCarryEnergy;
