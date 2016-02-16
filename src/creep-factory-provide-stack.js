var lodash = require('lodash');

function _priorityCalculation(role, iCreep) {
  if (role === 'harvester' || role === 'depositer') {
    return  (iCreep === 0) ? 1 : 2;
  }
  return  2;
}

// it returns a stack with a queue to create different role creeps
// if there is no a single role then the first of each meta will have
// runLevel 1, otherwise they will have 2
function provideStack(room, role, roleMeta) {
  var roleStack = [];
  var creeps = room.creeps;
  var roleCreeps = lodash.filter(creeps, { 'memory': { role: role }});

  for (var iMeta = 0; iMeta < roleMeta.length; iMeta++) {
    var count = roleMeta[iMeta].count;
    var flagName = roleMeta[iMeta].flagName;
    var flagNameCreeps = lodash.filter(roleCreeps, { 'memory': { flagName: flagName }});

    for (var iCreep = flagNameCreeps.length; iCreep < count; iCreep++) {
      var priority = _priorityCalculation(role, iCreep);
      roleStack.push({
        role: role,
        priority: priority,
        flagName: flagName
      });
    }

  }

  return roleStack;
}

module.exports = provideStack;
