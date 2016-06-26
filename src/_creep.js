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

Creep.prototype.findClosest = function(options) {
  var structureTypes = options.structures || [];
  var searchEmpty = options.empty || false;
  var energyThreshold = options.energyThreshold || 0;
  var droppedEnergy = options.droppedEnergy || false;
  var room = this.room;

  var potentialTargets = [];

  structureTypes.forEach(function (structureType) {
    var structures = room.find(FIND_MY_STRUCTURES, {
      filter: function(object) {
        var energy = object.store ? object.store.energy : object.energy;
        var energyCapacity = object.store ? object.store.energyCapacity : object.energyCapacity;
        var rightType = object.structureType === structureType;
        var enoughtEnergy = (searchEmpty) ? energy < energyCapacity : energy > energyThreshold;
        var notClaimed = !object.claimed;
        return rightType && enoughtEnergy && notClaimed;
      }
    });
    potentialTargets = potentialTargets.concat(structures);
  });

  var creepTypes = options.creeps || [];
  creepTypes.forEach(function (creepType) {
    var creeps = room.find(FIND_MY_CREEPS, {
      filter: function filter(creep) {
        var energy = creep.energy;
        var rightRole = creep['memory']['role'] === creepType;
        var enoughtEnergy = (searchEmpty) ? energy < creep.carryCapacity : energy > energyThreshold;
        var notClaimed = !creep.claimed;
        return rightRole && enoughtEnergy && notClaimed;
      }
    });
    potentialTargets = potentialTargets.concat(creeps);
  });

  if (options.droppedEnergy) {
    var droppedResources = this.room.find(FIND_DROPPED_RESOURCES, {
      filter: function filter(resource) {
        var enoughtEnergy = resource.amount > energyThreshold;
        var notClaimed = !resource.claimed;
        return enoughtEnergy && notClaimed;
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
