var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy >= 50 && creep.memory.harvesting == false){
                    targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER) &&
                                    structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                        }
                    });
                    if (targets <= 1) {
                       targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                    structure.energy < structure.storeCapacity;
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