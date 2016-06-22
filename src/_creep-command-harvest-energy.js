function commandHarvestEnergy() {
  var source;
  if (!source) {

    let sources = this.room.find(FIND_SOURCES_ACTIVE, {
      filter: function(s) {
        return !(s.nClaims && s.nClaims >= 2);
      }
    });
    console.log('sources', sources);
    source = this.pos.findClosestByPath(sources);
    console.log('source', source);
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
