var WORKER_PARTS = [WORK, WORK, CARRY, MOVE];
var MOVER_PARTS = [CARRY, MOVE];
var BUILDER_PARTS = [WORK, CARRY, MOVE, CARRY, MOVE];

function getPartCost(part) {
  switch (part) {
    case MOVE:
      return 50;
    case WORK:
      return 100;
    case CARRY:
      return 50;
    case ATTACK:
      return 80;
    case RANGED_ATTACK:
      return 150;
    case HEAL:
      return 250;
    case TOUGH:
      return 10;
  }
}

function calculateParts(parts, maxCost) {
  let i = 0;
  let totalCost = 0;
  let finalParts = [];
  while (totalCost < maxCost) {
    finalParts.push(parts[i % parts.length]);
    i++;
    totalCost += getPartCost(parts[i % parts.length]);
  }
  return finalParts;
}

function getParts(role, maxCost) {
  switch (role) {
    case 'harvester':
      return calculateParts(WORKER_PARTS, maxCost);
    case 'carrier':
      return calculateParts(MOVER_PARTS, maxCost);
  }
}

module.exports.getParts = getParts;
module.exports.getPartCost = getPartCost;
module.exports.calculateParts = calculateParts;
