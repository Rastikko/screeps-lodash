function commandPickup() {
  if ((this.carry.energy || 0) < this.carryCapacity) {
    var target = this.findClosest({
      droppedEnergy: true,
      energyThreshold: 100
    });

    if (target) {
      target.claimed = true;
    }

    if (!target) {
      target = this.findClosest({
        structured: [STRUCTURE_STORAGE, STRUCTURE_CONTAINER],
        energyThreshold: 20
      });
    }
    
    this.moveTo(target);
    this.withdrawEnergy(target);
    return 'SAVE';
  }
  return 'DELETE';
}

module.exports = commandPickup;
