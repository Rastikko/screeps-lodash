function commandGuard() {
  var targets = this.room.find(FIND_HOSTILE_CREEPS);

  if (targets.length) {
    if(this.attack(targets[0]) == ERR_NOT_IN_RANGE) {
      this.moveTo(targets[0]);
    }
  } else {
    this.moveTo(Game.flags.Guard);
  }
}

module.exports = commandGuard;
