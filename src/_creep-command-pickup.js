function commandPickup() {
  if ((this.carry.energy || 0) < this.carryCapacity) {
    var target = this.findClosestDroppedEnergy(100);
    target = target || this.findClosestNotEmpty({
      structures: [STRUCTURE_STORAGE],
      creeps: ['harvest']
    }, 20);
    this.moveTo(target);
    console.log('target', target);
    this.withdrawEnergy(target);
    return 'SAVE';
  }
  return 'DELETE';
}

module.exports = commandPickup;
