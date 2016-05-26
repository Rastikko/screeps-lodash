function commandPickup() {
  if ((this.carry.energy || 0) < this.carryCapacity) {
    var target = this.room.getSpawn();
    var result = target.transferEnergy(this);
    if (result === ERR_NOT_IN_RANGE) {
      this.moveTo(target);
    }
    return 'SAVE';
  }
  return 'DELETE';
}

module.exports = commandPickup;
