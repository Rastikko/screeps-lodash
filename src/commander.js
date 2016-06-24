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

Commander.save = function(name, target, parameters) {
  var targetObject = Commander.getTargetObject(target);
  targetObject['memory']['command'] = {};
  targetObject['memory']['command']['name'] = name;
  targetObject['memory']['command']['targetId'] = target.id;
  targetObject['memory']['command']['parameters'] = parameters;
}

Commander.delete = function(targetObject) {
  // delete also parameters
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
    Commander.execute(targetCommandMemory['name'], targetObject, targetCommandMemory['parameters']);
  }
  return haveCommand;
}

Commander.execute = function(name, target, parameters) {
  var targetObject = Commander.getTargetObject(target);
  if (!targetObject)
    return;
  if (targetObject['memory']['command'] === undefined && targetObject.say) {
    targetObject.say(name.replace('command', ''));
  }
  var result = targetObject[name].apply(targetObject, parameters);
  if (result === 'SAVE') {
    Commander.save(name, target, parameters);
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
