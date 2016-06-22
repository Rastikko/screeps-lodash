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
