var commandHarvestEnergy = require('_creep-command-harvest-energy');
var commandDepositEnergy = require('_creep-command-deposit-energy');
var commandPickup = require('_creep-command-pickup');
var commandTransfer = require('_creep-command-transfer');
var commandUpgrade = require('_creep-command-upgrade');
var commandBuild = require('_creep-command-build');
var commandRepair = require('_creep-command-repair');
var commandGuard = require('_creep-command-guard');
var commandClaim = require('_creep-command-claim');

Creep.prototype.commandHarvestEnergy = commandHarvestEnergy;
Creep.prototype.commandDepositEnergy = commandDepositEnergy;
Creep.prototype.commandPickup = commandPickup;
Creep.prototype.commandTransfer = commandTransfer;
Creep.prototype.commandUpgrade = commandUpgrade;
Creep.prototype.commandBuild = commandBuild;
Creep.prototype.commandRepair = commandRepair;
Creep.prototype.commandGuard = commandGuard;
Creep.prototype.commandClaim = commandClaim;

Creep.prototype.findClosestNotEmpty = function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var energyMinimum = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

  var structureTypes = options.structures || [];

  var potentialTargets = [];

  structureTypes.forEach(function (structureType) {
    var structures = this.room.find(FIND_MY_STRUCTURES, {
      filter: function filter(object) {
        var energy = object.store ? object.store.energy : object.energy;
        return object.structureType === structureType && energy > energyMinimum;
      }
    });
    potentialTargets = potentialTargets.concat(structures);
  }, this);

  var creepTypes = options.creeps || [];
  creepTypes.forEach(function (creepType) {
    var creeps = this.room.find(FIND_MY_CREEPS, {
      filter: function filter(creep) {
        return creep.memory.role === creepType && creep.energy > energyMinimum;
      }
    });
    potentialTargets = potentialTargets.concat(creeps);
  }, this);

  if (options.droppedEnergy) {
    var droppedResources = this.room.find(FIND_DROPPED_RESOURCES, {
      filter: function filter(resource) {
        return resource.amount > options.droppedEnergy;
      }
    });
    potentialTargets = potentialTargets.concat(droppedResources);
  }

  var target = this.pos.findClosestByPath(potentialTargets);

  return target;
};

Creep.prototype.findClosestDroppedEnergy = function (energyMinimum) {
  return this.findClosestNotEmpty({
    structures: [],
    creeps: [],
    droppedEnergy: energyMinimum
  });
};

Creep.prototype.withdrawEnergy = function (target) {
  if (!target) return;
  if (typeof target.transfer === 'function') {
    return target.transfer(this, RESOURCE_ENERGY);
  } else if (typeof target.transferEnergy === 'function') {
    return target.transferEnergy(this);
  } else {
    return this.pickup(target);
  }
};
