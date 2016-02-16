var _checkQueue = require('creep-factory-check-queue');
var _provideStack = require('creep-factory-provide-stack');
// Game: the Game object provided by screeps
// room: the specific room that this Factory will be working for
// meta: the meta descriptor with the definition on how many creeps we want
function CreepFactory(room, meta) {
  this.room = room;
  this.meta = meta;
}

CreepFactory.prototype.checkQueue = function() {
  this.queue = _checkQueue(this.room, this.meta, _provideStack);
};

module.exports = CreepFactory;
