function commandHarvestEnergy() {
  if (this.carry.energy < this.carryCapacity) {
    var source = this.pos.findClosestByRange(FIND_SOURCES_ACTIVE, {
      filter: function(source) {
        return !source.isClaimed();
      }
    });
    if (source) {
      source.claim();
      var result = this.harvest(source);
      if (result === ERR_NOT_IN_RANGE) {
        this.moveTo(source);
      }
      return 'SAVE';
    }
	}
  console.log('RETURN DELETE');
  return 'DELETE';
}

module.exports = commandHarvestEnergy;
