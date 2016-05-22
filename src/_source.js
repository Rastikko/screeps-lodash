Source.prototype.availableTiles = function() {
  var memoryAvailableTiles = this['memory'] && this['memory']['availableTiles'];
  if (memoryAvailableTiles) {
    return memoryAvailableTiles;
  }
  var tiles = this.room.lookAtArea(this.pos.y - 1, this.pos.x - 1, this.pos.y + 1, this.pos.x + 1);
  console.log('tiles', tiles);
  var availableTiles = 0;
  for (var tileY in tiles) {
    for (var tileX in tiles[tileY]) {
      var tileArray = tiles[tileY][tileX];
      var isJustOne = tileArray.length === 1;
      var isTerrainSwamp = tileArray[0]['terrain'] === 'swamp';
      var isTerrainNormal = tileArray[0]['terrain'] === 'normal';
      if (isJustOne && (isTerrainNormal || isTerrainSwamp)) {
        availableTiles++;
      }
    }
  }
  memoryAvailableTiles = availableTiles;
  return availableTiles;
}

Source.prototype.isClaimed = function() {
  console.log('isClaimed', this);
  var availableTiles = this.availableTiles();
  var isClaimed = availableTiles > 0 && this._claims < availableTiles;
  this._claimed = isClaimed;
  return isClaimed;
}

Source.prototype.claim = function() {
  if (!this._claims) {
    this._claims = 1;
  } else {
    this._claims++;
  }
}
