function _priorityCalculation(role, nCreep) {
  if (role === 'harvester' || role === 'carrier') {
    return  (nCreep === 0) ? 1 : 2;
  }
  return  2;
}

// it returns a stack with a queue to create different role creeps
// if there is no a single role then the first of each meta will have
// runLevel 1, otherwise they will have 2
function provideStack(role, roleMeta) {
  var room = this.room;
  var roleStack = [];

  var roleCreeps = this.room.find(FIND_MY_CREEPS, { filter: {memory: { role: role }} });
  for (var iMeta = 0; iMeta < roleMeta.length; iMeta++) {
    var count = roleMeta[iMeta].count;

    for (var nCreep = roleCreeps.length; nCreep < count; nCreep++) {
      var priority = _priorityCalculation(role, nCreep);
      roleStack.push({
        role: role,
        priority: priority
      });
    }

  }
  return roleStack;
}

module.exports = provideStack;
