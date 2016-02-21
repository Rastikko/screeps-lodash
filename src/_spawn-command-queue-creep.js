function commandQueueCreep(creepDefinition) {
  // TODO: calculate this dinamically
  var totalCreeps = 9;

  var creepCount = this.room.find(FIND_MY_CREEPS).length;
  var capacityAvailable = this.room.energyCapacityAvailable * (creepCount / totalCreeps);
  capacityAvailable = Math.floor(capacityAvailable * 0.7);
  capacityAvailable = Math.max(capacityAvailable, 300);
  console.log("CrepCount: " + creepCount);
  console.log("totalCreep: " + totalCreeps);
  console.log('energyCapacityAvailable ' + this.room.energyCapacityAvailable);
  var role = creepDefinition.role;
  var parts = spawnHelpers.getParts(role, capacityAvailable);

  if (this.canCreateCreep(parts) === ERR_NOT_ENOUGH_ENERGY) {
    return 'SAVE';
  };

  var result = this.createCreep(parts, null, creepDefinition);

  if (result === OK) {
    return 'DELETE';
  }
}

module.exports = commandQueueCreep;
