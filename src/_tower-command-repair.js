function commandAttack(creepDefinition) {
  var target = this.room.getBrokenStructures();
  if (target) {
    if (this.repair(target) === OK) {
       return true;
    }
  }
  return false;
}

module.exports = commandAttack;
