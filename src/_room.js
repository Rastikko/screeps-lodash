Room.prototype.getSpawn = function() {
  var spawns = this.find(FIND_MY_SPAWNS);
  return spawns[0];
}

Room.prototype.getEmptySpawn = function() {
  var spawns = this.find(FIND_MY_SPAWNS, {
    filter: function(spawn) {
      return spawn.energy < spawn.energyCapacity;
    }
  });
  if (spawns.length) {
    return spawns[0];
  }
}

Room.prototype.getTowers = function() {
  return this.find(FIND_MY_STRUCTURES, {
    filter: function(obj) {
      return obj.structureType == STRUCTURE_TOWER;
    }
  });
}

Room.prototype.getEmptyTower = function() {
  var towers = this.find(FIND_MY_STRUCTURES, {
    filter: function(obj) {
      return obj.structureType == STRUCTURE_TOWER && obj.energy < 10;
    }
  });
  if (towers.length) {
    return towers[0];
  }
}

Room.prototype.getHostileCreep = function() {
  var hostileCreep = this.find(FIND_HOSTILE_CREEPS);
  if (hostileCreep.length) {
    return hostileCreep[0];
  }
}

Room.prototype.getBrokenStructures = function() {
  var brokenStructures = this.find(FIND_STRUCTURES, {
    filter: function(structure) {
      var road = structure.structureType == STRUCTURE_ROAD && structure.hits < structure.hitsMax;
      var rampart = structure.structureType == STRUCTURE_RAMPART && structure.hits < 100000;
      return road || rampart;
    }
  });
  if (brokenStructures.length) {
    return brokenStructures[0];
  }
  
  brokenStructures = this.find(FIND_STRUCTURES, {
    filter: function(structure) {
      var isHalfDamaged = structure.hits < structure.hitsMax / 2;
      var isNotALotOfWork = structure.hits < 100000;
      return isHalfDamaged && isNotALotOfWork;
    }
  });

  if (brokenStructures.length) {
    return brokenStructures[0];
  }
}
