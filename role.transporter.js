
var roleTransporter = {

    /** @param {Creep} creep **/
    run: function(creep) {

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
                        return (structure.structureType == STRUCTURE_TOWER && structure.energy < 1000);
                    }
                });
                if (towers) {
                    var target = towers[0];
                }
                if (target) {
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                    console.log(target + ' transporter: ' + creep.name);
                } else {
                    if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage);
                    }
                }

            } else {


                var closestTarget = creep.pos.findClosestByRange(targets);
              
                    if (creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestTarget);
                    }
                
            }
        } else {
            if (creep.name == 'T-5' || creep.name == 'T-6'){
                var dropenergy = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY, {
                filter: (d) => {return (d.resourceType == RESOURCE_ENERGY)}});
                    if (dropenergy) {
                        if (creep.pickup(dropenergy) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(dropenergy)
                    }
                }
            } else {
                var flags = creep.room.find(FIND_FLAGS, {
                        filter: (structure) => {
                        return (structure.name == creep.name);
                    }
                });
                if(creep.pos.isEqualTo(flags[0].pos)) {
                    var targets = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_LINK);
                        }
                    });
                    var closestTarget = creep.pos.findClosestByRange(targets);
                    if (closestTarget.structureType == STRUCTURE_CONTAINER) {
                        closestTarget.transfer(creep, RESOURCE_ENERGY);
                    } else {
                        console.log(closestTarget);
                        creep.withdraw(closestTarget, RESOURCE_ENERGY);
                    }
                } else {
                    creep.moveTo(flags[0]);
                }
            }

        }
        if (creep.carry.energy == 0){
            creep.memory.transporting = false;
        }
        else {
            creep.memory.transporting = true;
        }
    }
};

module.exports = roleTransporter;