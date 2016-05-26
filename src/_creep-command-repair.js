function commandRepair() {
  var structuresNeedsRepair = this.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: (structure) => {
      var isHalfDamaged = structure.hits < structure.hitsMax / 2;
      var isNotALotOfWork = structure.hits < 300000;
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
