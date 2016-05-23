Source.prototype.availableTiles = function() {
  var tiles =
    this.room.lookAtArea(this.pos.y - 1, this.pos.x - 1, this.pos.y + 1, this.pos.x + 1);
  var availableTiles = 0;
  for (var tileY in tiles) {
    for (var tileX in tiles[tileY]) {
      var tileArray = tiles[tileY][tileX];
      var terrain = tileArray.find(function(tile) {
        return tile.type === 'terrain';
      });
      var isTerrainSwamp = terrain['terrain'] === 'swamp';
      var isTerrainPlain = terrain['terrain'] === 'plain';
      if (isTerrainPlain || isTerrainSwamp) {
        availableTiles++;
      }
    }
  }
  return availableTiles;
}

Source.prototype.isClaimed = function() {
  // find room creeps with claimedSource id this.id
  if (this._isClaimed) {
    return true;
  }
  var claims = this.room.find(FIND_MY_CREEPS, {
    filter: {memory: { claimedSource: this.id }}
  });
  var availableTiles = this.availableTiles();
  var _isClaimed = claims.length >= availableTiles;
  this._isClaimed = _isClaimed;
  return _isClaimed;
}

Source.prototype.isCarried = function() {
  if (this._isCarried) return true;
  var claims = this.room.find(FIND_MY_CREEPS, {
    filter: {memory: { carriedSource: this.id }}
  });
  // TODO instead of just one carrier calculate base on distance
  var _isCarried = claims.length > 0;
  return this._isCarried = _isCarried;
}
