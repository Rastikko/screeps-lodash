function commandBuild() {
  if (!this.carry.energy) return 'DELETE';
  if (this.room.memory.spamming) {
    return 'DELETE';
  }
  var target = this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
  if (target) {
    if (this.build(target) === ERR_NOT_IN_RANGE) {
      this.moveTo(target);
    }
    return 'SAVE';
  }
  return 'DELETE';
}

module.exports = commandBuild;
