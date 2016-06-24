function commandCheck() {
  var room = this.room.name;
  var spawn = this;
  if (spawn['memory']['metaPosition'] !== undefined) {
    return 'DELETE';
  }
  var allCreeps = Object.keys(Game.creeps).map(function(key) {
    return Game.creeps[key];
  });
  //var roomCreeps = this.room.find(FIND_MY_CREEPS);
  var roomCreeps = [];
  roomCreeps = _.filter(allCreeps,
    function(creep) {
      return creep.name.endsWith(room);
    }
  );
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
