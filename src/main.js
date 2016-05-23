require('_room');
require('_spawn');
require('_creep');
require('_source');
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
    commander.stack(['commandHarvestEnergy', 'commandDepositEnergy'], creep);
  }
}

main.loopCreeps = function(room) {
  var creeps = main.getCreeps();
  for (var creepName in creeps) {
    var creep = creeps[creepName];
    if (!commander.check(creep)) {
      main.loopRoles(creep);
    }
  }
}

main.loopRooms = function() {
  var rooms = main.getRooms();
  for (var roomName in rooms) {
    // for now we just have 1 room and 1 meta, so is fine..
    var roomFactory = new Factory(rooms[roomName], metaAlpha);
    roomFactory.check();
  }
}

main.loopRooms();
main.loopCreeps();

// iterate through rooms
  // for each room make a spawn check

// Iterate through creeps
  // switch between roles
  // check if isBussy
  // assign tasks depending on role if he is not
