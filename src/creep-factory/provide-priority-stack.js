var lodash = require('lodash');

function _priorityCalculation(iCreep) {
  return  (iCreep === 0) ? 1 : 2;
}

// it returns a stack with a queue to create different role creeps
// if there is no a single role then the first of each meta will have
// runLevel 1, otherwise they will have 2
function providePriorityStack(role) {
  var roleStack = [];
  var roleMeta = this.meta[role];
  var creeps = this.room.creeps;
  var roleCreeps = lodash.filter(creeps, { 'memory': { role: role }});

  // if there is no meta for role just return empty stack
  if (!roleMeta) {
    return roleStack;
  }

  for (var iMeta = 0; iMeta < roleMeta.length; iMeta++) {
    var count = roleMeta[iMeta].count;
    var flagName = roleMeta[iMeta].flagName;
    for (var iCreeps = roleCreeps.length; iCreeps < count; iCreeps++) {
      var priority = _priorityCalculation(iCreeps);
      roleStack.push({
        role: role,
        priority: priority,
        flagName: flagName
      });
    }
  }

  return roleStack;
}

module.exports = providePriorityStack;
