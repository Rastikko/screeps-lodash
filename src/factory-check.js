var commander = require('commander');
// check if spawn have a command and execute
// check the queue if the timer if is being EXECUTED
// check the timer if % 10
function check() {
  var spawn = this.room.getSpawn();
  var haveCommand = commander.check(spawn);
  if (haveCommand) {
    return;
  }
  this.checkQueue();
  var firstQueue = this.queue[0];
  console.log(firstQueue);
  if (firstQueue) {
    commander.execute('commandQueueCreep', spawn, [firstQueue]);
  }
}

module.exports = check;
