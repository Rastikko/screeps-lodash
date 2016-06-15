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
  this.queue = _.sortByOrder(stack, ['priority'], ['asc']);
  // TODO: fix the bug with the priority not being ordered
  console.log('this.queue[0].role', this.queue[0].role);
  console.log('this.queue[0].priority', this.queue[0].priority);
  console.log('this.queue[1].role', this.queue[1].role);
  console.log('this.queue[1].priority', this.queue[1].priority);
  console.log('this.queue[2].role', this.queue[2].role);
  console.log('this.queue[2].priority', this.queue[2].priority);
  console.log('this.queue[3].role', this.queue[3].role);
  console.log('this.queue[3].priority', this.queue[3].priority);
  console.log('this.queue[4].role', this.queue[4].role);
  console.log('this.queue[4].priority', this.queue[4].priority);
}

module.exports = checkQueue;
