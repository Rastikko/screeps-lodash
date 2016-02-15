// Game: the Game object provided by screeps
// room: the specific room that this Factory will be working for
// meta: the meta descriptor with the definition on how many creeps we want
function CreepFactory(Game, room, meta) {
  this.Game = Game;
  this.room = room;
  this.meta = meta;
}

CreepFactory.
