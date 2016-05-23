function commandHarvestEnergy() {
  if (this.carry.energy < this.carryCapacity) {
    // check for claimed source in memory
    var source;
    if (this['memory']['claimedSource']) {
      source = Game.getObjectById(this['memory']['claimedSource']);
    }
    if (!source) {
      source = this.pos.findClosestByRange(FIND_SOURCES_ACTIVE, {
        filter: function(source) {
          return !source.isClaimed();
        }
      });
      if (source) this['memory']['claimedSource'] = source.id;
    }
    if (source) {
      var result = this.harvest(source);
      if (result === ERR_NOT_IN_RANGE) {
        this.moveTo(source);
      }
      return 'SAVE';
    }
	}
  return 'DELETE';
}

module.exports = commandHarvestEnergy;
