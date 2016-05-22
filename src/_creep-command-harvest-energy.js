function commandHarvestEnergy() {
  console.log('this.carryCapacity', this.carryCapacity);
  console.log('this.carry.energy', this.carry.energy);
  if (this.carry.energy < this.carryCapacity) {
    var sources = this.room.find(FIND_SOURCES);
    // TODO: find nearest non busy
		if (this.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
			this.moveTo(sources[0]);
		}
    return 'SAVE';
	}
  console.log('RETURN DELETE');
  return 'DELETE';
}

module.exports = commandHarvestEnergy;
