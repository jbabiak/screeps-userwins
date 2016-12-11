var roleTransporter = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if (creep.carry.energy > 50 && creep.memory.transporting == false){
            if ((creep.name == 'T-2' || creep.name == 'T-4')  && creep.pos.roomName == 'W37S73') {
                creep.moveTo(Game.flags.Flag2);
                return; 
            }
                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) &&
                                structure.energy < structure.energyCapacity;
                        }
                });
                /**if (targets.length == 0) {
                    targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) &&
                                    structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                        }
                    });
                } **/
            var closestTarget = creep.pos.findClosestByRange(targets);    
            if(targets.length > 0) {
                if(creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTarget);
                    creep.say('Transporting');
                }
            }
        } 
        else if(creep.carry.energy < creep.carryCapacity) {
             creep.memory.transporting = true;
             if ((creep.name == 'T-2' || creep.name == 'T-4')  && creep.pos.roomName == 'W37S74') {
                creep.moveTo(Game.flags.Flag3);
                return;
                 
             }
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
                creep.say('Grabbing');
            }
        } else {
            creep.memory.transporting = false;
        }
	}
};

module.exports = roleTransporter;