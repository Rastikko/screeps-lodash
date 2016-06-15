function commandRepair() {
  if (!this.carry.energy) return 'DELETE';
  if (this.room.memory.spamming) {
    return 'DELETE';
  }
  var structuresNeedsRepair = this.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: (structure) => {
      var isHalfDamaged = structure.hits < structure.hitsMax / 2;
      var isNotALotOfWork = structure.hits < 100000;
      return isHalfDamaged && isNotALotOfWork;
    }
  });

  if (structuresNeedsRepair) {
    if (this.repair(structuresNeedsRepair) === ERR_NOT_IN_RANGE) {
        this.moveTo(structuresNeedsRepair);
    }
    return 'SAVE';
  }
  return 'DELETE';
}

module.exports = commandRepair;
