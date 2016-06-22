var HARVESTER_PARTS = [WORK, WORK, MOVE];
var UPGRADER_PARTS = [WORK, WORK, CARRY, MOVE];
var MOVER_PARTS = [CARRY, MOVE];
var BUILDER_PARTS = [WORK, CARRY, MOVE];
var ATTACK_PARTS = [ATTACK, TOUGH, MOVE]

function getPartCost(part) {
  return BODYPART_COST[part];
}

function calculateParts(parts, maxCost) {
  var i = 0;
  var totalCost = 0;
  var finalParts = [];
  while (totalCost + getPartCost(parts[i % parts.length]) < maxCost) {
    finalParts.push(parts[i % parts.length]);
    i++;
    totalCost += getPartCost(parts[i % parts.length]);
  }
  return finalParts;
}

function getParts(role, maxCost) {
  switch (role) {
    case 'harvester':
      return calculateParts(HARVESTER_PARTS, maxCost);
    case 'carrier':
      return calculateParts(MOVER_PARTS, maxCost);
    case 'upgrader':
      return calculateParts(UPGRADER_PARTS, maxCost);
    case 'builder':
      return calculateParts(BUILDER_PARTS, maxCost);
    case 'guard':
      return calculateParts(ATTACK_PARTS, maxCost);
  }
}

module.exports.getParts = getParts;
module.exports.getPartCost = getPartCost;
module.exports.calculateParts = calculateParts;
