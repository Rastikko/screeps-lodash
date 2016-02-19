var checkQueue = require('creep-factory-check-queue');
var provideStack = require('creep-factory-provide-stack');

// Creep factory will be in charge of check what creeps needs to be builded,
// optimize parts base on energy available in the room and tell the spawn to
// generate the creep with the most priority
function CreepFactory(room, meta) {
  this.room = room;
  this.meta = meta;
}

CreepFactory.prototype.provideStack = provideStack;
CreepFactory.prototype.checkQueue = checkQueue;

module.exports = CreepFactory;
