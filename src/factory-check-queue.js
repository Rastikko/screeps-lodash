var _ = require('lodash');

// it returns a stack with a queue to create different role creeps
// if there is no a single role then the first of each meta will have
// runLevel 1, otherwise they will have 2
function checkQueue() {
  var _this = this;
  var meta = this.meta;
  var provideStack = this.provideStack;
  var stack = _.reduce(meta, function(queue, roleMeta, role) {
    return queue.concat(_this.provideStack(role, roleMeta));
  }, []);
  console.log('stack[0].role', stack[0].role);
  console.log('stack[1].role', stack[1].role);
  this.queue = _.sortBy(stack, ['priority']);
}

module.exports = checkQueue;
