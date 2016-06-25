var Commander = {}

// This is the only function that apply business logic, we need to make sure to
// always stub it or the Game global object on usage
Commander.getTargetObject = function(target) {
  var targetObject = target;
  if (typeof targetObject !== 'object') {
     targetObject = Game.getObjectById(target);
  }
  return targetObject;
}

Commander.save = function(name, target) {
  var targetObject = Commander.getTargetObject(target);
  if (targetObject['memory']) {
    targetObject['memory']['command'] = name;
  }
}

Commander.delete = function(targetObject) {
  if (targetObject['memory']) {
    delete targetObject['memory']['command'];
  }
}

Commander.check = function(target) {
  var targetObject = Commander.getTargetObject(target);
  if  (!targetObject) {
    return false;
  }
  var haveCommand = targetObject['memory']['command'] !== undefined;
  if (haveCommand) {
    var targetCommandMemory = targetObject['memory']['command'];
    Commander.execute(targetObject['memory']['command'], targetObject);
  }
  return haveCommand;
}

Commander.execute = function(name, target) {
  var targetObject = Commander.getTargetObject(target);
  if (!targetObject) {
    return;
  }
  var result = targetObject[name].apply(targetObject);
  if (result === 'SAVE') {
    if (targetObject['memory']['command'] === undefined && targetObject.say) {
      targetObject.say(name.replace('command', ''));
    }
    Commander.save(name, target);
  }
  if (result === 'DELETE') {
    Commander.delete(target);
  }
  return result;
}

Commander.stack = function(names, target) {
  for (var i = 0; i < names.length; i++) {
    if (Commander.execute(names[i], target) === 'SAVE') {
      return;
    }
  }
}

module.exports = Commander;
