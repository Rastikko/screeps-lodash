var check = require('factory-check');
var checkQueue = require('factory-check-queue');
var provideStack = require('factory-provide-stack');

// Creep factory will be in charge of check what creeps needs to be builded,
// optimize parts base on energy available in the room and tell the spawn to
// generate the creep with the most priority
function Factory(room, meta) {
  this.room = room;
  this.meta = meta;
}

Factory.prototype.check = check;
Factory.prototype.provideStack = provideStack;
Factory.prototype.checkQueue = checkQueue;

module.exports = Factory;
