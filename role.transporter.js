
var roleTransporter = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var found = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
        if(found.length > 0 && found.resourceType == RESOURCE_ENERGY) {
            creep.pickup(found[0]);

        }
        if (creep.carry.energy == 0){
            creep.memory.transporting = false;
        }
        else if (creep.carry.energy >= (creep.carryCapacity-50)) {
            creep.memory.transporting = true;
        }
        if (creep.memory.transporting == true){



            var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                structure.energy < structure.energyCapacity;
        }
        });
            if (targets.length == 0) {
                var towers = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER && structure.energy < 550);
            }
            });
                if (towers) {
                    var target = creep.pos.findClosestByPath(towers);
                }
                if (target) {
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                } else {
                    var others = creep.room.find(FIND_STRUCTURES, {
                                filter: (structure) => {
                                return (structure.structureType == STRUCTURE_NUKER && structure.energy < structure.energyCapacity) || (structure.structureType == STRUCTURE_LAB && structure.energy < structure.energyCapacity);
                }
                });
                    if (others.length > 0) {
                        if(creep.transfer(others[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(others[0]);
                        }
                    } else {
                        if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage);
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
};

module.exports = roleTransporter;