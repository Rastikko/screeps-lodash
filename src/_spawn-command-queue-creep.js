var spawnHelpers = require('_spawn-helpers');

function commandQueueCreep(creepDefinition) {
  // TODO: calculate this dinamically
  var totalCreeps = 14;

  var creepCount = this.room.find(FIND_MY_CREEPS).length;
  var capacityAvailable = this.room.energyCapacityAvailable * (creepCount / totalCreeps);
  capacityAvailable = Math.floor(capacityAvailable * 0.7);
  capacityAvailable = Math.max(capacityAvailable, 300);
  var role = creepDefinition.role;
  var parts = spawnHelpers.getParts(role, capacityAvailable);

  if (this.canCreateCreep(parts) === ERR_NOT_ENOUGH_ENERGY) {
    console.log("NNOOOO");
    return 'SAVE';
  };

  console.log('createCreep:', this.createCreep(parts, null, creepDefinition));
  return 'DELETE';
}

module.exports = commandQueueCreep;
