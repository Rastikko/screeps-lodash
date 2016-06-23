function commandCheck() {
  var spawn = this;
  if (spawn['memory']['metaPosition'] !== undefined) {
    return 'DELETE';
  }
  var roomCreeps = this.room.find(FIND_MY_CREEPS);
  var room = this.room.name;
  var meta = this.room.meta;
  if (meta.length > roomCreeps.length) {
    // var roomCreepsName = _.pluck(roomCreeps, 'name');
    meta.some(function(metaCreep, index) {
      if (!_.find(roomCreeps, {name: metaCreep.name + '-' + room})) {
        spawn['memory']['metaPosition'] = index;
        return 'DELETE';
      }
    });
  }
  return 'DELETE';
}

module.exports = commandCheck;
