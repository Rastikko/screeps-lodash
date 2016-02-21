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
  console.log('targetObject', targetObject);
  targetObject['memory']['command'] = {};
  targetObject['memory']['command']['name'] = name;
  targetObject['memory']['command']['targetId'] = target.id;
  targetObject['memory']['command']['parameters'] = parameters;
}

Commander.delete = function(target) {
  targetObject['memory']['command'] = undefined;
}

Commander.check = function(target) {
  var targetObject = Commander.getTargetObject(target);
  var haveCommand = targetObject['memory']['command'] !== undefined;
  if (haveCommand) {
    var targetCommandMemory = targetObject['memory']['command'];
    Commander.execute(targetCommandMemory['name'], targetObject, targetCommandMemory['parameters']);
  }
  return haveCommand;
  console.log(haveCommand);
}

Commander.execute = function(name, target, parameters) {
  var targetObject = Commander.getTargetObject(target);

  if (targetObject.isBussy) {
    return;
  }

  var result = targetObject[name].apply(targetObject, parameters);
  console.log('result', result);
  if (result === 'SAVE') {
    Commander.save(name, target, parameters);
  }
  if (result === 'DELETE') {
    Commander.delete(name, target, parameters);
  }
  if (result === 'FREE') {
    // nothing.. just keep for guudies
  }
  return result;
}

// execute: name, [].slice.call(parameters, 1);

module.exports = Commander;
