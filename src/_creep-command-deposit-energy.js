function commandDepositEnergy() {
  if (this.carry.energy) {
    var target = this.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: function(obj) {
        return obj.structureType == STRUCTURE_EXTENSION && obj.energy < obj.energyCapacity;
      }
    });

    if (!target) {
      target = this.room.getEmptySpawn();
    }

    if (!target) {
      target = this.room.getEmptyTower();
    }

    if (target) {
      if (this.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        this.moveTo(target);
      }
      // TODO: if someone is targeting me move to the target instead
      return 'SAVE';
    }
  }
  return 'DELETE';
}

module.exports = commandDepositEnergy;
