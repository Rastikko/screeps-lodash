var Commander = function(Game) {
  this.Game = Game;
}

Commander.prototype.getTargetObject = function(target) {
  var targetObject = target;
  if (typeof targetObject !== 'object') {
     targetObject = this.Game.getObjectById(target);
  }
  return targetObject;
}

Commander.prototype.save = function(name, target) {
  var targetObject = this.getTargetObject(target);
  targetObject
}

Commander.prototype.delete = function(name, target) {

}

Commander.prototype.check = function(name, target) {
  // if there was a saved command then proceed executing it
}

Commander.prototype.execute = function(name, target) {
  var arguments = Array.slice.call(arguments, 2);
  var targetObject = this.getTargetObject(target);

  var result = targetObject.apply(targetObject, arguments);
  if (result === 'SAVE') {
    this.save(name, target, arguments);
  }
  if (result === 'EXECUTED') {
    this.delete(name, target, arguments);
  }
  if (result === 'FREE') {
    // nothing.. just keep for guudies
  }
  return result;
}

// execute: name, [].slice.call(arguments, 1);

module.exports = Commander;
