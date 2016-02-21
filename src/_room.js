Room.prototype.getSpawn = function() {
  var spawns = this.find(FIND_MY_SPAWNS);
  return spawns[0];
}
