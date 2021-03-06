var HARVESTER_PARTS = [MOVE, WORK, WORK];
var UPGRADER_PARTS = [MOVE, WORK, CARRY];
var MOVER_PARTS = [CARRY, MOVE];
var BUILDER_PARTS = [WORK, CARRY, MOVE];
var ATTACK_PARTS = [ATTACK, TOUGH, MOVE]
var CLAIM_PARTS = [MOVE, CLAIM, CLAIM, CLAIM]

function getPartCost(part) {
  return BODYPART_COST[part];
}

function calculateParts(parts, maxCost) {
  var i = 0;
  var totalCost = 0;
  var finalParts = [];
  while (totalCost + getPartCost(parts[i % parts.length]) < maxCost) {
    finalParts.push(parts[i % parts.length]);
    totalCost += getPartCost(parts[i % parts.length]);
    i++;
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
    case 'claim':
      return calculateParts(CLAIM_PARTS, maxCost);
  }
}

module.exports.getParts = getParts;
module.exports.getPartCost = getPartCost;
module.exports.calculateParts = calculateParts;
