var spawnHelpers = require('_spawn-helpers');

function commandSpawn() {
  // Get the role from memory
  // just do the calculations..

  var metaPosition = this['memory']['metaPosition'];
  if (metaPosition === undefined) {
    return 'DELETE';
  }
  let creepDefinition  = this.room.meta[metaPosition];

  var totalCreeps = 14;

  var creepCount = this.room.find(FIND_MY_CREEPS).length;
  var capacityAvailable = this.room.energyCapacityAvailable * (creepCount / totalCreeps);
  capacityAvailable = Math.floor(capacityAvailable * 0.7);
  capacityAvailable = Math.max(capacityAvailable, 300);
  var role = creepDefinition.role;
  var parts = spawnHelpers.getParts(role, capacityAvailable);

  if (this.canCreateCreep(parts) === ERR_NOT_ENOUGH_ENERGY) {
    return 'SAVE';
  };
  this.createCreep(parts, creepDefinition.name + '-' + this.room.name, {
    role: creepDefinition.role,
    flagName: creepDefinition.flagName
  });
  delete this['memory']['metaPosition'];
  return 'DELETE';
}

module.exports = commandSpawn;
