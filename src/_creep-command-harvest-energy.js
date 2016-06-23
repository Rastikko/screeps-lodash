function commandHarvestEnergy() {
  var source;
  let flag = Game.flags[this['memory']['flagName'] + '-' + this.room.name];
  if (flag) {
    source = this.room.lookForAt('source', flag.pos.x, flag.pos.y)[0];
  }
  if (source) {
    source.nClaims = (!!source.nClaims) ? ++source.nClaims : 1;
    var result = this.harvest(source);
    if (result === ERR_NOT_IN_RANGE) {
      this.moveTo(source);
    }
    return 'SAVE';
  }
  return 'DELETE';
}

module.exports = commandHarvestEnergy;
