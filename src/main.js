require('_room');
require('_spawn');
require('_creep');
require('_source');
require('_tower');
var commander = require('commander');
var metaAlpha = require('meta-alpha');

var main = {};

// Use theese to clear old memory once
// for(var i in Memory.creeps) {
//     if(!Game.creeps[i]) {
//         delete Memory.creeps[i];
//     }
// }
//
// for(var i in Memory.creeps) {
//     delete Memory.creeps[i]['command'];
// }

main.getRooms = function() {
  return Game['rooms'];
}

main.getCreeps = function() {
  return Game['creeps'];
}

main.loopRoles = function(creep) {
  if (creep.memory.role === 'harvester') {
    commander.stack(['commandHarvestEnergy'], creep);
  } else if (creep.memory.role === 'carrier') {
    commander.stack(['commandPickup', 'commandTransfer', 'commandDepositEnergy'], creep);
  }
  // Deny if spammer is bussy
    else if (creep.memory.role === 'upgrader') {
    commander.stack(['commandUpgrade'], creep);
  } else if (creep.memory.role === 'builder') {
    commander.stack(['commandPickup', 'commandBuild', 'commandRepair'], creep);
  } else if (creep.memory.role === 'guard') {
    commander.stack(['commandGuard'], creep);
  } else if (creep.memory.role === 'claim') {
    commander.stack(['commandClaim'], creep);
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
    // TODO: check if we are not beeing attack to commandRepair
    commander.stack(['commandAttack'], towers[tower]);
  }
}

main.loopRooms = function() {
  var rooms = main.getRooms();
  for (var roomName in rooms) {
    var room = rooms[roomName];
    var spawn = room.getSpawn();
    room.meta = metaAlpha;
    if (!commander.check(spawn)) {
      commander.stack(['commandCheck', 'commandSpawn'], spawn);
    }
    main.loopTowers(room);
  }
}

main.loopRooms();
main.loopCreeps();
//console.log(Game.cpu.getUsed())
