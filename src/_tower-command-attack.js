function commandAttack(creepDefinition) {
  var target = this.room.getHostileCreep();
  if (target) {
    if (tower.attack(target) === OK) {
       return true;
    }
  }
  return false;
}

module.exports = commandAttack;
