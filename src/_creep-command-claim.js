function commandClaim() {
  let flag = Game.flags[this['memory']['flagName']];
  var controller = this.room.controller;
  if (flag) {
    if (flag.room.controller == controller) {
      var result = this.claimController(controller);
      console.log(result);
      if (result === ERR_NOT_IN_RANGE) {
        this.moveTo(controller);
      }
      return 'SAVE';
    } else {
      this.moveTo(flag);
      return 'SAVE';
    }
  }
  return 'DELETE';
}

module.exports = commandClaim;
