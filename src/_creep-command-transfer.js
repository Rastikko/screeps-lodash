function commandTransfer() {
  if (this.room.getSpawn()['memory']['command'] === 'commandSpawn') {
    return 'DELETE';
  }
  if (this.carry.energy) {
    // check for claimed source in memory
    var upgraders = this.room.find(FIND_MY_CREEPS, {
      filter: function(creep) {
        var rightRole = creep.memory.role === 'upgrader';
        var isNotClaimed = !creep.claimed;
        return rightRole && isNotClaimed;
      }
    });
    if (upgraders.length) {
      upgraders[0].claimed = true;
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
