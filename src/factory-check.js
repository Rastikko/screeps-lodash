var commander = require('commander');
// check if spawn have a command and execute
// check the queue if the timer if is being EXECUTED
// check the timer if % 10
function check() {
  var spawn = this.room.getSpawn();
  var haveCommand = commander.check(spawn);
  console.log('haveCommand', haveCommand);
  if (haveCommand) {
    return;
  }
  this.checkQueue();
  var firstQueue = this.queue[0];
  console.log('firstQueue', firstQueue && firstQueue.role);
  if (firstQueue) {
    this.room.memory.spamming = true;
    commander.execute('commandQueueCreep', spawn, [firstQueue]);
    return;
  }
  this.room.memory.spamming = false;
}

module.exports = check;
