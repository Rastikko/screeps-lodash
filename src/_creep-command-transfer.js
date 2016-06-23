function commandTransfer() {
  if (this.room.memory.spamming) {
    return 'DELETE';
  }
  if (this.carry.energy) {
    // check for claimed source in memory
    var upgraders = this.room.find(FIND_MY_CREEPS, {
      filter: function(creep) {
        var rightRole = creep.memory.role === 'upgrader';
        var haveNoEnergy = creep.carry.energy < 20;
        return rightRole && haveNoEnergy;
      }
    });
    if (upgraders.length) {
      var result = this.transfer(upgraders[0], RESOURCE_ENERGY);
      if (result === ERR_NOT_IN_RANGE) {
        this.moveTo(upgraders[0]);
      }
      return 'SAVE';
    }
  }
  return 'DELETE';
}

module.exports = commandTransfer;
