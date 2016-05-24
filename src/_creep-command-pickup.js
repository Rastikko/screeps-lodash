function commandPickup() {
  // console.log('this.carry.energy', this.carry.energy);
  // console.log('this.carry.energy', this.carryCapacity);
  // console.log('this.carry.energy < this.carryCapacity', this.carry < this.carryCapacity);
  if ((this.carry.energy || 0) < this.carryCapacity) {
    var target = Game.spawns.Spawn1;
    var result = target.transferEnergy(this);
    console.log('result', result);
    if (result === ERR_NOT_IN_RANGE) {
      this.moveTo(target);
    }
    return 'SAVE';
  }
  return 'DELETE';
}

module.exports = commandPickup;
