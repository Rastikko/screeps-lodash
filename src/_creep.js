var commandHarvestEnergy = require('_creep-command-harvest-energy');
var commandDepositEnergy = require('_creep-command-deposit-energy');
var commandCarryEnergy = require('_creep-command-carry-energy');
var commandPickup = require('_creep-command-pickup');
var commandTransfer = require('_creep-command-transfer');
var commandUpgrade = require('_creep-command-upgrade');

Creep.prototype.commandHarvestEnergy = commandHarvestEnergy;
Creep.prototype.commandDepositEnergy = commandDepositEnergy;
Creep.prototype.commandCarryEnergy = commandCarryEnergy;
Creep.prototype.commandPickup = commandPickup;
Creep.prototype.commandTransfer = commandTransfer;
Creep.prototype.commandUpgrade = commandUpgrade;
