var _ = require('lodash');

// it returns a stack with a queue to create different role creeps
// if there is no a single role then the first of each meta will have
// runLevel 1, otherwise they will have 2
function checkQueue() {
  var meta = this.meta;
  var provideStack = this.provideStack;
  return _.reduce(meta, function(queue, roleMeta, role) {
    return queue.concat(provideStack(role, roleMeta));
  }, []);
}

module.exports = checkQueue;
