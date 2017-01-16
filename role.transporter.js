
var roleTransporter = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy == 0){
            creep.memory.transporting = false;
        }
        else if (creep.carry.energy == creep.carryCapacity) {
            creep.memory.transporting = true;
        }
        if (creep.memory.transporting == true){
            if (creep.name == 'T-7') {
                if (creep.room.storage.store[RESOURCE_ENERGY] > 10000) {
                 var terminal = Game.getObjectById('587149570c51a7462406d23b');
                            if(creep.transfer(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(terminal);
                            }
                } else {
                   var upgraderStorage = Game.getObjectById('586030a99ac77cb52126205a');
                    if(creep.transfer(upgraderStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(upgraderStorage);
                    }
                }
                     return;   
            }

            var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                structure.energy < structure.energyCapacity;
        }
        });
            if (targets.length == 0) {
                var towers = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER && structure.energy < 1000);
                    }
                });
                if (towers && creep.name != 'T-6') {
                    var target = towers[0];
                }
                if (target) {
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                } else {
                    if (creep.name != 'T-5' && creep.name != 'T-6') {
                        if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage);
                        }
                    } else {
                        var upgraderStorage = Game.getObjectById('586030a99ac77cb52126205a');
                        
                        if (upgraderStorage.store[RESOURCE_ENERGY] < 2000) {
                            if(creep.transfer(upgraderStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(upgraderStorage);
                            }
                        } else {
                            if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.storage);
                            }
                        }
                    }
                }

            } else {


                var closestTarget = creep.pos.findClosestByRange(targets);
              
                    if (creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestTarget);
                    }
                
            }
        } else {
            if (creep.name == 'T-6' || creep.name == 'T-7'){
                if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
            } else {

                if(creep.pos.isEqualTo(Game.flags[creep.name].pos)) {
                    var targets = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_LINK);
                        }
                    });
                    var closestTarget = creep.pos.findClosestByRange(targets);
                    if (closestTarget.structureType == STRUCTURE_CONTAINER) {
                        closestTarget.transfer(creep, RESOURCE_ENERGY);
                    } else {
                        creep.withdraw(closestTarget, RESOURCE_ENERGY);
                    }
                } else {
                    creep.moveTo(Game.flags[creep.name].pos);
                }
            }

        }
        
    }
};

module.exports = roleTransporter;