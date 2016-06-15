function commandDepositEnergy() {
  if (this.carry.energy) {
    console.log('this.pos', this.pos);
    var target = this.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: function(obj) {
        return obj.structureType == STRUCTURE_EXTENSION && obj.energy < obj.energyCapacity;
      }
    });
    console.log('target', target);

    if (!target) {
      target = this.room.getSpawn();
    }

    if (this.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      this.moveTo(target);
    }
    // TODO: if someone is targeting me move to the target instead
    return 'SAVE';
  }
  return 'DELETE';
}

module.exports = commandDepositEnergy;
