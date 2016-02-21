require('_room');
require('_spawn');
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

main.loopCreeps = function(room) {
  var creeps = main.getCreeps();
  for (var creepName in creeps) {
    var creep = creeps[creepName];

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

// iterate through rooms
  // for each room make a spawn check

// Iterate through creeps
  // switch between roles
  // check if isBussy
  // assign tasks depending on role if he is not
