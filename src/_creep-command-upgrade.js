function commandUpgrade() {
  if (this.room.memory.spamming) {
    this.moveTo(Game.flags.Away);
    return 'DELETE';
  }
  var result = this.upgradeController(this.room.controller);
  var range = this.pos.getRangeTo(this.room.controller);

  if (result === ERR_NOT_IN_RANGE || range >= 3) {
    this.moveTo(this.room.controller);
  }
  return 'SAVE';
}

module.exports = commandUpgrade;
