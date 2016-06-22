require('_room');
require('_spawn');
require('_creep');
require('_source');
require('_tower');
var Factory = require('factory');
var commander = require('commander');
var metaAlpha = require('meta-alpha');

var main = {};

main.getRooms = function() {
  return Game['rooms'];
}

main.getCreeps = function() {
  return Game['creeps'];
}

main.loopRoles = function(creep) {
  if (creep.memory.role === 'harvester') {
    commander.stack(['commandHarvestEnergy'], creep);
  }
  // TODO: merge carrier and depositer
  if (creep.memory.role === 'carrier') {
    commander.stack(['commandPickup', 'commandDepositEnergy'], creep);
  }
  // Deny if spammer is bussy
  if (creep.memory.role === 'upgrader') {
    creep['memory']['claimedSource'] = null;
    commander.stack(['commandUpgrade', 'commandHarvestEnergy', 'commandDepositEnergy'], creep);
  }
  if (creep.memory.role === 'depositer') {
    commander.stack(['commandPickup', 'commandTransfer', 'commandCarryEnergy', 'commandDepositEnergy'], creep);
  }
  if (creep.memory.role === 'builder') {
    creep['memory']['claimedSource'] = null;
    commander.stack(['commandPickup', 'commandBuild', 'commandRepair', 'commandHarvestEnergy', 'commandDepositEnergy'], creep);
  }
  if (creep.memory.role === 'guard') {
    commander.stack(['commandGuard'], creep);
  }
}

main.loopCreeps = function() {
  var creeps = main.getCreeps();
  for (var creepName in creeps) {
    var creep = creeps[creepName];
    if (!commander.check(creep)) {
      main.loopRoles(creep);
    }
  }
}

main.loopTowers = function(room) {
  var towers = room.getTowers();
  for (var tower in towers) {
    console.log(tower);
    // TODO: make it so command can work
    if (!towers[tower].commandAttack()) {
      towers[tower].commandRepair();
    }
  }
}

main.loopRooms = function() {
  var rooms = main.getRooms();
  for (var roomName in rooms) {
    // for now we just have 1 room and 1 meta, so is fine..
    var roomFactory = new Factory(rooms[roomName], metaAlpha);
    roomFactory.check();
    main.loopTowers(rooms[roomName]);
  }
}

main.loopRooms();
main.loopCreeps();

// TODO: refactor carrie so carry, pickup and deposite are the same?
// check who have the most energy available.
// if there is none who is carriying it then claim it
