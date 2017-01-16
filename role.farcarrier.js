
var roleFarCarrier = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.memory.transporting == true){



            if(creep.room.storage) {
                 var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                structure.energy < structure.energyCapacity;
                }
                });
                if (targets.length > 0) {
                var closestTarget = creep.pos.findClosestByRange(targets);
              
                    if (creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestTarget);
                    }
                } else if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
            } else {
                var road = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(object) {
                        return object.structureType == STRUCTURE_ROAD && object.hits < 4000;
                    }
                });
                creep.repair(road);
                creep.moveTo(Game.flags['Home-' + creep.name].pos);
            }

        } else {


            if(creep.pos.isEqualTo(Game.flags[creep.name].pos)) {
                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_LINK);
            }
            });
                var closestTarget = creep.pos.findClosestByRange(targets);
                if (closestTarget) {
                    if (closestTarget.structureType == STRUCTURE_CONTAINER) {
                        closestTarget.transfer(creep, RESOURCE_ENERGY);
                    } else {
                        creep.withdraw(closestTarget, RESOURCE_ENERGY);
                    }
                } else {
                    var closestDropped = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY); 
                    if (closestDropped) {
                        creep.pickup(closestDropped);
                    }
                }
            } else {
                creep.moveTo(Game.flags[creep.name].pos);
            }
        }


        if (creep.carry.energy == 0){
            creep.memory.transporting = false;
        }
        else if (creep.carry.energy == creep.carryCapacity) {
            creep.memory.transporting = true;
        }
    }
};

module.exports = roleFarCarrier;