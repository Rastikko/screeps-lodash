Source.prototype.availableTiles = function() {
  var tiles =
    this.room.lookAtArea(this.pos.y - 1, this.pos.x - 1, this.pos.y + 1, this.pos.x + 1);
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
  return availableTiles;
}

Source.prototype.isClaimed = function() {
  // find room creeps with claimedSource id this.id
  console.log('this.isClaimed', this._isClaimed);
  if (this._isClaimed) {
    return true;
  }
  // TODO: fix claims
  var claims = this.room.find(FIND_MY_CREEPS, {
    filter: {memory: { claimedSource: this.id }}
  });
  console.log('claims', claims);
  var availableTiles = this.availableTiles();
  var _isClaimed = availableTiles > 0 && claimArray.length < availableTiles;
  this._isClaimed = _isClaimed;
  return _isClaimed;
}
