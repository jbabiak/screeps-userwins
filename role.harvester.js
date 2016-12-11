var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy >= 50 && creep.memory.harvesting == false){
                    targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) &&
                                    structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                        }
                    });
                 if (targets.length == 0) {
                    var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                structure.energy < structure.energyCapacity;
                    }
                });
                 } 
            var closestTarget = creep.pos.findClosestByRange(targets);    
            if(targets.length > 0) {
                if(creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTarget);
                    creep.say('Delivering');
                }
            }
        } 
        else if(creep.carry.energy < creep.carryCapacity) {
            
             creep.memory.harvesting = true;
             if ((creep.name == 'H-3' || creep.name == 'H-4')  && creep.pos.roomName == 'W37S74') {
                creep.moveTo(Game.flags.Flag3);
                return;
                 
             }
            var sources = creep.pos.findClosestByRange(FIND_SOURCES);
            if(creep.harvest(sources) != 0) {
                var flags = creep.room.find(FIND_FLAGS, {
                        filter: (structure) => {
                            return (structure.name == creep.name);
                        }
                    });
                creep.moveTo(flags[0].pos);
            }
        } else {
            creep.memory.harvesting = false;
        }
	}
};

module.exports = roleHarvester;