function commandDepositEnergy() {
  if (this.carry.energy) {

    var target = this.findClosest({
      structures: [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_TOWER],
      empty: true
    });

    if (!target) {
      target = this.findClosest({
        structures: [STRUCTURE_CONTAINER, STRUCTURE_LINK],
        empty: true
      });
    }

    if (!target) {
      target = this.room.storage;
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
